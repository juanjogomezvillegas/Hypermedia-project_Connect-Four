# Hypermedia-project_Connect-Four *Part 2*

## Author

Juan José Gómez Villegas (u1987338@campus.udg.edu)

## Information related to the implementation

### Available functionalities

- **The main functionality**, the easy initial form and the game engine, and the page with a board the game with buttons in every column the board. A player 1 select a column between 0 and board size - 1, appears a chip in selected column and last free row, then it's player 2 turn. And then it repeats itself again, until they match a four chips in columns, row or diagonals (left or right).

- **The avaiable a one player can play against the computer**, in a select to the init form the user can select to the computer, and by click to the button Play, the player 1 (the user) will play against the computer. The computer will play by making random moves between 0 and the board size - 1.

- **Disco mode**, *icon the play*, a button in header that active/disactive a css animation that change colors theme every second with by background music.

- **Change colors theme**, *icon the number between 1 and 6*, a button in header that change colors theme, each theme is identified with number, that change with the colors, the numbers is: 1, black theme (#0D0A0A and #141414); 2, dark blue theme (#00023D and #00035F); 3, blood theme (#3F0000 and #650000); 4, dark purple theme (#38003E and #54005D); 5, dark yelow theme (#5B4500 and #826200); 6, dark green theme (#085200 and #097100).

- **The font family by default is a Seven Segments, Arial, Sans-Serif**. 

- **Every time the user clicks a button or gets an error, a audio plays**.

### Code structure in different files

- html files:

    - **index.html**. html code related to the web page static structure, that will it be modify with the DOM (Document Object Model).

- stylesheets css files

    - **style.css**. Place where it is defined a stylesheets for mobile phone, for desktop, and for all devices (tag body), and a keyframes of animation, and a declarates css variables.

- code js files

    - **index.js**. Place where all the game engine code, DOM code by manipulation of the web page structure, and other functionalities code.

    - **message.js**. This is where the implements a two functions: ShowMsgCongratulations, that makes appears in the window a alert message using the library js sweetalert2 with title, text and icon; showAlert, that makes appears a toast message in top end of the window during 2 seconds using the library js sweetalert2 with title and icon.

    - **objects.js**. This is where the different objects are created, that are used in index.js:
    
        - Object Chip(backgroundColor, borderColor, borderSize, borderStyle), related to the game chips, contains a information of the game chips.
        
        - Object Player(name, chips), related to the game players, contains a information of the players.
        
        - Object Pair(first, second), is object that contains a two elements (first and second), used in different parts of the code.

    - **utils.js**. contains functions that are used in different parts of the index.js code, related to the generate random number between min and max, build a button, input and select in a div or not, with label or not. Also there is a functions by set css animation with name, duration and iteration count on the element, and a return and change value of the css variable.

### External libraries or web pages

- [sweetalert2](https://sweetalert2.github.io/), by show alert messages with a different style that alert js.

- [font awesome](https://fontawesome.com/icons), by insert icons in a web page.

- [www.bfxr.net](https://www.bfxr.net/), by generate audio files in wav format.

- [paletton.com](https://paletton.com/#uid=11T0u0k++GYveZKT0+V+Vs++amG), by generate color pallette.

## Link to the website

- [Link to the website](https://juanjogomezvillegas.github.io/Hypermedia-project.Connect-Four/)

## Link to the code

- [Link to the code](https://github.com/juanjogomezvillegas/Hypermedia-project.Connect-Four)
