
$("#app-setting").click(function () {
    document.getElementById('bn-sound').play();

    $(".btn-info").trigger("click");
    
    // // Auto scroll to bottom of setting-popup
    // $('#myModal').on('shown.bs.modal', function () {
    // $('.btn-success').trigger('focus');
});

$("#app-results").click(function () {

    // function for render prizes list
    renderPrizes();

    document.getElementById('bn-sound').play();

    $(".btn-views").trigger("click");
})

$("#save-config").click(function () {

    document.getElementById('spin-sound').play();
    // TO-DO list -  get data into data of app
    data.numOfPrize.consolation = $("#consolation-prize").val();
    data.numOfPrize.bronze = $("#bronze-prize").val();
    data.numOfPrize.silver = $("#silver-prize").val();
    data.numOfPrize.gold = $("#gold-prize").val();
    data.numOfPrize.diamond = $("#diamond-prize").val();

    // Enable for start to draw
    if (!data.isConfig) {
        data.isConfig = true;
    }

    $.notify({
        icon: "./images/success-icon.png",
        message: '<strong style="line-height: 30px; padding-left: 20px;">Cập nhật cơ cấu giải thưởng thành công.</strong>',
    }, {
            icon_type: 'image',
            type: 'success'
        });
});


function renderPrizes() {
    let counter = 1;

    $("#list-prize").empty();
    $("#list-prize").append(`
        <table class="table table-dark " style="text-align: center !important;">
            <thead style="font-size: 20px !important; font-weight: bolder !important;">
            <tr>
                <th scope="col" style="color: rgb(9, 15, 65);">Stt</th>
                <th scope="col" style="min-width: 50px; min-height: 50px;"></th>
                <th scope="col" style="text-align: center !important; color: rgb(9, 15, 65);">Giải</th>
                <th scope="col" style="text-align: center !important; color: rgb(9, 15, 65);">Chủ giải</th>
                <th scope="col" style="text-align: center !important; color: rgb(9, 15, 65);">ID</th>
                <th scope="col" style="text-align: center !important; color: rgb(9, 15, 65);">Email</th>
                </tr>
            </thead>
            <tbody id="row-prize" style="background-image: linear-gradient(#DDDEEE, #FFFFFF);">
            </tbody>
        </table>
    `);
    
    if (!data.isEmpty("diamond")){
        data.afterDraw.diamond.forEach(function(el){
            $("#row-prize").append(`
                <tr style="border-radius: 20px !important;">
                    <th scope="row">${counter}</th>
                    <td><img class="prize-image rotate" src="./images/diamond-prize.svg"></td>
                    <td>Giải Đặt Biệt</td>
                    <td>${el.name}</td>
                    <td>${el.id}</td>
                    <td>${el.email}</td> 
                </tr>    
            `)
            counter++;
        })
    }

    if (!data.isEmpty("gold")){
        data.afterDraw.gold.forEach(function(el){
            $("#row-prize").append(`
                <tr style="border-radius: 20px !important;">
                    <th scope="row">${counter}</th>
                    <td><img class="prize-image rotate" src="./images/gold-prize.svg"></td>
                    <td>Giải Nhất</td>
                    <td>${el.name}</td>
                    <td>${el.id}</td>
                    <td>${el.email}</td> 
                </tr>    
            `)
            counter++;
        })
    }

    if (!data.isEmpty("silver")){
        data.afterDraw.silver.forEach(function(el){
            $("#row-prize").append(`
                <tr style="border-radius: 20px !important;">
                    <th scope="row">${counter}</th>
                    <td><img class="prize-image rotate" src="./images/silver-prize.svg"></td>
                    <td>Giải Nhì</td>
                    <td>${el.name}</td>
                    <td>${el.id}</td>
                    <td>${el.email}</td> 
                </tr>    
            `)
            counter++;
        })
    }

    if (!data.isEmpty("bronze")){
        data.afterDraw.bronze.forEach(function(el){
            $("#row-prize").append(`
                <tr style="border-radius: 20px !important;">
                    <th scope="row">${counter}</th>
                    <td><img class="prize-image rotate" src="./images/bronze-prize.svg"></td>
                    <td>Giải Ba</td>
                    <td>${el.name}</td>
                    <td>${el.id}</td>
                    <td>${el.email}</td> 
                </tr>    
            `)
            counter++;
        })
    }

    if (!data.isEmpty("consolation")){
        data.afterDraw.consolation.forEach(function(el){
            $("#row-prize").append(`
                <tr style="border-radius: 20px !important;">
                    <th scope="row">${counter}</th>
                    <td><img class="prize-image rotate" src="./images/consolation-prize.png"></td>
                    <td>Giải Khuyến Khích</td>
                    <td>${el.name}</td>
                    <td>${el.id}</td>
                    <td>${el.email}</td> 
                </tr>    
            `)
            counter++;
        })
    }
    
}