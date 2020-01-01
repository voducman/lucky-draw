let count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0, count_5 = 0, count_6 = 0;
const intervalID =  new Array(6);
let employList;

if (typeof employees == "undefined"){
    alert("Không đọc được danh sách thông tin nhân viên.");
}
else {
    employList = employees;
}
// TO-DO List
;
// fix speed of transitions

document.querySelector(".btn-yellow-secondary").addEventListener('click', ()=>{
    let element = document.querySelector(".btn-start");
    let isRun = !element.classList.contains("hidden");
    let temp;
    
    if (isRun){
        document.querySelector(".btn-start").classList.add("hidden");
        document.querySelector(".btn-stop").classList.remove("hidden");
        document.querySelector(".state-ready").classList.add("hidden");
        document.querySelector(".waiting-message").classList.remove("hidden");
        document.querySelector(".lucky-name").classList.add("hidden");

        set6Interval();
    }else {
        // Get results from random function
        let employObj = getRandomEmployID();
        let employID = employObj.id;
        employID = Array.from(employID);
        console.log(employID);
        console.log(Array.isArray(employID));

        document.querySelector(".btn-start").classList.remove("hidden");
        document.querySelector(".btn-stop").classList.add("hidden");

        setTimeout(reset6Interval, 1000 , 5, employID[5]);
        setTimeout(reset6Interval, 3000,  4, employID[4]);
        setTimeout(reset6Interval, 5000,  3, employID[3]);
        setTimeout(reset6Interval, 7000,  2, employID[2]);
        setTimeout(reset6Interval, 9000,  1, employID[1]);
        setTimeout(reset6Interval, 11000, 0, employID[0]); 
        setTimeout(showLuckyName,  13000, employObj.name);
        

        // document.querySelector(".available-6").innerHTML = employID[5];
        // document.querySelector(".available-5").innerHTML = employID[4];
        // document.querySelector(".available-4").innerHTML = employID[3];
        // document.querySelector(".available-3").innerHTML = employID[2];
        // document.querySelector(".available-2").innerHTML = employID[1];
        // document.querySelector(".available-1").innerHTML = employID[0];
        

    }
});

function set6Interval(){

    setTimeout(set_6, 0000);
    setTimeout(set_5, 100);
    setTimeout(set_4, 200);
    setTimeout(set_3, 300);
    setTimeout(set_2, 400);
    setTimeout(set_1, 500);

    function set_1(){
        intervalID[0] = setInterval(function(){
            document.querySelector(".available-1").innerHTML = count_1;
            //count = (count==9)? 0 : count+1;
            count_1 = (count_1==9)? 0 : 9;
        }, 600)
    }
    
    function set_2(){
        intervalID[1] = setInterval(function(){
            document.querySelector(".available-2").innerHTML = count_2;
            //count = (count==9)? 0 : count+1;
            count_2 = (count_2==9)? 0 : 9;
        }, 1000)
    }

    function set_3(){
        intervalID[2] = setInterval(function(){
            document.querySelector(".available-3").innerHTML = count_3;
            //count = (count==9)? 0 : count+1;
            count_3 = (count_3==9)? 0 : 9;
        }, 850)
    }

   function set_4(){
        intervalID[3] = setInterval(function(){
        document.querySelector(".available-4").innerHTML = count_4;
        //count = (count==9)? 0 : count+1;
        count_4 = (count_4==9)? 0 : 9;
        }, 700)
   }

    function set_5(){
        intervalID[4] = setInterval(function(){
            document.querySelector(".available-5").innerHTML = count_5;
            //count = (count==9)? 0 : count+1;
            count_5 = (count_5==9)? 0 : 9;
        }, 1000)
    }

    function set_6(){
        intervalID[5] = setInterval(function(){
            document.querySelector(".available-6").innerHTML = count_6;
            //count = (count==9)? 0 : count+1;
            count_6 = (count_6==9)? 0 : 9;
        }, 750)
    }
    
}

function reset6Interval(index, number){
    if (index == undefined){
        intervalID.forEach((currentID)=>{
            clearInterval(currentID);
        })
    }
    else {
        clearInterval(intervalID[index]);
        let avalable = `.available-${index+1}`;
        document.querySelector(avalable).innerHTML = number;
    }
   
}

function getRandomEmployID(){
    let employeeID = -1;
    let random = Math.random();
    random = random * (employList.length - 1);
    random = Math.round(random);
    
    if (!isNaN(parseInt(employList[random].id))){
        employeeID = employList[random];
    }

    return employeeID;
}

function showLuckyName(name){
    document.querySelector(".state-ready").classList.add("hidden");
    document.querySelector(".waiting-message").classList.add("hidden");

    document.querySelector(".lucky-name").innerHTML = name;
    document.querySelector(".lucky-name").classList.remove("hidden");
}