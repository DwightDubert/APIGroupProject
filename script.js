// no brain
// head empty
window.canAttack = false;
window.potions = 10
window.superPotions = 5
window.greatBalls = 5
window.show = false
window.isPokemonShiny = undefined
window.isPlayerPokemonShiny = false
window.isPokemonEvolved = false;

// Stores the player's pokemon when not in use
window.playerParty = [
    slot1 = {
        hp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot2 = {
        hp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot3 = {
        hp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot4 = {
        hp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    },
    slot5 = {
        hp: undefined, lvl: undefined, isShiny: undefined,
        isEvolved: undefined, exp: undefined, id: undefined,
        moves: { move1: undefined, move2: undefined, move3: undefined, move4: undefined }
    }
]

// All pokemon that cant be evolved into 
window.basePokemon = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 95, 96, 98, 100, 102, 104, 106, 107, 108, 109, 111, 113, 114, 115, 116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129, 131, 132, 133, 137, 138, 140, 142, , 143, 144, 145, 146, 147, 150]

window.eveList = [134, 135, 136]

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
        window.playerMaxHp = hp
        document.getElementById("playerPokemonHP").innerText = hp + ":HP"
        await getPokemonAttacks(2)
        document.getElementById("playerPokemonName").innerText = await getName(2)
        window.playerID = 2
        window.currentPokemonEXP = 0
        window.currentPokemonLvl = 1
        document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
    }
    else
        if (chosenStarter == 2) {
            let img = await getPokemonBackImg(5)
            document.getElementById("playerPokemonImg").setAttribute("src", img)
            let hp = await getPokemonHP(5)
            window.playerHP = hp
            window.playerMaxHp = hp
            document.getElementById("playerPokemonHP").innerText = hp + ":HP"
            await getPokemonAttacks(5)
            document.getElementById("playerPokemonName").innerText = await getName(5)
            window.playerID = 5
            window.currentPokemonEXP = 0
            window.currentPokemonLvl = 1
            document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
        }
        else
            if (chosenStarter == 3) {
                let img = await getPokemonBackImg(8)
                document.getElementById("playerPokemonImg").setAttribute("src", img)
                let hp = await getPokemonHP(8)
                window.playerHP = 8000
                window.playerMaxHp = hp
                document.getElementById("playerPokemonHP").innerText = window.playerHP + ":HP"
                await getPokemonAttacks(8)
                document.getElementById("playerPokemonName").innerText = await getName(8)
                window.playerID = 8
                window.currentPokemonEXP = 0
                window.currentPokemonLvl = 1
                document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
            }
    window.canAttack = true;
    document.getElementById("chooseStarter").style.visibility = "hidden";
    await makeEnemyPokemon()
}


// ===================================
// RETURN DIFFERENT DATA ABOUT POKEMON
// ===================================
async function getPokemonBackImg(id, shiny) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    if (shiny == true) {
        return (pokemonData.data.sprites.back_shiny);
    } else {
        return (pokemonData.data.sprites.back_default);
    }
}
async function getPokemonFrontImg(id, shiny) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    if (shiny == true) {
        return (pokemonData.data.sprites.front_shiny);
    } else {
        return (pokemonData.data.sprites.front_default);
    }
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
async function getNewPokemonMoves(id) {
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
    attack1 = pokemonData.data.moves[attackArray[0]].move.name
    attack2 = pokemonData.data.moves[attackArray[1]].move.name
    attack3 = pokemonData.data.moves[attackArray[2]].move.name
    attack4 = pokemonData.data.moves[attackArray[3]].move.name
    newArray = [attack1, attack2, attack3, attack4]
    return newArray
}
async function getEnemyMove(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonData = await axios.get(url);
    attack = Math.floor(Math.random() * (pokemonData.data.moves.length))
    console.log("Enemy uses " + pokemonData.data.moves[attack].move.name);
    return pokemonData.data.moves[attack].move.name;
}
// Changed the color of the background of the attack button
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
        document.getElementById(element).style.backgroundColor = "#6C3A00"
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
        document.getElementById(element).style.backgroundColor = "#7414FF"
    }
    else if (url.data.type.name == "dark") {
        document.getElementById(element).style.backgroundColor = "#3F3E5D"
    }
    else if (url.data.type.name == "fairy") {
        document.getElementById(element).style.backgroundColor = "#F59CF7"
    }
}
async function getMoveType(name) {
    let url = await axios.get("https://pokeapi.co/api/v2/move/" + name);
    let typ = await url.data.type.name
    return typ
}
async function getPokemonType(id) {
    let url = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id)
    let types = [];
    types.push(url.data.types[0].type.name)
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
    var objDiv = document.getElementById("log");
    objDiv.scrollTop = objDiv.scrollHeight;
}


function showTypeAdvantage() {
    if (window.show == false) {
        document.getElementById("typeAdvantagesImg").style.visibility = "visible"
        window.show = true
    } else {
        document.getElementById("typeAdvantagesImg").style.visibility = "hidden"
        window.show = false
    }
}


// Spawn new enemy pokemon
async function makeEnemyPokemon() {
    let id = Math.floor((Math.random() * 149) + 1)
    window.enemyID = id
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const pokemonData = await axios.get(url);
    let rng = (Math.floor(Math.random() * 50))
    if (rng == 42) {
        window.isPokemonShiny = true;
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_shiny)
        document.getElementById("log").innerHTML += "Shiny " + await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    } else {
        window.isPokemonShiny = false;
        document.getElementById("enemyPokemonImg").setAttribute("src", pokemonData.data.sprites.front_default)
        document.getElementById("log").innerHTML += await getName(window.enemyID) + " has appeared! <br>"
        scrollToBottom()
    }
    document.getElementById("enemyPokemonName").innerText = await getName(id)
    document.getElementById("enemyPokemonHP").innerText = "HP: " + await getPokemonHP(id)
    window.enemyHP = await getPokemonHP(id)
    enemyLvl = Math.floor((window.enemyHP / 10))
    document.getElementById("enemyPokemonLvl").innerText = "Lvl: " + enemyLvl

    setTimeout(async () => {
        document.getElementById("enemyPokemonImg").style.visibility = 'visible'
    }, 200)
}

async function doAttack(target, attack) {
    if (attack == "attack1") {
        currentAttack = window.attack1
    } else if (attack == "attack2") {
        currentAttack = window.attack2
    } else if (attack == "attack3") {
        currentAttack = window.attack3
    } else if (attack == "attack4") {
        currentAttack = window.attack4
    }
    let chance = Math.floor((Math.random() * 10) + 1)
    if (chance == 1) {
        dmg = 0
    } else if (chance == 10) {
        dmg = Math.floor((Math.random() * 15) + 15)
        if (window.isPokemonEvolved == true) {
            dmg += Math.floor((Math.random() * 5) + 10)
        }
    } else {
        dmg = Math.floor((Math.random() * 5) + 5)
        if (window.isPokemonEvolved == true) {
            dmg += Math.floor((Math.random() * 5) + 5)
        }
    }
    if (target == "enemy" && window.canAttack == true) {
        jiggle("player")

        // Call that HUGE if statement 
        bonus = await checkEffective(currentAttack, "enemy", 0)
        bonus += await checkEffective(currentAttack, "enemy", 1)

        if ((dmg + bonus) < window.enemyHP) {
            // Enemy doesnt faint and takes dmg
            if (dmg == 0) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                document.getElementById("log").innerHTML += await getName(window.playerID) + " missed! <br>"
                scrollToBottom()
            } else if (dmg >= 15) {
                // Failsafe for bonus being less than dmg is positive
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                window.enemyHP -= dmg + bonus
                debugDmg = dmg + bonus
                console.log("Damage Delt: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + "! (CRITICAL!!!) <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += "It was super effective! <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += "It wasn't very effective.. <br>"
                }
                scrollToBottom()
                window.canAttack = false;
            } else {
                // Failsafe for bonus being less than dmg is positive
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                window.enemyHP -= dmg + bonus
                debugDmg = dmg + bonus
                console.log("Damage Delt: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + "! <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += "It was super effective! <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += "It wasn't very effective.. <br> "
                }
                scrollToBottom()
                window.canAttack = false;
            }
        } else if (dmg > 0) {
            // Enemy faints
            window.canAttack = false
            document.getElementById("log").innerHTML += await getName(window.enemyID) + " has been hit by " + currentAttack + " and fainted! <br>"
            scrollToBottom()
            document.getElementById("enemyPokemonHP").innerText = "HP: Fainted!"
            document.getElementById("enemyPokemonImg").style.visibility = 'hidden'
            await gainEXP()
            if (true) {
                dropRng = Math.floor(Math.random() * 10) + 1
                console.log(dropRng);
                if (dropRng == 1) {
                    window.greatBalls++
                    document.getElementById("log").innerHTML += "You Found a Greatball! <br>"
                    scrollToBottom()
                    document.getElementById("bagButton4").innerHTML = "Greatballs: " + window.greatBalls
                } else if (dropRng > 1 && dropRng < 5) {
                    window.superPotions++
                    document.getElementById("bagButton3").innerHTML += "Super Potions: " + window.superPotions
                    scrollToBottom()
                } else {
                    window.potions++
                    document.getElementById("log").innerHTML += "You Found a Potion! <br>"
                    document.getElementById("bagButton1").innerHTML += "Potion: " + window.potions
                    scrollToBottom()
                }
            }
            setTimeout(makeEnemyPokemon, 2000);
        }

        if (document.getElementById("enemyPokemonImg").style.visibility == "visible") {
            document.getElementById("enemyPokemonHP").innerText = "HP: " + window.enemyHP
            setTimeout(doAttack, 1000, "player");
        } else {
            setTimeout(() => {
                window.canAttack = true
            }, 3000);
        }

        // If enemy attacks player
    } else if (target == "player") {
        jiggle("enemy")
        currentAttack = await getEnemyMove(window.enemyID)

        bonus = await checkEffective(currentAttack, "player", 0)
        bonus += await checkEffective(currentAttack, "player", 1)

        if ((dmg + bonus) < window.playerHP) {
            window.playerHP -= dmg + bonus
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
            window.canAttack = true

            if (dmg == 0) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                document.getElementById("log").innerHTML += await getName(window.enemyID) + " missed! <br>"
                scrollToBottom()
            } else if (dmg >= 15) {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                debugDmg = dmg + bonus
                console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + "! (CRITICAL!!!) <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += "It was super effective! <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += "It wasn't very effective.. <br> "
                }
                scrollToBottom()
            } else {
                if (dmg + bonus < 0) {
                    bonus = dmg - (dmg * 2)
                }
                debugDmg = dmg + bonus
                console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
                document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + "! <br>"
                if (bonus > 0) {
                    document.getElementById("log").innerHTML += "It was super effective! <br>"
                } else if (bonus < 0) {
                    document.getElementById("log").innerHTML += "It wasn't very effective.. <br> "
                }
                scrollToBottom()
            }
        } else {
            if (dmg + bonus < 0) {
                bonus = dmg - (dmg * 2)
            }
            debugDmg = dmg + bonus
            console.log("Damage Dealt to player: " + debugDmg + "(" + dmg + "+" + bonus + ")");
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been hit by " + currentAttack + " and fainted! <br>"
            scrollToBottom()
            document.getElementById("playerPokemonHP").innerText = "Fainted! :HP"
            document.getElementById("playerPokemonImg").style.visibility = "hidden"
        }
    }
}

async function checkEffective(currentAttack, target, index) {
    // Bonus Damage 
    bonus = 0
    if (target == "player") {
        pokemonType = await getPokemonType(window.playerID)
    } else {

        pokemonType = await getPokemonType(window.enemyID)
    }
    currentMoveType = await getMoveType(currentAttack)
    let type1 = index

    if (pokemonType[type1] == "normal") {

        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

    }
    if (pokemonType[type1] == "fighting") {

        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "psychic") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "normal") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "flying") {

        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "poison") {

        if (currentMoveType == "psychic") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "fire") {

        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================

        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "water") {
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "electric") {
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "water") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "grass") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "water") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ice") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ground") {
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "electric") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "psychic") {
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ghost") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "bug") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "grass") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "ghost") {
        if (currentMoveType == "ghost") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        // Removed IF statement making ghost good against ghost
    }
    if (pokemonType[type1] == "rock") {
        if (currentMoveType == "water") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "grass") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fire") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "flying") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "dark") {
        if (currentMoveType == "fighting") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "bug") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "psychic") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ghost") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "dragon") {
        // removed IF statement making dragon bad against dragon
        if (currentMoveType == "ice") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "steel") {
        if (currentMoveType == "fire") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fight") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "ground") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "ice") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "rock") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "fairy") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    if (pokemonType[type1] == "fairy") {
        if (currentMoveType == "steel") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "poison") {
            bonus += Math.floor(Math.random() * 5) + 5
        }
        // =============================
        if (currentMoveType == "fighting") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dragon") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
        if (currentMoveType == "dark") {
            bonus -= Math.floor(Math.random() * 5) + 5
        }
    }
    return bonus
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
    if (window.canAttack == true && window.potions > 0) {
        window.canAttack = false
        window.potions--
        document.getElementById("bagButton1").innerHTML = "Potions: " + window.potions
        document.getElementById("log").innerHTML += "You used a Potion!<br>"
        if (await window.playerMaxHp > (window.playerHP + 20)) {
            window.playerHP += 20
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 20hp! <br>"
            scrollToBottom()
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await window.playerMaxHp
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
        }
        document.getElementById("log").innerHTML += "You have " + window.potions + " Potions left. <br>"
        document.getElementById("playerPokemon").style.top = "-3%"
        setTimeout(() => {
            document.getElementById("playerPokemon").style.top = "0"
        }, 200)

        setTimeout(doAttack, 1000, "player");
    }
}
async function useSuperPotion() {
    if (window.canAttack == true && window.superPotions > 0) {
        window.canAttack = false
        window.superPotions--
        document.getElementById("bagButton3").innerHTML = "Super Potions: " + window.superPotions
        document.getElementById("log").innerHTML += "You used a Super Potion!<br>"
        if (await window.playerMaxHp > (window.playerHP + 50)) {
            window.playerHP += 50
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed! They gained 50hp! <br>"
            scrollToBottom()
        } else {
            document.getElementById("log").innerHTML += await getName(window.playerID) + " has been healed to full health! <br>"
            scrollToBottom()
            window.playerHP = await window.playerMaxHp
            document.getElementById("playerPokemonHP").innerText = window.playerHP + " :HP"
        }
        document.getElementById("log").innerHTML += "You have " + window.superPotions + " Super Potions left.<br>"
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
    exp = exp * 2000
    console.log("EXP: " + exp);
    window.currentPokemonEXP = window.currentPokemonEXP + exp
    if (window.currentPokemonEXP >= 5000) {
        window.currentPokemonEXP = window.currentPokemonEXP - 5000
        window.currentPokemonLvl += 1
        console.log(window.currentPokemonEXP + "exp");
        window.playerMaxHp += 10
        document.getElementById("playerPokemonLvl").innerText = window.currentPokemonLvl + ":Lvl"
        document.getElementById("log").innerHTML += await getName(playerID) + " gained " + exp + "EXP and is now level " + window.currentPokemonLvl + " <br> "
        tryEvolve()
    } else {
        document.getElementById("log").innerHTML += await getName(playerID) + " gained " + exp + "EXP <br> "
    }
}

async function tryEvolve() {
    id = window.playerID + 1
    if (window.playerID == 133) {
        id = window.eveList[Math.floor(Math.random() * 3)]
    }
    let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    let pokemonData = await axios.get(url);
    if (window.basePokemon.includes(id) == false && window.enemyID != 133) {
        // If next pokemon in pokedex != base pokemon, do things.
        if (await getPokemonHP(id) <= window.playerMaxHp) {
            if (window.isPlayerPokemonShiny == true) {
                document.getElementById("playerPokemonImg").setAttribute("src", pokemonData.data.sprites.back_shiny)
            } else {
                // If next pokemon has less or equal maxHP than player pokemon, do things.
                document.getElementById("playerPokemonImg").setAttribute("src", pokemonData.data.sprites.back_default)
            }
            document.getElementById("playerPokemonName").innerText = await getName(id)
            document.getElementById("log").innerHTML += "================ <br> Your " + await getName(window.playerID) + " Evolved into a " + await getName(id) + "<br> ================ <br>"
            console.log("YOU EVOLVED");
            window.playerID = id
            window.playerMaxHp = await getPokemonHP(id)
            window.playerHP = window.playerMaxHp
            window.isPokemonEvolved = true
        }
    }
}

async function tryPokeball() {
    if (window.canAttack == true) {
        window.canAttack = false
        document.getElementById("log").innerHTML += "Trying to catch Pokemon..."
        scrollToBottom()
        setTimeout(() => {
            if (window.enemyHP <= 50 && window.enemyID != 132) {
                chance = 70 - window.enemyHP
            } else {
                chance = 0
            }
            rng = Math.floor(Math.random() * 100) + 1
            console.log("chance to catch: " + rng + '<' + chance + '?');
            if (rng <= chance) {
                catchPokemon()
            } else {
                document.getElementById("log").innerHTML += "The Pokemon broke free! <br>"
                scrollToBottom()
                setTimeout(doAttack, 1000, "player")
            }
        }, 5000)
    }
}
async function tryGreatball() {
    if (window.canAttack == true && window.greatBalls > 0) {
        window.canAttack = false;
        window.greatBalls--
        document.getElementById("bagButton4").innerHTML = "Greatballs: " + window.greatBalls
        document.getElementById("log").innerHTML += "Trying to catch Pokemon... "
        scrollToBottom()
        setTimeout(() => {
            if (window.enemyHP <= 999 && window.enemyID != 132) {
                chance = 999999 - window.enemyHP
            } else {
                chance = 0
            }
            rng = Math.floor(Math.random() * 100) + 1
            console.log("chance to catch: " + rng + '<' + chance + '?');
            if (rng <= chance) {
                catchPokemon()
            } else {
                document.getElementById("log").innerHTML += "The Pokemon broke free! <br>"
                scrollToBottom()
                setTimeout(doAttack, 1000, "player")
            }
        }, 5000)
    }
}

async function catchPokemon() {
    if (window.playerParty[0].hp == undefined) {
        syncToParty(0)
        document.getElementById("partySlot1Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        console.log(await getPokemonFrontImg(window.enemyID, window.isPokemonShiny));
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 1 <br>"
    } else if (window.playerParty[1].hp == undefined) {
        syncToParty(1)
        document.getElementById("partySlot2Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 2 <br>"
    } else if (window.playerParty[2].hp == undefined) {
        syncToParty(2)
        document.getElementById("partySlot3Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 3 <br>"
    } else if (window.playerParty[3].hp == undefined) {
        syncToParty(3)
        document.getElementById("partySlot4Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 4 <br>"
    } else if (window.playerParty[4].hp == undefined) {
        syncToParty(4)
        document.getElementById("partySlot5Img").setAttribute("src", await getPokemonFrontImg(window.enemyID, window.isPokemonShiny))
        document.getElementById("log").innerHTML += "You caught it! <br>" + await getName(window.enemyID) + " has been saved to slot 5 <br>"
    } else {
        document.getElementById("log").innerHTML += "You caught it! <br> Sadly, you dont gave room for " + await getName(window.enemyID) + " and they have been released into the wild. <br>"
    }
    gainEXP()

    setTimeout(makeEnemyPokemon, 2000)
    setTimeout(doAttack, 3000, "player")
}
async function syncToParty(slotNum) {
    attacks = []
    window.playerParty[slotNum].hp = await getPokemonHP(window.enemyID)
    window.playerParty[slotNum].lvl = Math.floor(await getPokemonHP(window.enemyID) / 10)
    window.playerParty[slotNum].isShiny = window.isPokemonShiny
    window.playerParty[slotNum].isEvolved = false;
    window.playerParty[slotNum].exp = 0;
    window.playerParty[slotNum].id = window.enemyID
    attacks = await getNewPokemonMoves(window.playerParty[0].id)
    window.playerParty[slotNum].moves.move1 = attacks[0]
    window.playerParty[slotNum].moves.move2 = attacks[1]
    window.playerParty[slotNum].moves.move3 = attacks[2]
    window.playerParty[slotNum].moves.move4 = attacks[3]
}

// Starts game loop
pickStarters()
