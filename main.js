const days = 28;
const daysStart = ["Tue","Wed","Thu","Fr ","Sat","Sun","Mon"]
let users = [
    {
        name:"Khale",
        dayOff:[1,8,15,27],//Wed
        consultationDays:[2,16],//Fr
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,
    },
    {
        name:"Mahmo",
        dayOff:[4,11,18,25],//Friday
        consultationDays:[14,28,15,28],//Sat
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,
    },
    {
        name:"Akram",
        dayOff:[4,11,18,25],//Fr
        consultationDays:[12,26],//Wed
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,

    },{
        name:"Bahaa",
        dayOff:[5,6,7,8,9,10,11,25,26,27,28],//14-7
        consultationDays:[1,2,3,12,13,14,15,16,17,19,20,21,22,23,24,4,17,16,18],//Sat,Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:8,
    },
    ,{
        name:"Safty",
        dayOff:[5,12,19,26],//Mon
        consultationDays:[2,16,14,28],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,

    },{
        name:"Abdal",
        dayOff:[14,20,21],//Mon
        consultationDays:[1,12],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:7,

    },{
        name:"Nasr ",
        dayOff:[3,10,17,24],//Mon
        consultationDays:[13,27],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,

    },{
        name:"Alaa ",
        dayOff:[2,14,15,23],//Mon
        consultationDays:[11,25],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:6,

    },{
        name:"Mosta",
        dayOff:[5,6,7,8,9,19,20,21,22,23,24,25],//Hybrif
        consultationDays:[1,2,3,4,10,11,12,14,13,15,16,17,18,26,27,28],//Tue
        Nbt4ya : 0,
        Nbt4yat:[],
        limit:7,
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
                if(potentialDay == currentDay && user.limit > user.Nbt4yat.length){
                    PotentialUsersdToBeNbt4y.push({userIndex:i,priority:"High"});
                    HighPriorityFlag = true
                } 
            })
            if(HighPriorityFlag == false && user.limit > user.Nbt4yat.length) PotentialUsersdToBeNbt4y.push({userIndex:i,priority:"Low"});
        }
    })
    try {
        PotentialUsersdToBeNbt4y = customSort(PotentialUsersdToBeNbt4y)
        users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4yat.push(i+1)
        users[PotentialUsersdToBeNbt4y[0].userIndex].Nbt4ya ++;
        users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4yat.push(i+1)
        users[PotentialUsersdToBeNbt4y[1].userIndex].Nbt4ya ++;
    } catch (error) {
        console.log(currentDay);
        console.log(PotentialUsersdToBeNbt4y)
    }
   
    //console.log(PotentialUsersdToBeNbt4y)
}

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
    process.stdout.write(" "+user.Nbt4ya)
    console.log("")
})
}