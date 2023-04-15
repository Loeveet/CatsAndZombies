//Att göra, justera så sidan passar till mobil också

let fieldsize = localStorage.getItem("fieldsize")
if (fieldsize === null) {
    fieldsize = 5
}
let posX = 2
let posY = 2
let catX = rndInt(0, fieldsize)
let catY = rndInt(0, fieldsize)
let zomX = rndInt(0, fieldsize)
let zomY = rndInt(0, fieldsize)
let catcount = 0
let zombielevel = localStorage.getItem("zombielevel")
if (zombielevel === null) {
    zombielevel = 2
}

let foundcat = false
let dead = false

let showCat = true
let showZombie = true
let difficultZombie = false

const url = "https://api.chucknorris.io/jokes/random/"
const theJoke = document.getElementById("joke")

//Använder inte bildtext för tillfället. Tyckte inte att det fyllde någon funktion. Men de finns om man vill lägga till
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
    { image: "images/wave.jpg", value: "En våg perfekt att surfa på" }]


printScore()
showimage()
showbuttons()

fetch(url)
    .then(function (response) { return response.json() })
    .then(function (data) {

        console.log(data)

        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let value = document.createElement("p")
        value.setAttribute("class", "joke")
        value.setAttribute("id", "joke")
        value.innerHTML = data.value

        card.appendChild(value)
        theJoke.appendChild(card)


    })

drawtableflex()
printRange()

document.getElementById("buttonleft").addEventListener("click", function () { changePosition(1) })
document.getElementById("buttonright").addEventListener("click", function () { changePosition(2) })
document.getElementById("buttonup").addEventListener("click", function () { changePosition(3) })
document.getElementById("buttondown").addEventListener("click", function () { changePosition(4) })


function drawtableflex() {
    console.log("Spelare: " + posX + " " + posY)
    console.log("Kissekatten: " + catX + " " + catY)
    console.log("Zombie: " + zomX + " " + zomY)
    console.log("Counter: " + catcount)
    console.log("Zombielevel: " + zombielevel)
    console.log("svår zombie: " + difficultZombie)


    let flexboxfield = document.getElementById("flexboxfield")
    flexboxfield.innerHTML = ""


    for (let i = 0; i < (fieldsize * fieldsize); i++) {
        let square = document.createElement("div")
        square.setAttribute("class", "square")
        flexboxfield.appendChild(square)
    }

    let squares = document.querySelectorAll(".square")

    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        square.style.flexBasis = (100 / fieldsize - 1) + "%"

        let x = i % fieldsize;
        let y = Math.floor(i / fieldsize)

        if (x === posX && y === posY) {
            square.innerHTML = "X"
        }

        else if (x == catX && y == catY) {
            if (showCat) {
                square.innerHTML = "C"

            }
        }
        else if (x == zomX && y == zomY) {
            if (showZombie) {
                square.innerHTML = "Z"

            }
        }

        posX == zomX && posY == zomY ? dead = true : dead = false
        posX == catX && posY == catY ? foundcat = true : foundcat = false
    }

}

function changesize(size) {
    fieldsize = size
    localStorage.setItem("fieldsize", size)
    drawtableflex()
}

function changelevel(level) {
    zombielevel = (4 - level)
    localStorage.setItem("zombielevel", 4 - level)
    drawtableflex()
    console.log("level: " + level)
}

function printRange() {

    let optionDiv = document.getElementById("option")
    optionDiv.innerHTML = ""

    let rangetext = document.createElement("label")
    rangetext.innerHTML = "Justera banstorlek "
    rangetext.setAttribute("class", "rangetext")


    let fieldrange = document.createElement("input")
    fieldrange.setAttribute("type", "range")
    fieldrange.setAttribute("min", "4")
    fieldrange.setAttribute("max", "8")
    fieldrange.setAttribute("value", fieldsize)
    fieldrange.setAttribute("oninput", "changesize(this.value)")
    fieldrange.setAttribute("class", "fieldrange")

    let zombielevellabel = document.createElement("label")
    zombielevellabel.innerHTML = "Lätt - Ändra svårighetsgrad - Svårt"
    zombielevellabel.setAttribute("class", "zombielevellabel")


    let zombielevelinput = document.createElement("input")
    zombielevelinput.setAttribute("type", "range")
    zombielevelinput.setAttribute("min", "0")
    zombielevelinput.setAttribute("max", "3")
    zombielevelinput.setAttribute("value", 4 - zombielevel)
    zombielevelinput.setAttribute("oninput", "changelevel(this.value)")
    zombielevelinput.setAttribute("class", "zombielevelinput")

    let toggleCatLabel = document.createElement("label")
    toggleCatLabel.innerText = "Visa Katt: På"
    toggleCatLabel.setAttribute("for", "togglecat")

    let toggleCatInput = document.createElement("input")
    toggleCatInput.setAttribute("type", "checkbox")
    toggleCatInput.setAttribute("id", "togglecat")
    toggleCatInput.setAttribute("checked", true)
    toggleCatInput.checked = true
    toggleCatInput.addEventListener("change", () => {
        showCat = toggleCatInput.checked
        toggleCatLabel.innerText = "Visa Katt: " + (showCat ? "På" : "Av")
        drawtableflex()
    })

    let toggleZombieLabel = document.createElement("label")
    toggleZombieLabel.innerText = "Visa Zombie: På"
    toggleZombieLabel.setAttribute("for", "togglezombie")

    let toggleZombieInput = document.createElement("input")
    toggleZombieInput.setAttribute("type", "checkbox")
    toggleZombieInput.setAttribute("id", "togglezombie")
    toggleZombieInput.setAttribute("checked", true)
    toggleZombieInput.checked = true
    toggleZombieInput.addEventListener("change", () => {
        showZombie = toggleZombieInput.checked
        toggleZombieLabel.innerText = "Visa Zombie: " + (showZombie ? "På" : "Av")
        drawtableflex()
    })

    let difficultZombieLabel = document.createElement("label")
    difficultZombieLabel.innerText = "Svår Zombie: Av"
    difficultZombieLabel.setAttribute("for", "difficultZombie")

    let difficultZombieInput = document.createElement("input")
    difficultZombieInput.setAttribute("type", "checkbox")
    difficultZombieInput.setAttribute("id", "difficultZombie")
    difficultZombieInput.setAttribute("checked", false)
    difficultZombieInput.checked = false
    difficultZombieInput.addEventListener("change", () => {
        difficultZombie = difficultZombieInput.checked
        difficultZombieLabel.innerText = "Svår Zombie: " + (difficultZombie ? "På" : "Av")
        drawtableflex()
    })

    optionDiv.appendChild(zombielevellabel)
    optionDiv.appendChild(zombielevelinput)
    optionDiv.appendChild(difficultZombieLabel)
    optionDiv.appendChild(difficultZombieInput)
    optionDiv.appendChild(toggleZombieLabel)
    optionDiv.appendChild(toggleZombieInput)
    optionDiv.appendChild(toggleCatLabel)
    optionDiv.appendChild(toggleCatInput)
    optionDiv.appendChild(rangetext)
    optionDiv.appendChild(fieldrange)
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
    row1.setAttribute("class", "buttonsrow1")

    let revivebutton = document.createElement("input")
    revivebutton.setAttribute("type", "button")
    revivebutton.setAttribute("value", "Börja om")
    revivebutton.setAttribute("id", "revivebutton")
    revivebutton.setAttribute("class", "revivebutton")
    revivebutton.setAttribute("onclick", "location.reload()")

    row1.appendChild(revivebutton)
    buttons.appendChild(row1)

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
                drawtableflex()
                showimage()
            }
            break
        case 2:
            if (posX != fieldsize - 1) {
                posX++
                movezombie()
                drawtableflex()
                showimage()
            }
            break
        case 3:
            if (posY != 0) {
                posY--
                movezombie()
                drawtableflex()
                showimage()
            }
            break
        case 4:
            if (posY != fieldsize - 1) {
                posY++
                movezombie()
                drawtableflex()
                showimage()
            }
            break
    }

}

function movezombie() {
    let randommove = rndInt(0, zombielevel)
    if (randommove === 0) {
        if (!difficultZombie) {

                //Enkel zombie
            if (Math.abs(zomX - posX) > Math.abs(zomY - posY)) {
                if (zomX < posX) {
                    zomX++
                } else if (zomX > posX) {
                    zomX--
                }
            }
            else {
                if (zomY < posY) {
                    zomY++
                } else if (zomY > posY) {
                    zomY--
                }
            }
        }
        else {

            //Svår zombie
            if (zomX < posX) {
                zomX++
            } else if (zomX > posX) {
                zomX--
            }
            if (zomY < posY) {
                zomY++
            } else if (zomY > posY) {
                zomY--
            }
        }

    }

}


function showimage() {
    let rndNum = rndInt(0, images.length)

    let image = document.getElementById("image")
    image.innerHTML = ""

    let backimage = document.createElement("img")
    backimage.src = images[rndNum].image
    backimage.setAttribute("class", "image")

    let catimage = document.createElement("img")
    catimage.src = "images/gustav.png"
    catimage.setAttribute("class", "catimage")

    let zombieimage = document.createElement("img")
    zombieimage.src = "images/zombie.png"
    zombieimage.setAttribute("class", "zombieimage")

    image.appendChild(backimage)
    if (dead == true) {
        image.appendChild(zombieimage)
        printDead()
        showbuttons()
    }
    else if (foundcat == true) {
        catcount++
        printScore()
        image.appendChild(catimage)
        catX = rndInt(0, fieldsize)
        catY = rndInt(0, fieldsize)
        foundcat = false
        drawtableflex()
    }

}

function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

