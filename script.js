function initialize() {
    diceTable = document.getElementById("table"); 
}

function setMode(num) {
    clearRows(); 
    var rows = (num * 6) - (num-1); 
    var count = num; 
    for (var i = 0; i < rows; ++i) {
        var newRow = diceTable.insertRow(); 
        var newCell = newRow.insertCell(); 
        newCell.innerHTML = count; 
        count++; 

        newCell = newRow.insertCell(); 
        newCell.innerHTML = 0; 
    }
}

function clearRows() {
    for (var i = 1; i < diceTable.rows.length; ++i) {
        diceTable.deleteRow(i); 
    } 
}