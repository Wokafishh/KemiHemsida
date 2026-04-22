
// Functions

class niceButton {
    constructor(element_data, i, parent) {
        this.i = i;
        this.element_data = element_data;

        this.container = document.createElement("div");
        this.container.className = "grid-tile";
        this.container.style.backgroundColor = COLORS[element_data.type];
        this.container.textContent = element_data.symbol;

        this.button = document.createElement("button");
        this.button.className = "tile-overlay";
        this.button.onclick = () => this.on_click();

        this.container.appendChild(this.button);
        parent.appendChild(this.container);
    }

    on_click() {
        console.log("Button clicked: " + this.element_data.symbol);
    }
}

class displayBox {
    constructor() {
        this.element = document.getElementById("display_box");
        console.log("Created displaybox")
    }
}


function send_message() {
    input = document.getElementById("user_input")
    input_text = input.value
    console.log(String(input_text))
    display_box.textContent = input_text
}

async function init() {
    const res = await fetch("elements.json")
    data = await res.json()

    button_grid.style.gridTemplateColumns = `repeat(${GRID_SIZE[0]}, auto)`

    for (let i = 0; i < GRID_SIZE[0] * GRID_SIZE[1]; i++) {
        let e = data.elements[i]
        if (e) {
            btn = new niceButton(data.elements[i], i, button_grid)
            btn.button.style.color = "#ffffff"
        } else {
            button_grid.appendChild(document.createElement("div"))
        }
        
    }
}

// <-- One time -->

const display_box = document.getElementById("display_box")
const button_grid = document.getElementById("button_grid")
const GRID_SIZE = [18, 9]
let data = null
let db = new displayBox

const COLORS = {
    "alkali":       "#e84c4c",  
    "alkaline":     "#f0a030",  
    "transition":   "#4a90d9",  
    "post_trans":   "#a0c878",  
    "metalloid":    "#c8b850",
    "nonmetal":     "#60b860",  
    "halogen":      "#d4a0c8",  
    "noble":        "#c080c0",  
    "lanthanide":   "#48b8c8",  
    "actinide":     "#78b878",  
    "unknown":      "#b0b0b0",  
}

init()