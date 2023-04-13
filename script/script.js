let size = 7 //Skapa slider för att kunna ändra här, bygga css samt se till att eventen händer vid rätt ruta
let posX = 2
let posY = 2
let catX = rndInt(0, size)
let catY = rndInt(0, size)
let zomX = rndInt(0, size)
let zomY = rndInt(0, size)
let catcount = 0

let foundcat = false
let dead = false


let images = [
    { image: "images/cabinbylake.jpg", value: "Från stugan kan man dyka ner i sjön" },
    { image: "images/reef.jpg", value: "Fiskarna har möte vid revet" },
    { image: "images/skog.jpg", value: "Solen skiner genom gläntan i skogen" },
    { image: "images/asianhouse.jpg", value: "Vackert hus i skogen" },
    { image: "images/lakeandsnowymontains.avif", value: "Vackra berg bakom en spegelsjö" },
    { image: "images/oldcabininthewoods.jpg", value: "Sliten stuga i morgonljuset" },
    { image: "images/pinktree.jpg", value: "Blommande körsbärsträd" },
    { image: "images/stream.jpg", value: "Strömmande vatten" },
    { image: "images/sunsetandbirds.jpg", value: "Fåglarna flyger tillsammans i solnedgången" },
    { image: "images/valley.jpg", value: "Valley" },
    { image: "images/waterfall.jpg", value: "Waterfall" },
    { image: "images/waterfallandmountain.jpg", value: "Waterfall and mountain" },
    { image: "images/wave.jpg", value: "En våg perfekt att surfa på" }];

const url = "https://api.chucknorris.io/jokes/random/"
const theJoke = document.getElementById("joke")

printScore()
showimage()
// drawtable()
showbuttons()

fetch(url)
    .then(function (response) { return response.json() })
    .then(function (data) {

        console.log(data)

        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let value = document.createElement("h3")
        value.setAttribute("class", "value")
        value.innerHTML = data.value

        card.appendChild(value)
        theJoke.appendChild(card)


    })

drawtableflex()

document.getElementById("buttonleft").addEventListener("click", function () { changePosition(1); });
document.getElementById("buttonright").addEventListener("click", function () { changePosition(2); });
document.getElementById("buttonup").addEventListener("click", function () { changePosition(3); });
document.getElementById("buttondown").addEventListener("click", function () { changePosition(4); });


function drawtableflex() {
    console.log("Spelare: " + posX + " " + posY)
    console.log("Kissekatten: " + catX + " " + catY)
    console.log("Zombie: " + zomX + " " + zomY)
    console.log("Counter: " + catcount)

    let flexboxtest = document.getElementById("flexboxtest")
    flexboxtest.innerHTML = ""

    for (let i = 0; i < (size*size); i++) { //Göra slider för värdet här
        var square = document.createElement("div");
        square.setAttribute("class", "square")
        flexboxtest.appendChild(square)
    }

    var squares = document.querySelectorAll('.square');

    for (var i = 0; i < squares.length; i++) {
        var square = squares[i]
        square.style.flexBasis = (100 / size - 1) + "%"

        var x = i % size;
        var y = Math.floor(i / size);

        if (x === posX && y === posY) {
            square.innerHTML = "X"
        }

        // if (x === zomX && y === zomY) {
        //     square.innerHTML = "Z"
        // }

        else if (x == catX && y == catY) {
            square.innerHTML = "C"
        }
        else if (x == zomX && y == zomY) {
            square.innerHTML = "Z"
        }

        posX == zomX && posY == zomY ? dead = true : dead = false
        posX == catX && posY == catY ? foundcat = true : foundcat = false
    }

}

function printScore() {
    let score = document.getElementById("score")
    score.innerHTML = ""

    let currentscore = document.createElement("h4")
    currentscore.setAttribute("id", "currentscore")
    currentscore.innerHTML = "Hittade katter: " + catcount

    score.appendChild(currentscore)
}

function printDead() {
    let text = document.getElementById("currentscore")
    text.innerHTML = "Zombien tog dig! MEN du hann hitta " + catcount + " katter"
    catcount = 0


}
function showbuttons() {
    if (!dead) createbuttons()
    else tryagainbutton()
}
function tryagainbutton() {
    let buttons = document.getElementById("button-container")
    buttons.innerHTML = ""

    let row1 = document.createElement("div")
    let row2 = document.createElement("div")
    let row3 = document.createElement("div")

    let revivebutton = document.createElement("input")
    revivebutton.setAttribute("type", "button")
    revivebutton.setAttribute("value", "Börja om")
    revivebutton.setAttribute("id", "revivebutton")
    revivebutton.setAttribute("class", "revivebutton")
    revivebutton.setAttribute("onclick", "location.reload()")


    row2.appendChild(revivebutton)

    buttons.appendChild(row2)

}
function createbuttons() {

    let buttons = document.getElementById("button-container")
    buttons.innerHTML = ""

    let row1 = document.createElement("div")
    row1.setAttribute("class", "buttonsrow1")
    let buttonup = document.createElement("input")
    buttonup.setAttribute("type", "button")
    buttonup.setAttribute("value", "Upp")
    buttonup.setAttribute("id", "buttonup")
    buttonup.setAttribute("class", "button")
    row1.appendChild(buttonup)


    let row2 = document.createElement("div")
    row2.setAttribute("class", "buttonsrow2")
    let buttonleft = document.createElement("input")
    buttonleft.setAttribute("type", "button")
    buttonleft.setAttribute("value", "Vänster")
    buttonleft.setAttribute("id", "buttonleft")
    buttonleft.setAttribute("class", "button")

    let buttonright = document.createElement("input")
    buttonright.setAttribute("type", "button")
    buttonright.setAttribute("value", "Höger")
    buttonright.setAttribute("id", "buttonright")
    buttonright.setAttribute("class", "button")

    row2.appendChild(buttonleft)
    row2.appendChild(buttonright)

    let row3 = document.createElement("div")
    row3.setAttribute("class", "buttonsrow3")
    let buttondown = document.createElement("input")
    buttondown.setAttribute("type", "button")
    buttondown.setAttribute("value", "Ner")
    buttondown.setAttribute("id", "buttondown")
    buttondown.setAttribute("class", "button")

    row3.appendChild(buttondown)

    buttons.appendChild(row1)
    buttons.appendChild(row2)
    buttons.appendChild(row3)


}

function changePosition(value) {
    switch (value) {
        case 1:
            if (posX != 0) {
                posX--
                movezombie()
                showimage()
            }
            break;
        case 2:
            if (posX != size - 1) {
                posX++
                movezombie()
                showimage()
            }
            break;
        case 3:
            if (posY != 0) {
                posY--
                movezombie()
                showimage()
            }
            break;
        case 4:
            if (posY != size - 1) {
                posY++
                movezombie()
                showimage()
            }
            break;
    }
    // drawtable()
    drawtableflex()

}

function movezombie() {
    let randommove = rndInt(0, 3)
    if (randommove === 0) {

        if (Math.abs(zomX - posX) > Math.abs(zomY - posY)) {
            if (zomX < posX) {
                zomX++;
            } else if (zomX > posX) {
                zomX--;
            }
        } else {
            if (zomY < posY) {
                zomY++;
            } else if (zomY > posY) {
                zomY--;
            }
        }
    }

}





function showimage() {
    let rndNum = rndInt(0, images.length)

    let image = document.getElementById("image")
    image.innerHTML = ""

    let bigimage = document.createElement("img")
    bigimage.src = images[rndNum].image
    bigimage.setAttribute("class", "image")

    let bigimagetext = document.createElement("p")
    bigimagetext.innerHTML = images[rndNum].value

    let catimage = document.createElement("img")
    catimage.src = "images/gustav.png"
    catimage.setAttribute("class", "catimage")

    let zombieimage = document.createElement("img")
    zombieimage.src = "images/zombie.png"
    zombieimage.setAttribute("class", "zombieimage")

    image.appendChild(bigimage)
    if (foundcat == true) {
        catcount++
        printScore()
        image.appendChild(catimage)
        catX = rndInt(0, 5)
        catY = rndInt(0, 5)
        foundcat = false
        // drawtable()
        drawtableflex()
    }
    else if (dead == true) {
        image.appendChild(zombieimage)
        printDead()
        showbuttons()
        zomX = rndInt(0, 5)
        zomY = rndInt(0, 5)
        dead = false
        // drawtable()
        drawtableflex()
    }
    image.appendChild(bigimagetext)

}

function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function drawtable() {

    console.log("Spelare: " + posX + " " + posY)
    console.log("Kissekatten: " + catX + " " + catY)
    console.log("Zombie: " + zomX + " " + zomY)
    console.log("Counter: " + catcount)


    let field = document.getElementById("field")
    field.innerHTML = ""
    let matrix = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25]
    ];

    let table = document.createElement("table");

    for (let i = 0; i < matrix.length; i++) {

        let row = table.insertRow();

        for (let j = 0; j < matrix[i].length; j++) {

            let cell = row.insertCell()

            if (i == posX && j == posY) {
                cell.innerHTML = "X"
            }
            else if (i == catX && j == catY) {
                cell.innerHTML = "C"
            }
            else if (i == zomX && j == zomY) {
                cell.innerHTML = "Z"
            }
            else {
                cell.innerHTML = " "
            }

            posX == zomX && posY == zomY ? dead = true : dead = false
            posX == catX && posY == catY ? foundcat = true : foundcat = false

        }
    }

    field.appendChild(table)
}
