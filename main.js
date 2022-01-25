const colors = require('colors');
const fs = require('fs');
const path = require('path');
const writeXlsxFile = require('write-excel-file/node')
const days = 28;
let Nbt4yatFollower = new Array(days).fill(0)
const daysStart = ["Tue", "Wed", "Thu", "Fr ", "Sat", "Sun", "Mon"]
let users = [
    {
        name: "Khale",
        dayOff: [1, 8, 15, 27],//Wed
        consultationDays: [2, 16],//Fr
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    },
    {
        name: "Mahmo",
        dayOff: [4, 11, 18, 25],//Friday
        consultationDays: [14, 28, 15],//Sat
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    },
    {
        name: "Akram",
        dayOff: [4, 11, 18, 25],//Fr
        consultationDays: [12, 26],//Wed
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    },
    , {
        name: "Safty",
        dayOff: [5, 12, 19, 26],//Mon
        consultationDays: [2, 16, 14, 28],//Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    }, {
        name: "Abdal",
        dayOff: [14, 20, 21],//Mon
        consultationDays: [1, 12],//Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    }, {
        name: "Nasr ",
        dayOff: [3, 10, 17, 24],//Mon
        consultationDays: [13, 27],//Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    }, {
        name: "Alaa ",
        dayOff: [2, 14, 15, 23],//Mon
        consultationDays: [11, 25],//Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 6,
        type: "م"
    }, {
        name: "Bahaa",
        dayOff: [5, 6, 7, 8, 9, 10, 11, 25, 26, 27, 28],//14-7
        consultationDays: [1, 2, 3, 17,18, 20,21, 23, 24, 4],//Sat,Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 7,
        type: " "
    }, {
        name: "Mosta",
        dayOff: [5, 6, 7, 8, 9, 19, 20, 21, 22, 23, 24, 25],//Hybrif
        consultationDays: [1, 2, 3, 4, 10, 11,12,13,14,15,16,  17,  26, 27,28],//Tue
        Nbt4ya: 0,
        Nbt4yat: [],
        limit: 7,
        type: " "
    }
]
let Table = [];

BasicFillNbt4yat()
//Print();
//console.log(Nbt4yatFollower)
//checker for more than 2 will be nbt4ya
FullFillNbt4yat()
//console.log(users)
Print();
//console.log(Nbt4yatFollower)
//FillTable();


async function FillTable() {
    await writeXlsxFile(Table, {
        filePath: path.join(__dirname, './Table.xlsx')
    })
}

function customSort(arr) {
    orders = ["High", "Low"]
    arr.sort((x, y) => users[x.userIndex].Nbt4ya - users[y.userIndex].Nbt4ya);
    return arr.sort((x, y) => orders.indexOf(x.priority) - orders.indexOf(y.priority));
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
            if (user.dayOff.includes(i + 1)) {
                process.stdout.write(" ر ".green.bold + "|")
            } else if (user.Nbt4yat.includes(i + 1)) {
                process.stdout.write((user.consultationDays.includes(i + 1) ? ' ن '.red.bold : ' ن '.yellow.bold) + "|")
            } else {
                if (user.consultationDays.includes(i + 1) && user.type == "م") {
                    process.stdout.write(' س '.bold.blue + "|");
                } else {
                    process.stdout.write(` ${user.type} |`)
                }
            }
        }
        process.stdout.write(" " + user.Nbt4ya /*+ " [" + user.Nbt4yat + "]"*/)
        Table.push(row); row = [];
        console.log("");

    })
}
function BasicFillNbt4yat() {
    users.forEach((user,i) => {
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