function initialize() {
    diceTable = document.getElementById("table"); 
    mode=""; 
    diceRolls=[]; 
    total = 0; 
    totalRolls=[];  
    doubleNum = document.getElementById("doubles"); 
    tripleNum = document.getElementById("triples"); 
    meanNum = document.getElementById("mean"); 
    medianNum = document.getElementById("median"); 
    modeNum = document.getElementById("mode"); 
}

function clearRows() {
    for (var i = 1; i < diceTable.rows.length; ++i) {
        diceTable.deleteRow(i); 
        i--; 
    } 
} 

function setMode(num) { 
    mode=num;
    totalRolls=[];  
    doubleNum.innerHTML = 0; 
    tripleNum.innerHTML = 0; 
    meanNum.innerHTML = 0; 
    medianNum.innerHTML = 0; 
    modeNum.innerHTML = 0; 
    var rows = (num * 6) - (num-1); 
    var count = num; 
    clearRows(); 
    for (var i = 0; i < rows; ++i) {
        var newRow = diceTable.insertRow(); 
        var newCell = newRow.insertCell(); 
        newCell.innerHTML = count; 
        count++; 

        newCell = newRow.insertCell(); 
        newCell.innerHTML = 0; 
    }
}

function roll() {
    diceRolls = []; 
    total = 0; 
    for (var i = 0; i < mode; ++i) {
        var rollnum = getRandomInteger(1, 6);  
        diceRolls.push(rollnum); 
        total += rollnum;     
    } 
    totalRolls.push(total); 
    updateTable(); 
    numTriples();
    numDoubles();
    findMean();  
    findMedian(); 
    findMode();     
}

function getRandomInteger(lower, upper) {
    var multiplier = upper - (lower-1); 
    var rnd = parseInt(Math.random() * multiplier) + lower; 
    
    return rnd; 
}

function updateTable() {
    for (var j = 1; j < diceTable.rows.length; ++j) {
        if (diceTable.rows[j].cells[0].innerHTML == total) {
            var count = diceTable.rows[j].cells[1].innerHTML; 
            count++; 
            diceTable.rows[j].cells[1].innerHTML = count; 
        }
    }     
}

function numDoubles() {
    var hasDoubles = false; 
    if (mode == 2) {
        if (diceRolls[0] == diceRolls[1]) {
            hasDoubles = true; 
        }
    }
    else if (mode == 3) {
        if (diceRolls[0] == diceRolls[1] || diceRolls[0] == diceRolls[2] || diceRolls[1] == diceRolls[2]) {
            hasDoubles = true; 
        }
    }
    else {
        return; 
    }
    if (hasDoubles) {
        var count = doubleNum.innerHTML; 
        count++; 
        doubleNum.innerHTML = count; 
    }
}

function numTriples() {
    var hasTriples = false; 
    if (mode == 3) {
        if (diceRolls[0] == diceRolls[1] && diceRolls[0] == diceRolls[2]) {
            hasTriples = true; 
        }
    }
    else {
        return; 
    }
    if (hasTriples) {
        var count = tripleNum.innerHTML; 
        count++; 
        tripleNum.innerHTML = count; 
    }
}

function findMean() {
    var total = 0; 
    var mean = 0; 
    for (var i = 0; i < totalRolls.length; ++i) {
        total += totalRolls[i]; 
    }
    mean = total / totalRolls.length; 
    meanNum.innerHTML = mean; 
}

function findMedian() {
    totalRolls.sort((a, b) => a - b);
    var mid = Math.floor(totalRolls.length / 2);
    var median = totalRolls.length % 2 === 1 ?
    totalRolls[mid] : 
    (totalRolls[mid - 1] + totalRolls[mid]) / 2; 
    medianNum.innerHTML = median; 
}

function findMode() { 
    modeNum.innerHTML = ""; 
    var modes = []; 
    var maxCount=0;   
    for (var i = 0; i < totalRolls.length; ++i){
        var count = 0;
        for (var j = 0; j < totalRolls.length; ++j){
        if (totalRolls[j] == totalRolls[i]) ++count;
        }
        if (count > maxCount){
        maxCount = count;
        modes = []; 
        modes.push( totalRolls[i] );
        } else if ( count == maxCount ){
        modes.push( totalRolls[i] );
        }
        else {
            continue; 
        }
    }

    for (var k = 0; k < modes.length; ++k) {
        console.log(modes[k]);
        if (modes[k+1] != modes[k]) {
            modeNum.innerHTML += " " + modes[k]; 
        }
    }
}

