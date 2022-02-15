#!/bin/bash
x=1
names=""
while [ $x -eq 1 ]
do
    read -p "Enter Name : " namevar
    names+="$namevar"
    read -p "another ? (y/n) : " ans
    if [ "$ans" == "n" ]; then
        x=0
    else 
        names+="," 
    fi
done

IFS=',' read -ra my_array <<< "$names"

read -p "leavingTime : " leavingTime
read -p "leavingDate : " leavingDate
read -p "leavingDay : " leavingDay

read -p "returnTime : " returnTime
read -p "returnDate : "  returnDate
read -p "returnDay : " returnDay
for (( i = 0; i < ${#names[@]}; i++ ))
do
  echo "${names[$i]}"
done
node ./customBand.js "${#my_array[@]}" "${my_array[@]}" $leavingTime $leavingDate $leavingDay $returnTime $returnDate $returnDay 