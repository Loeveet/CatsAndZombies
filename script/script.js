drawtable()
function drawtable(){
    // let table = ""
    // table += "<table>"

    // for (let i = 0; i < 5; i++) {
    //     table += "<tr>"

    //     for (let j = 0; j < 5; j++) {
    //         table += "<td>" + " " + "</td>"

    //     }
    //     table += "</tr>"


    // }


    // table += "</table>"

    // document.getElementById("field").innerHTML = table
    
    // Skapa en tabell och lägg till den i dokumentet
    let table = document.createElement('table');
    let field = document.getElementById("field")
    document.body.appendChild(table);
    
    // Skapa rader och celler
    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) {
            var cell = row.insertCell();
            cell.innerHTML = 'Cell ' + (i * 5 + j + 1);
        }
    }

    field.appendChild(table)
}


