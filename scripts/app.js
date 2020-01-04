/**
 * @author  VO DUC MAN
 * @date    1/1/2020 - 2/1/2020
 * @version 0.1
 * @description 
 */

let count_1 = 0, count_2 = 0, count_3 = 0, count_4 = 0, count_5 = 0, count_6 = 0;
const intervalID =  new Array(6);
let employList;
let dataPrize = "consolation";
let isRunning = false;


/**
 * Data of application
 */
let employObj, employID;
let data = {
    numOfPrize: {
        consolation: 1,
        bronze: 1,
        silver: 1,
        gold: 1,
        diamond: 1
    },
    afterDraw: {
        consolation: [],
        bronze: [],
        silver: [],
        gold: [],
        diamond: []
    },
    isConfig: false,

    isHaveInDB: function(id){
        data.afterDraw.consolation.forEach((ele)=>{
            if (parseInt(ele.id) == parseInt(id)) return true;
        })

        data.afterDraw.bronze.forEach((ele)=>{
            if (parseInt(ele.id) == parseInt(id)) return true;
        })

        data.afterDraw.silver.forEach((ele)=>{
            if (parseInt(ele.id) == parseInt(id)) return true;
        })

        data.afterDraw.gold.forEach((ele)=>{
            if (parseInt(ele.id) == parseInt(id)) return true;
        })

        data.afterDraw.diamond.forEach((ele)=>{
            if (parseInt(ele.id) == parseInt(id)) return true;
        })
        return false;
    },

    isFull: function(prize){
        let result = false;

        if (data.afterDraw[prize].length >= data.numOfPrize[prize]){
            result = true;
            return result;
        }
    },

    isEmpty: function(prize){
        let result = false;

        if (data.afterDraw[prize] == 0){
            result = true;
            return result;
        }
    }
}





 /* End of data model */

if (typeof employees == "undefined"){
    alert("Không đọc được danh sách thông tin nhân viên.");
}
else {
    employList = employees;
}
// TO-DO List
// fix speed of transitions



// let buttons = document.querySelectorAll(".btn-yellow-secondary");
// Array.from(buttons).forEach(ele => {
//     ele.addEventListener('click', handleButton);
// });

$('.btn-start').click(handleButton);
$('.btn-stop').click(handleButton);

if (dataPrize == "consolation"){
    $(".link-right").show();
    $(".link-left").hide();
}

$(".link-right").click(function(){
    if (isRunning){
        $(".section-head-actions").css("opacity", "0.45");
        
    }else {
        document.getElementById('turnon-sound').play();

        $(".section-head-actions").css("opacity", "1");

        if (dataPrize == "consolation"){
            dataPrize = "bronze";
            $(".link-left").show();
            $(".prize-content").html("GIẢI BA");
        }
        else if (dataPrize == "bronze"){
            dataPrize = "silver";
            $(".prize-content").html("GIẢI NHÌ");
        }
        else if (dataPrize == "silver"){
            dataPrize = "gold";
            $(".prize-content").html("GIẢI NHẤT");
        }
        else if (dataPrize == "gold"){
            dataPrize = "diamond";
            $(".prize-content").html("ĐẶC BIỆT");
            $(".link-right").hide();
        }
        changePrizeImage(dataPrize);
        showPersonIcon(dataPrize);
    }
    
});

$(".link-left").click(function(){
    if (isRunning){
        $(".section-head-actions").css("opacity", "0.45");

    }else{
        document.getElementById('turnon-sound').play();

        $(".section-head-actions").css("opacity", "1");

        if (dataPrize == "diamond"){
            dataPrize = "gold";
            $(".link-right").show();
            $(".prize-content").html("GIẢI NHẤT");
        }
        else if (dataPrize == "gold"){
            dataPrize = "silver";
            $(".prize-content").html("GIẢI NHÌ");
        }
        else if (dataPrize == "silver"){
            dataPrize = "bronze";
            $(".prize-content").html("GIẢI BA");
        }
        else if (dataPrize == "bronze"){
            dataPrize = "consolation";
            $(".link-left").hide();
            $(".link-right").show();
            $(".prize-content").html("KHUYẾN KHÍCH");
        }
        changePrizeImage(dataPrize);
        showPersonIcon(dataPrize);
    }
    
});

$(".btn-accept").click(function(){
    // Handle accept
    document.getElementById('winner-sound').play();

    isRunning = false;
    $(".section-head-actions").css("opacity", "1"); 
    $(".btn-start").removeClass("hidden");
    $(".btn-accept").addClass("hidden");
    $(".btn-reject").addClass("hidden");
    $(".state-ready").removeClass("hidden");
    $(".waiting-message").addClass("hidden");
    $(".lucky-name").addClass("hidden");
    data.afterDraw[dataPrize].push(employObj);

    showPersonIcon(dataPrize);
});

$(".btn-reject").click(function(){
    // Handle reject
    document.getElementById('go-sound').play();

    isRunning = false;
    $(".section-head-actions").css("opacity", "1"); 
    $(".btn-start").removeClass("hidden");
    $(".btn-accept").addClass("hidden");
    $(".btn-reject").addClass("hidden");
    $(".state-ready").removeClass("hidden");
    $(".waiting-message").addClass("hidden");
    $(".lucky-name").addClass("hidden");
});

// Refresh page right now
$("#app-reset").click(function(){
    document.getElementById('bn-sound').play();     
    location.reload();
});

let isRun = false;
function handleButton(){
    if (!data.isConfig){
        // Show notify
        document.getElementById('go-sound').play();
        $.notify({
            icon: "./images/danger-icon.png", 
            message: '<strong style="line-height: 30px; padding-left: 20px;"> Vui lòng cấu hình giải thưởng trước khi quay số!</strong>',	        
        },{
            icon_type: 'image',
            type: 'danger'
        });
        return -1;
    }

    let element = document.querySelector(".btn-start");
    isRun = !element.classList.contains("hidden");
    let temp;
    
    if (isRun){

        if (data.isFull(dataPrize)){
            document.getElementById('go-sound').play();

            $.notify({
                icon: "./images/danger-icon.png", 
                message: '<strong style="line-height: 30px; padding-left: 20px;">Giải đã đủ số lượng.</strong>',	        
            },{
                icon_type: 'image',
                type: 'danger'
            });
            return -1;
        }
        document.getElementById('spin-sound').play();
        setTimeout(function(){
            document.getElementById('roller-sound').play();
        }, 5)
        

        document.querySelector(".btn-start").classList.add("hidden");
        document.querySelector(".btn-stop").classList.remove("hidden");
        document.querySelector(".state-ready").classList.add("hidden");
        document.querySelector(".waiting-message").classList.remove("hidden");
        document.querySelector(".lucky-name").classList.add("hidden");

        // Auto stop scroll number if time is over 60 minutes.
        setTimeout(function(){
            if (isRun){
                $(".btn-stop").click();
            }
        }, 30000);
       
        set6Interval();
        isRunning = true;
    }else {
        document.getElementById('cd-sound').play();
        document.getElementById('roller-sound').pause(); 

        document.getElementById('bg-sound').currentTime = 0
        document.getElementById('bg-sound').play();

        // Get results from random function
        do {
            employObj = getRandomEmployID();
            employID  = employObj.id;
        } while(data.isHaveInDB(employID));
        
        // TO-DO list -  adding data to app's data structure


        employID  = Array.from(employID);

        //document.querySelector(".btn-start").classList.remove("hidden");
        //document.querySelector(".btn-stop").classList.add("hidden");

        document.querySelector(".btn-start").classList.add("hidden");
        document.querySelector(".btn-stop").classList.add("hidden");

        setTimeout(function(){
            document.querySelector(".btn-accept").classList.remove("hidden");
            document.querySelector(".btn-reject").classList.remove("hidden");
   
        }, 17500)
       
        setTimeout(reset6Interval, 8500 , 5, employID[5]);
        setTimeout(reset6Interval, 11000,  4, employID[4]);
        setTimeout(reset6Interval, 2000,  3, employID[3]);
        setTimeout(reset6Interval, 4500,  2, employID[2]);
        setTimeout(reset6Interval, 13000,  1, employID[1]);
        setTimeout(reset6Interval, 15000, 0, employID[0]); 
        setTimeout(showLuckyName,  17000, employObj.name);
    
    }
};

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

    document.getElementById('bg-sound').pause();
    document.getElementById('brass-sound').play();

    document.querySelector(".state-ready").classList.add("hidden");
    document.querySelector(".waiting-message").classList.add("hidden");

    document.querySelector(".lucky-name").innerHTML = name;
    document.querySelector(".lucky-name").classList.remove("hidden");
}

function changePrizeImage(prize){
    let allImage = $(".coin").children();
    Array.from(allImage).forEach((ele)=>{
        if (prize == ele.dataset.prize){
            ele.classList.remove("hidden");
        }else{
            ele.classList.add("hidden")
        }
    })

}

function showPersonIcon(prize){
    // Show person icon and num of prize on ".section-actions"
    if (data.isEmpty(prize)){
        $(".prize-count").addClass("hidden");
    }else{
        $(".prize-count").removeClass("hidden");
        // Update person counter
        $(".prize-count").text(data.afterDraw[prize].length);
    }
}