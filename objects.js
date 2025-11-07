
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, objects of javascript file
*/

/*
 * Chip: Is object that contains a information of the game chips
 *
 * instance with new Chip(backgroundColor, borderColor, borderSize, borderStyle)
*/
class Chip {
    // privates attributes
    #chip;
    // constructor
    constructor(backgroundColor, borderColor, borderSize = "3px", borderStyle = "solid") {
        this.#chip = document.createElement("span");
        this.#chip.className = "gameChips";
        this.#chip.innerHTML = "VV";

        this.#chip.style.backgroundColor = backgroundColor;
        this.#chip.style.color = backgroundColor;
        this.#chip.style.borderColor = borderColor;
        this.#chip.style.borderSize = borderSize;
        this.#chip.style.borderStyle = borderStyle;
    }
    // public methods without any parameters
    getChip() {
        return this.#chip;
    }
    setChip(newChip) {
        this.#chip.style.backgroundColor = newChip.getChip().style.backgroundColor;
        this.#chip.style.color = newChip.getChip().style.color;
        this.#chip.style.borderColor = newChip.getChip().style.borderColor;
        this.#chip.style.borderSize = newChip.getChip().style.borderSize;
        this.#chip.style.borderStyle = newChip.getChip().style.borderStyle;
    }
}

/*
 * Player: Is object that contains a information of the player
 *
 * instance with new Player(name, chips)
*/
class Player {
    // privates attributes
    #name;
    #chips;
    // constructor
    constructor(name, chips) {
        this.#name = name;
        this.#chips = chips;
    }
    // public methods without any parameters
    meNameIs() {
        return this.#name;
    }
    meChipsIs() {
        return this.#chips;
    }
}

/*
 * Pair: Is object that contains a two elements (first element and second element)
 *
 * instance with new Pair(first, second)
*/
class Pair {
    // private attributes
    #first;
    #second;
    // constructor
    constructor(first, second) {
        this.#first = first;
        this.#second = second;
    }
    // public methods
    first() {
        return this.#first;
    }
    second() {
        return this.#second;
    }
}
