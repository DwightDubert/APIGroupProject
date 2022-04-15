// no brain
// head empty
window.canAttack = false;

// Gives player starter pokemon
async function pickStarters() {

    let starterImg1 = document.getElementById("starter1")
    const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/2`);
    starterImg1.setAttribute("src", pokemonData.data.sprites.front_default)

    let starterImg2 = document.getElementById("starter2")
    const pokemonData2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/5`);
    starterImg2.setAttribute("src", pokemonData2.data.sprites.front_default)

    let starterImg3 = document.getElementById("starter3")
    const pokemonData3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/8`);
    starterImg3.setAttribute("src", pokemonData3.data.sprites.front_default)

    document.getElementById("starter1").addEventListener("click", function () { setStarter(1) })
    document.getElementById("starter2").addEventListener("click", function () { setStarter(2) })
    document.getElementById("starter3").addEventListener("click", function () { setStarter(3) })
}

// Sets the starter pokemon when the pokemon is clicked
async function setStarter(chosenStarter) {
    if (chosenStarter == 1) {
        let img = await getPokemonBackImg(2)
        document.getElementById("playerPokemonImg").setAttribute("src", img)
        let hp = await getPokemonHP(2)
        window.playerHP = hp
        document.getElementById("playerPokemonHP").innerText = hp + ":HP"
        await getPokemonAttacks(2)
        document.getElementById("playerPokemonName").innerText = await getName(2)
        window.playerID = 2
        window.currentPokemonEXP = 0
    }
    else
        if (chosenStarter == 2) {
            let img = await getPokemonBackImg(5)
            document.getElementById("playerPokemonImg").setAttribute("src", img)
            let hp = await getPokemonHP(5)
            window.playerHP = hp
            document.getElementById("playerPokemonHP").innerText = hp + ":HP"
            await getPokemonAttacks(5)
            document.getElementById("playerPokemonName").innerText = await getName(5)
            window.playerID = 5
            window.currentPokemonEXP = 0
        }
        else
            if (chosenStarter == 3) {
                let img = await getPokemonBackImg(8)
                document.getElementById("playerPokemonImg").setAttribute("src", img)
                let hp = await getPokemonHP(8)
                window.playerHP = 8000
                document.getElementById("playerPokemonHP").innerText = window.playerHP + ":HP"
                await getPokemonAttacks(8)
                document.getElementById("playerPokemonName").innerText = await getName(8)
                window.playerID = 8
                window.currentPokemonEXP = 0
            }
    window.canAttack = true;
    document.getElementById("chooseStarter").style.visibility = "hidden";
    await makeEnemyPokemon()
}


// ===================================
// RETURN DIFFERENT DATA ABOUT POKEMON
// ===================================
async function getPokemonBackImg(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    return (pokemonData.data.sprites.back_default);
}
async function getPokemonHP(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    return (pokemonData.data.stats[0].base_stat);
}
async function getName(id) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const pokemonData = await axios.get(url);
    return capitalizeFirstLetter(pokemonData.data.species.name)
}
async function getPokemonAttacks(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    let attackArray = []
    for (let i = 0; i < 4; i++) {
        attack = Math.floor(Math.random() * (pokemonData.data.moves.length))
        if (attack == attackArray[0] || attack == attackArray[1] || attack == attackArray[2] || attack == attackArray[3]) {
            i -= 1
        } else {
            attackArray.push(attack)
        }
    }
    let attack1 = pokemonData.data.moves[attackArray[0]].move.name
    let attack2 = pokemonData.data.moves[attackArray[1]].move.name
    let attack3 = pokemonData.data.moves[attackArray[2]].move.name
    let attack4 = pokemonData.data.moves[attackArray[3]].move.name
    window.attack1 = attack1
    window.attack2 = attack2
    window.attack3 = attack3
    window.attack4 = attack4
    document.getElementById("attack1").innerText = capitalizeFirstLetter(attack1.replace("-", " "))
    document.getElementById("attack2").innerText = capitalizeFirstLetter(attack2.replace("-", " "))
    document.getElementById("attack3").innerText = capitalizeFirstLetter(attack3.replace("-", " "))
    document.getElementById("attack4").innerText = capitalizeFirstLetter(attack4.replace("-", " "))
    attack1Url = pokemonData.data.moves[attackArray[0]].move.url
    attack2Url = pokemonData.data.moves[attackArray[1]].move.url
    attack3Url = pokemonData.data.moves[attackArray[2]].move.url
    attack4Url = pokemonData.data.moves[attackArray[3]].move.url
    move1Data = await axios.get(attack1Url)
    move2Data = await axios.get(attack2Url)
    move3Data = await axios.get(attack3Url)
    move4Data = await axios.get(attack4Url)
    setMoveColor(move1Data, "attack1")
    setMoveColor(move2Data, "attack2")
    setMoveColor(move3Data, "attack3")
    setMoveColor(move4Data, "attack4")

    return (pokemonData.data.stats[0].base_stat);
}
function setMoveColor(url, element) {
    if (url.data.type.name == "normal") {
        document.getElementById(element).style.backgroundColor = "#c0c0c0"
    }
    else if (url.data.type.name == "fire") {
        document.getElementById(element).style.backgroundColor = "#FA7053"
    }
    else if (url.data.type.name == "water") {
        document.getElementById(element).style.backgroundColor = "#798CFF"
    }
    else if (url.data.type.name == "grass") {
        document.getElementById(element).style.backgroundColor = "#71FF7F"
    }
    else if (url.data.type.name == "flying") {
        document.getElementById(element).style.backgroundColor = "#F8F8F8"
    }
    else if (url.data.type.name == "fighting") {
        document.getElementById(element).style.backgroundColor = "#AA0019"
    }
    else if (url.data.type.name == "poison") {
        document.getElementById(element).style.backgroundColor = "#914AFF"
    }
    else if (url.data.type.name == "electric") {
        document.getElementById(element).style.backgroundColor = "#FFF950"
    }
    else if (url.data.type.name == "ground") {
        document.getElementById(element).style.backgroundColor = "#E57C00"
    }
    else if (url.data.type.name == "rock") {
        document.getElementById(element).style.backgroundColor = "#B06000"
    }
    else if (url.data.type.name == "psychic") {
        document.getElementById(element).style.backgroundColor = "#DE40FF"
    }
    else if (url.data.type.name == "ice") {
        document.getElementById(element).style.backgroundColor = "#A1FFFE"
    }
    else if (url.data.type.name == "bug") {
        document.getElementById(element).style.backgroundColor = "#A1D053"
    }
    else if (url.data.type.name == "ghost") {
        document.getElementById(element).style.backgroundColor = "#8073A6"
    }
    else if (url.data.type.name == "steel") {
        document.getElementById(element).style.backgroundColor = "#A6A6A6"
    }
    else if (url.data.type.name == "dragon") {
        document.getElementById(element).style.backgroundColor = "#DCDC71"
    }
    else if (url.data.type.name == "dark") {
        document.getElementById(element).style.backgroundColor = "#3F3E5D"
    }
    else if (url.data.type.name == "fairy") {
        document.getElementById(element).style.backgroundColor = "#F59CF7"
    }
}
async function getMoveType(name) {
    let url = "https://pokeapi.co/api/v2/move/" + id
    let type = await url.data.type.name
    return type
}
async function getPokemonType(id) {
    let url = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
    let types = [];
    types.push(url.data.types[0].type.name)
    console.log(url.data.types.length);
    if (url.data.types.length == 2) {
        types.push(url.data.types[1].type.name)
    } else {
        types.push(undefined)
    }

    return types
}


// We stole these two functions off Stack Overflow
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function scrollToBottom() {
    document.getElementById('log').scrollIntoView(false);
}


// Spawn new enemy pokemon
async function makeEnemyPokemon() {
    let id = Math.floor((Math.random() * 149) + 1)
    window.enemyID = id
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const pokemonData = await axios.get(url);
    let rng = (Math.floor(Math.random() * 50))
    console.log("Shiny roll: " + rng);
    if (rng == 42) {
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_shiny)
        document.getElementById("log").innerHTML += "Shiny " + await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    } else {
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_default)
        document.getElementById("log").innerHTML += await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    }
    document.getElementById("enemyPokemonName").innerText = await getName(id)
    document.getElementById("enemyPokemonHP").innerText = "HP: " + await getPokemonHP(id)
    window.enemyHP = await getPokemonHP(id)

    setTimeout(async () => {
        document.getElementById("enemyPokemonImg").style.visibility = 'visible'
    }, 200)
}

async function doAttack(target, attack) {
    if (attack == "attack1") {
        let currentAttack = window.attack1
    } else if (attack == "attack2") {
        let currentAttack = window.attack2
    } else if (attack == "attack3") {
        let currentAttack = window.attack3
    } else if (attack == "attack4") {
        let currentAttack = window.attack4
    }
    let bonus = 0
    let chance = Math.floor((Math.random() * 10) + 1)
    console.log(chance);
    if (chance == 1) {
        dmg = 0
        console.log("YOU MISEED Idiot");
    } else if (chance == 10) {
        dmg = Math.floor((Math.random() * 15) + 15)
    } else {
        dmg = Math.floor((Math.random() * 5) + 5)
    }

    // When player attacks enemy
    if (target == "enemy" && window.canAttack == true) {
        jiggle("player")

        // Bonus Damage 
        if (getPokemonType(window.enemyID)[1] == "normal") {
            if (getMoveType(currentAttack) == "fighting") {
                bonus += Math.floor(Math.random()*5)+5
            }
        // =============================
        }
        if (getPokemonType(window.enemyID)[1] == "fighting") {
            if (getMoveType(currentAttack) == "flying") {
                bonus += Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "fairy") {
                bonus += Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "psychic") {
                bonus += Math.floor(Math.random()*5)+5
            }
            // =============================
            if (getMoveType(currentAttack) == "normal") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "rock") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "steel") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "ice") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "dark") {
                bonus -= Math.floor(Math.random()*5)+5
            }
        }
        if (getPokemonType(window.enemyID)[1] == "flying") {
            if (getMoveType(currentAttack) == "rock") {
                bonus += Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "ice") {
                bonus += Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "electric") {
                bonus += Math.floor(Math.random()*5)+5
            }
            // =============================
            if (getMoveType(currentAttack) == "fighting") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "bug") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "grass") {
                bonus -= Math.floor(Math.random()*5)+5
            }
        }
        if (getPokemonType(window.enemyID)[1] == "poison") {
            if (getMoveType(currentAttack) == "psychic") {
                bonus += Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "ground") {
                bonus += Math.floor(Math.random()*5)+5
            }
            // =============================
            if (getMoveType(currentAttack) == "grass") {
                bonus -= Math.floor(Math.random()*5)+5
            }
            if (getMoveType(currentAttack) == "fairy") {
                bonus -= Math.floor(Math.random()*5)+5
            }
        }
//https://i.ytimg.com/vi/ZN2oc_oYaYs/maxresdefault.jpg
        if (dmg < window.enemyHP) {
            window.enemyHP -= dmg
            document.getElementById("enemyPokemonHP").innerText = "HP: " + window.enemyHP
            if (dmg == 0) {
                document.getElementById("log").innerHTML += await getName(window.playerID) + " missed! <br>"
                scrollToBottom()

            } else if (dmg >= 15) {
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit for " + dmg + "dmg! (CRITICAL!!!) <br>"
                scrollToBottom()
            } else {
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit for " + dmg + "dmg! <br>"
                scrollToBottom()
            }
        } else {
            window.canAttack = false
            document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit for " + dmg + "dmg and fainted! <br>"
            scrollToBottom()
            document.getElementById("enemyPokemonHP").innerText = "HP: Fainted!"
            document.getElementById("enemyPokemonImg").style.visibility = 'hidden'
            await gainEXP()
            setTimeout(makeEnemyPokemon, 2000);
        }

        window.canAttack = false
        if (document.getElementById("enemyPokemonImg").style.visibility == "visible") {
            setTimeout(doAttack, 1000, "player");
        } else {
            setTimeout(() => {
                window.canAttack = true
            }, 3000);
        }

        // If enemy attacks player
    } else if (target == "player") {
        jiggle("enemy")
        if (dmg < window.playerHP) {
            window.playerHP -= dmg
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
            window.canAttack = true

            if (dmg == 0) {
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " missed! <br>"
                scrollToBottom()
            } else if (dmg >= 15) {
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit for " + dmg + "dmg! (CRITICAL!!!) <br>"
                scrollToBottom()
            } else {
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit for " + dmg + "dmg! <br>"
                scrollToBottom()
            }
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit for " + dmg + "dmg and fainted! <br>"
            scrollToBottom()
            document.getElementById("playerPokemonHP").innerText = "Fainted! :HP"
            document.getElementById("playerPokemonImg").style.visibility = "hidden"
        }
    }
}


function jiggle(victim) {
    if (victim == "player") {
        document.getElementById("playerPokemon").style.justifyContent = "center"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.justifyContent = ""
        }, 100);
    } else if (victim == "enemy") {
        document.getElementById("enemyPokemon").style.justifyContent = "center"
        setTimeout(() => {
            document.getElementById("enemyPokemon").style.justifyContent = ""
        }, 100);
    }
}


async function usePotion() {
    if (window.canAttack == true) {
        window.canAttack = false
        if (await getPokemonHP(window.playerID) > (window.playerHP + 20)) {
            window.playerHP += 20
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 20hp! <br>"
            scrollToBottom()
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await getPokemonHP(window.playerID)
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
        }
        document.getElementById("playerPokemon").style.top = "-3%"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.top = "0"
        }, 200)

        setTimeout(doAttack, 1000, "player");
    }
}
async function useSuperPotion() {
    if (window.canAttack == true) {
        window.canAttack = false
        if (await getPokemonHP(window.playerID) > (window.playerHP + 50)) {
            window.playerHP += 50
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 50hp! <br>"
            scrollToBottom()
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await getPokemonHP(window.playerID)
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
        }
        document.getElementById("playerPokemon").style.top = "-3%"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.top = "0"
        }, 200)

        setTimeout(doAttack, 1000, "player");
    }
}

function openBag() {
    document.getElementById("bagImg").style.visibility = "hidden"
    document.getElementById("closeBag").style.visibility = "visible"
    document.getElementById("bagButton1").style.visibility = "visible"
    document.getElementById("bagButton2").style.visibility = "visible"
    document.getElementById("bagButton3").style.visibility = "visible"
    document.getElementById("bagButton4").style.visibility = "visible"
}
function closeBag() {
    document.getElementById("bag").style.backgroundColor = "none"
    document.getElementById("bagImg").style.visibility = "visible"
    document.getElementById("closeBag").style.visibility = "hidden"
    document.getElementById("bagButton1").style.visibility = "hidden"
    document.getElementById("bagButton2").style.visibility = "hidden"
    document.getElementById("bagButton3").style.visibility = "hidden"
    document.getElementById("bagButton4").style.visibility = "hidden"
}

async function gainEXP() {
    exp = await getPokemonHP(window.enemyID)
    exp = exp * 40
    window.currentPokemonEXP = window.currentPokemonEXP + exp
    console.log(window.currentPokemonEXP);
}

// Starts game loop
pickStarters()
