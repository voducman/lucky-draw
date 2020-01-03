let employList = [];
let employString = "";
let fileName = "employees.js";

document.querySelector("#get-info").addEventListener("change", (e)=>{
    // to-do list
    const file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e){
        ProcessExcel(e.target.result);
    }

    reader.readAsBinaryString(file);
});

function ProcessExcel(data){
    let count = 1;
    //Read the Excel File data.
    let workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    let firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Create a HTML Table element.
    let table = document.createElement("table");
    table.border = "1";

    //Add the header row.
    let row = table.insertRow(-1);

    //Add the header cells.
    let headerCell = document.createElement("TH");
    headerCell.innerHTML = "Stt";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Id";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Name";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Email";
    row.appendChild(headerCell);

    //Add the data rows from Excel file.
    for (let i = 0; i < excelRows.length; i++) {
        console.log(excelRows[i]);
        if (isNaN(parseInt(excelRows[i].__EMPTY))) {
            continue;
        }

        let obj = {id: "", name: "", email: ""};
        //Add the data row.
        let row = table.insertRow(-1);

        //Add the data cells.
        // STT
        let cell = row.insertCell(-1);
        cell.innerHTML = count;
        count++;

        // Idnetify
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].__EMPTY_1;
        obj["id"] = excelRows[i].__EMPTY_1;

        // Full name
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].__EMPTY_2;
        obj["name"] = excelRows[i].__EMPTY_2;

        // Email
        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].__EMPTY_3;
        obj["email"] = excelRows[i].__EMPTY_3;

        employList.push(obj);
    }

    let dvExcel = document.getElementById("content");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);

    saveData(employList, fileName);
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            json = `const employees = ${json};
                    console.log(employees);`;
            blob = new Blob([json], {type: "text/javascript"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());



