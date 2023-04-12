let rowmove = 4
let colmove = 2
drawtable()
createbuttons()

const url = "https://api.chucknorris.io/jokes/random/"
const theJoke = document.getElementById("joke")

fetch(url)
    .then(function (response) { return response.json() })
    .then(function (data) {

        console.log(data)

        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let value = document.createElement("h3")
        value.setAttribute("class", "value")
        value.innerHTML = data.value

        // Bilden verkar inte finnas
        // let img = document.createElement("img")
        // img.setAttribute("alt", "Image not found")
        // img.src = data.icon_url

        // card.appendChild(img)
        
        card.appendChild(value)
        theJoke.appendChild(card)


    })

function drawtable() {

    let field = document.getElementById("field")
    field.innerHTML = ""

    let table = document.createElement("table");

    for (let i = 0; i < 5; i++) {

        let row = table.insertRow();

        for (let j = 0; j < 5; j++) {

            let cell = row.insertCell()

            cell.innerHTML = i == rowmove && j == colmove ? "X" : " "

        }
    }

    field.appendChild(table)
}

function createbuttons() {

    let buttons = document.getElementById("buttons")

    let buttonup = document.createElement("input")
    buttonup.setAttribute("type", "button")
    buttonup.setAttribute("value", "Upp")
    buttonup.setAttribute("id", "buttonup")

    let buttondown = document.createElement("input")
    buttondown.setAttribute("type", "button")
    buttondown.setAttribute("value", "Ner")
    buttondown.setAttribute("id", "buttondown")

    let buttonright = document.createElement("input")
    buttonright.setAttribute("type", "button")
    buttonright.setAttribute("value", "Höger")
    buttonright.setAttribute("id", "buttonright")
    let buttonleft = document.createElement("input")
    buttonleft.setAttribute("type", "button")
    buttonleft.setAttribute("value", "Vänster")
    buttonleft.setAttribute("id", "buttonleft")


    buttons.appendChild(buttonup)
    buttons.appendChild(buttondown)
    buttons.appendChild(buttonleft)
    buttons.appendChild(buttonright)


}

function myFunction(value) {
    console.log(value);
    console.log(rowmove + " " + colmove)
    switch (value) {
        case 1:
            if (rowmove != 0) rowmove--
            break;
        case 2:
            if (rowmove != 4) rowmove++
            break;
        case 3:
            if (colmove != 0) colmove--
            break;
        case 4:
            if (colmove != 4) colmove++
            break;
    }
    drawtable()
}

// document.getElementById("buttonup").addEventListener("mouseover", function () { myFunction(1); }); ROLIG FUNKTION
document.getElementById("buttonup").addEventListener("click", function () { myFunction(1); });
document.getElementById("buttondown").addEventListener("click", function () { myFunction(2); });
document.getElementById("buttonleft").addEventListener("click", function () { myFunction(3); });
document.getElementById("buttonright").addEventListener("click", function () { myFunction(4); });

