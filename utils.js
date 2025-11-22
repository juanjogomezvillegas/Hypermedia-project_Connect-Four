
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, code of javascript file
*/

/* FUNCTIONS */

/*
* genRandomNumber: generate random number between min and max (both included)
* 
* Arguments is a minimum value and maximum value
* 
* return:
*   random number between min and max arguments
*/
function genRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min);
}

/*
* getInput: build and return label and input in optional div
* 
* Argument innerDiv is a bool variable that if is true then input created inner a div element, 
* more arguments is a typical attributes of the element input in html code:
*   type, name, id, placeholder, class name, text label and value 
* 
* return:
*   element input
*/
function getInput(innerDiv, type, name = "", id = "", placeholder = "", className = "", textLabel = "", value = "") {
    let div = document.createElement("div");

    let label;
    if (innerDiv) {
        label = getLabel(id, textLabel);
    }

    let input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;
    input.className = className;
    input.value = value;
    input.placeholder = placeholder;
    input.title = textLabel;

    if (innerDiv) {
        div.appendChild(label);
        div.appendChild(input);
        return div;
    } else {
        return input;
    }
}

/*
* getSelect: build and return label and input select with options in div
* 
* Argument innerDiv is a bool variable that if is true then select created inner a div element, 
* more arguments is a typical attributes of the element select in html code:
*   name, id, class name, text label and array of options 
* 
* return:
*   element select with different options
*/
function getSelect(innerDiv, name = "", id = "", className = "", textLabel = "", options = []) {
    let div = document.createElement("div");

    let label;
    if (innerDiv) {
        label = getLabel(id, textLabel);
    }

    let select = document.createElement("select");
    select.name = name;
    select.id = id;
    select.className = className;
    select.title = textLabel;

    options.map((val,ind) => {
        let opt = document.createElement("option");
        opt.value = ind;
        opt.innerHTML = val;
        select.appendChild(opt);
    });

    if (innerDiv) {
        div.appendChild(label);
        div.appendChild(select);
        return div;
    } else {
        return select;
    }
}

/*
* getButton: build and return button in div
* 
* Argument innerDiv is a bool variable that if is true then button created inner a div element, 
* more arguments is a typical attributes of the element button in html code:
*   text the button, id, class name and event onClick 
* 
* return:
*   element button
*/
function getButton(innerDiv, textBtn, id = "", className = "", onClick = "") {
    let div = document.createElement("div");

    let button = document.createElement("button");
    button.id = id;
    button.className = className;
    button.onClick = onClick;
    button.innerText = textBtn;
    button.title = textBtn;

    if (innerDiv) {
        div.appendChild(button);
        return div;
    } else {
        return button;
    }
}

/*
* buildLabel: build and return label
* 
* Arguments is id and text, the typical attributes of the element label in html code
* 
* return:
*   element label
*/
function getLabel(id, text) {
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = text;
    return label;
}

/*
* getVarCss: return value of the css variable
* 
* Arguments is a property value, is the name of variable css
* 
* return:
*   void
*/
function getCssVar(propertyValue) {
    return getComputedStyle(document.documentElement).getPropertyValue(propertyValue);
}

/*
* setCssVar: change value of the css variable
*
* Arguments is a property value, is the name of variable css, and the new value
* 
* return:
*   void
*/
function setCssVar(propertyValue, newValue) {
    document.documentElement.style.setProperty(propertyValue, newValue);
}

/*
* setAnimation: set animation with name, duration and iteration count on the elem
* 
* Argument elem is the html element, followed by the properties of the rule animation the css
* for example: the name of animation, the duration and the iter count of animation
* 
* return:
*   void
*/
function setAnimation(elem, animationName = "", animationDuration = "", animationIterCount = "") {
    elem.style.animationName = animationName;
    elem.style.animationDuration = animationDuration;
    elem.style.animationIterationCount = animationIterCount;
}
