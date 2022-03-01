const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const options = {
    format: 'A4'
}
const {
    days, daysStartAr, MonthNumber, YearNumber
} = require('./config.json')

var callback = function (pdf, fileName) {
    // do something with the PDF like send it as the response
    fs.writeFileSync(__dirname + `/${fileName}.pdf`, pdf);
}

function GenerateStatment({ users, leavingDate, leavingDay, returnDate, returnDay, fileName, returnTime, leavingTime, dir }) {
    readHTMLFile(__dirname + '/Template/band.html', async function (err, html) {
        let template = handlebars.compile(html);
        let htmlTable = ''
        users.forEach((user, i) => {
            if (i == 0) {
                htmlTable += `
                 <tr>
                        <td>${i + 1}</td>
                        <td>جندي</td>
                        <td colspan="2">${user}</td>
                        <td class="vCell" rowspan="10" colspan="1">
                            <p class="vText">سعــ ${leavingTime} ــت<br />
                                ${leavingDay} ${leavingDate}
                            </p>
                        </td>
                        <td class="vCell" rowspan="10" colspan="1">
                            <p class="vText">سعــ ${returnTime} ــت<br />
                                ${returnDay} ${returnDate}
                            </p>
                        </td>
                        <td class="vCell" rowspan="10" colspan="1">
                            <p class="vText"> الأسكندرية
                            </p>
                        </td>
                        <td rowspan="10"></td>
                        <td rowspan="10"></td>
                    </tr>
                 `
            } else {
                htmlTable += `<tr>
                <td>${i + 1}</td>
                <td>جندي</td>
                <td colspan="2">${user}</td>
                </tr>`
            }

        })
        let replacements = {
            DAY: `${leavingDay}`,
            DATE: `${leavingDate}`,
            TABLE: htmlTable
        };
        let FinalHTML = template(replacements);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(dir + `/${fileName}.html`, FinalHTML);
    });
}

function PrintStatements({ users, returnTime, leavingTime }) {
    for (let i = 0; i < days; i++) {
        let toBeMabyt = []
        let toBeRa7a = []
        users.forEach(user => {
            if (!user.Nbt4yat.includes(i + 1) && !user.dayOff.includes(i + 1) && !user.dayOff.includes(i + 2) && user.type == "م") {
                toBeMabyt.push(user.fullName);
            } else if (!user.Nbt4yat.includes(i + 1) && !user.dayOff.includes(i + 1) && user.dayOff.includes(i + 2) && user.type == "م") {
                toBeRa7a.push(user.fullName);
            }
        })
        let dir = __dirname + `/Bands/${i + 1}-${MonthNumber}-${YearNumber}`
        GenerateStatment({ dir, fileName: "مبيت", users: toBeMabyt, leavingDate: `${i + 1}/${MonthNumber}/${YearNumber}`, leavingDay: daysStartAr[(i % 7 + 7) % 7], returnDate: `${i + 2}/${MonthNumber}/${YearNumber}`, returnDay: daysStartAr[((i + 1) % 7 + 7) % 7], returnTime, leavingTime })
        toBeRa7a.length > 0 && GenerateStatment({ dir, fileName: `راحة`, users: toBeRa7a, leavingDate: `${i + 1}/${MonthNumber}/${YearNumber}`, leavingDay: daysStartAr[(i % 7 + 7) % 7], returnDate: `${i + 3}/${MonthNumber}/${YearNumber}`, returnDay: daysStartAr[((i + 2) % 7 + 7) % 7], returnTime, leavingTime })
    }
}
function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

module.exports = {
    PrintStatements,
    GenerateStatment
}