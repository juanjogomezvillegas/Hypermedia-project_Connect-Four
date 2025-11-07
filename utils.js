
/*
 * Author: Juan José Gómez Villegas
 * Description: Project 2. connect four, code of javascript file
*/

/* FUNCTIONS */

/*
* getInput: build and return label and input in optional div
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
*/
function getButton(innerDiv, textBtn, id = "", className = "", onClick = "") {
    let div = document.createElement("div");

    let button = document.createElement("button");
    button.id = id;
    button.className = className;
    button.onClick = onClick;
    button.innerText = textBtn;

    if (innerDiv) {
        div.appendChild(button);
        return div;
    } else {
        return button;
    }
}

/*
* buildLabel: build and return label
*/
function getLabel(id, text) {
    let label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = text;
    return label;
}

/*
* getVarCss: return value of the css variable
*/
function getCssVar(propertyValue) {
    return getComputedStyle(document.documentElement).getPropertyValue(propertyValue);
}

/*
* setCssVar: change value of the css variable
*/
function setCssVar(propertyValue, newValue) {
    document.documentElement.style.setProperty(propertyValue, newValue);
}

/*
* setAnimation: set animation with name, duration and iteration count on the elem
*/
function setAnimation(elem, animationName = "", animationDuration = "", animationIterCount = "") {
    elem.style.animationName = animationName;
    elem.style.animationDuration = animationDuration;
    elem.style.animationIterationCount = animationIterCount;
}
