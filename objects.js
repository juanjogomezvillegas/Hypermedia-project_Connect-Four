
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, objects of javascript file
*/

/*
 * Player: Is object that contains a information of the player
 *
 * instance with new Player(name, color)
*/
class Player {
    // privates attributes
    #name;
    #color;
    // constructor
    constructor(name, color) {
        this.#name = name;
        this.#color = color;
    }
    // public methods without any parameters
    meNameIs() {
        return this.#name;
    }
    meColorIs() {
        return this.#color;
    }
}
