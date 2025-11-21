# Hypermedia-project_Connect-Four *Part 2*

## Author

Juan José Gómez Villegas (u1987338@campus.udg.edu)

## Information related to the implementation

### Available functionalities

- **The main functionality**, the easy initial form and the game engine.

- **Disco mode**, a button in header.

- **Change colors theme**, a button in header.

### Code structure in different files

- html files:

    - **index.html**. html code related to the web page static structure, that will it be modify with the DOM.

- stylesheets css files

    - **style.css**. Place where it is defined a stylesheets for mobile phone, for desktop, and for all devices (tag body), and a keyframes of animation, and a declarates css variables.

- code js files

    - **index.js**. 

    - **message.js**. This is where the implements a two functions: ShowMsgCongratulations, that makes appears in the window a alert message using the library js sweetalert2 with title, text and icon; showAlert, that makes appears a toast message in top end of the window during 2 seconds using the library js sweetalert2 with title and icon.

    - **objects.js**. This is where the different objects are created, that are used in index.js:
    
        - Object Chip(backgroundColor, borderColor, borderSize, borderStyle), related to the game chips, contains a information of the game chips.
        
        - Object Player(name, chips), related to the game players, contains a information of the players.
        
        - Object Pair(first, second), is object that contains a two elements (first and second), used in different parts of the code.

    - **utils.js**. contains functions that are used in different parts of the index.js code, related to the generate random number between min and max, build a button, input and select in a div or not, with label or not. Also there is a functions by set css animation with name, duration and iteration count on the element, and a return and change value of the css variable.

### External libraries

- [sweetalert2](https://sweetalert2.github.io/), by show alert messages with a different style that alert js.

- [font awesome](https://fontawesome.com/icons), by insert icons in a web page.

## Link to the website

- [Link to the website](https://juanjogomezvillegas.github.io/Hypermedia-project.Connect-Four/)

# Abbreviations

*[DOM]: Document Object Model
