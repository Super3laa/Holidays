const colors = require('colors');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const writeXlsxFile = require('write-excel-file/node')
const {
    days,daysStart,daysStartAr,MonthNumber,YearNumber,returnTime,leavingTime
} = require('./config.json')
let {users} = require('./users.json')
let {PrintStatements} = require('./statments')
let Nbt4yatFollower = new Array(days).fill(0)
let Table = [];
//BasicFillNbt4yat()
//Print();
//console.log(Nbt4yatFollower)
//checker for more than 2 will be nbt4ya
//FullFillNbt4yat()
//console.log(users)
Print();
PrintStatements({users,returnTime,leavingTime});
//console.log(Nbt4yatFollower)
//FillTable();




function customSort(arr) {
    orders = ["High", "Low"]
    arr.sort((x, y) => users[x.userIndex].Nbt4ya - users[y.userIndex].Nbt4ya);
    return arr.sort((x, y) => orders.indexOf(x.priority) - orders.indexOf(y.priority));
}


function BasicFillNbt4yat() {
    users.forEach((user, i) => {
        if (user.type == "م") {
            users[i].Nbt4yat = [...user.consultationDays]
            user.Nbt4yat.forEach(i => Nbt4yatFollower[i - 1]++);
            users[i].Nbt4ya = user.consultationDays.length
        }
    })
}
function FullFillNbt4yat() {
    for (let i = 0; i < days; i++) {
        let currentDay = i + 1;
        let PotentialUsersdToBeNbt4y = []
        if (Nbt4yatFollower[currentDay - 1] != 2) {
            users.forEach((user, i) => {
                let HighPriorityFlag = false
                if (!user.dayOff.includes(currentDay + 1) && !user.dayOff.includes(currentDay)) { //Tomorrow is not day off and today not day off
                    user.consultationDays.forEach(potentialDay => {
                        if (potentialDay == currentDay && user.limit > user.Nbt4yat.length) {
                            PotentialUsersdToBeNbt4y.push({ userIndex: i, priority: "High" });
                            HighPriorityFlag = true
                        }
                    })
                    if (HighPriorityFlag == false && user.limit > user.Nbt4yat.length) PotentialUsersdToBeNbt4y.push({ userIndex: i, priority: "Low" });
                }
            })
            try {
                PotentialUsersdToBeNbt4y = customSort(PotentialUsersdToBeNbt4y)
                users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4yat.push(i + 1)
                users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4ya++;
                Nbt4yatFollower[currentDay - 1]++;
                if (Nbt4yatFollower[currentDay - 1] == 1) {
                    users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4yat.push(i + 1)
                    users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4ya++;
                    Nbt4yatFollower[currentDay - 1]++;
                }
            } catch (error) {
                console.log(currentDay);
                console.log(PotentialUsersdToBeNbt4y)
            }

        }
        //console.log(PotentialUsersdToBeNbt4y)
    }
}











function Print() {
    let row = [];
    process.stdout.write("Feb   ")
    for (let i = 0; i < days; i++) {
        process.stdout.write(" " + (i + 1) + (i + 1 > 9 ? "|" : " |"));
        row.push({
            value: i + 1,
            fontWeight: 'bold'
        })
    }
    console.log("")
    process.stdout.write("Day   ")
    for (let i = 0; i < days; i++) {
        process.stdout.write(daysStart[(i % 7 + 7) % 7] + "|");
    }
    console.log("")
    users.forEach(user => {
        process.stdout.write(user.name + " ")
        for (let i = 0; i < days; i++) {
            let usersNames = []
            if (user.dayOff.includes(i + 1)) {
                process.stdout.write(" ر ".green.bold + "|")
            } else if (user.Nbt4yat.includes(i + 1)) {
                process.stdout.write((user.consultationDays.includes(i + 1) ? ' ن '.red.bold : ' ن '.yellow.bold) + "|")
            } else {
                if (user.type == "م") {
                    usersNames.push(user.fullName);
                }
                if (user.consultationDays.includes(i + 1) && user.type == "م") {
                    process.stdout.write(' س '.bold.blue + "|");
                } else {
                    process.stdout.write(` ${user.type} |`)

                }
            }
        }
      //  process.stdout.write(" " + user.Nbt4ya /*+ " [" + user.Nbt4yat + "]"*/)
        Table.push(row); row = [];
        console.log("");

    })
}
async function FillTable() {
    await writeXlsxFile(Table, {
        filePath: path.join(__dirname, './Table.xlsx')
    })
}