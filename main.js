const days = 28;
const daysStart = ["Tue","Wed","Thu","Fr ","Sat","Sun","Mon"]
let users = [
    {
        name:"user1",
        dayOff:[2,16,17,23],//Wed
        consultationDays:[11,25],//Fr
        Nbt4ya : 0,
        Nbt4yat:[],

    },
    {
        name:"user2",
        dayOff:[4,11,18,25],//Friday
        consultationDays:[12,26],//Sat
        Nbt4ya : 0,
        Nbt4yat:[],

    },
    {
        name:"user3",
        dayOff:[3,10,17,24],//Thursday
        consultationDays:[2,16],//Wed
        Nbt4ya : 0,
        Nbt4yat:[],


    },{
        name:"user4",
        dayOff:[7,14,21,28],//Mon
        consultationDays:[12,26,15,1],//Sat,Tue
        Nbt4ya : 0,
        Nbt4yat:[],

    },
    ,{
        name:"user5",
        dayOff:[3,10,17,24],//Mon
        consultationDays:[15,1],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],

    },{
        name:"user6",
        dayOff:[11,12,13,14,25,26,27,28],//Mon
        consultationDays:[],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],

    }
]
let Table = [];
for (let i  = 0 ;i< days ; i++){
    let currentDay = i+1;
    let PotentialUsersdToBeNbt4y =[]
    users.forEach((user,i)=>{
        let HighPriorityFlag = false
        if (!user.dayOff.includes(currentDay+1) &&  !user.dayOff.includes(currentDay)){ //Tomorrow is not day off and today not day off
            user.consultationDays.forEach(potentialDay =>{
                if(potentialDay == currentDay){
                    PotentialUsersdToBeNbt4y.push({userIndex:i,priority:"High"});
                    HighPriorityFlag = true
                } 
            })
            HighPriorityFlag == false &&  PotentialUsersdToBeNbt4y.push({userIndex:i,priority:"Low"});
        }
    })

    PotentialUsersdToBeNbt4y = customSort(PotentialUsersdToBeNbt4y)
    users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4yat.push(i+1)
    users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4ya ++;
    users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4yat.push(i+1)
    users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4ya ++;
    //console.log(PotentialUsersdToBeNbt4y)
}

console.log(users)
Print();




function customSort(arr){
    orders = ["High","Low"]
    arr.sort((x,y) => orders.indexOf(x.priority) - orders.indexOf(y.priority));
    return arr.sort((x,y) =>  users[x.userIndex].Nbt4ya - users[y.userIndex].Nbt4ya );
}



function Print(){
    process.stdout.write("Feb   ")
for (let i  = 0 ;i< days ; i++){
    process.stdout.write(" " + (i+1) +  (i+1>9 ? "|":" |"));
}
console.log("")
process.stdout.write("Day   ")
for (let i  = 0 ;i< days ; i++){
    process.stdout.write(daysStart[(i % 7 + 7) % 7] + "|");
}
console.log("")

users.forEach(user=>{
    process.stdout.write(user.name + " ")
    for (let i  = 0 ;i< days ; i++){
        if (user.dayOff.includes(i+1)){
            process.stdout.write(" 🟢|")
        }else if (user.Nbt4yat.includes(i+1)){
            process.stdout.write(" 🔴|")
        }else{
            process.stdout.write("   |")
        }            
    }
    console.log("")
})
}