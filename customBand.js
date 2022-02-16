let {GenerateStatment} = require('./statments')
const fs = require('fs');
let inputs  = process.argv
let users = [];
let usersLength = parseInt(inputs[2])
for(let i  = 3 ; i< usersLength+3;i++){
        users.push(inputs[i]);
}
console.log("Cooking your band ... ")
const leavingTime = inputs[2+usersLength+1]
const leavingDate = inputs[2+usersLength+2]
const leavingDay = inputs[2+usersLength+3]
const returnTime = inputs[2+usersLength+4]
const returnDate = inputs[2+usersLength+5]
const returnDay = inputs[2+usersLength+6]
let fileName = `${leavingDate.replace(/\//g,'-')}to${returnDate.replace(/\//g,'-')}`
let dir = __dirname+`/CustomBands/${fileName}`

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
console.log(`Generating band undername /CutomBands/fileName/${fileName}.html`);

GenerateStatment({
    users,
    leavingDay,leavingTime,leavingDate,
    returnDay,returnTime,returnDate,
    fileName,dir
})

fs.readFile(__dirname+'/Sig.txt',(err,data)=>{
  console.log(data.toString())
})

