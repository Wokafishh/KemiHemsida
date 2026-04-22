
// <-- Classes -->

class niceButton {
    constructor(element_data, i, parent, displayBox_ref) {
        this.i = i;
        this.element_data = element_data;
        this.displayBox_ref = displayBox_ref;

        this.container = document.createElement("div");
        this.container.className = "element_div";
        this.container.classList.add(`type-${element_data.type}`);
        this.container.textContent = element_data.symbol;

        this.button = document.createElement("button");
        this.button.className = "element_button";
        this.button.onclick = () => this.on_click();

        this.container.appendChild(this.button);
        parent.appendChild(this.container);
    }

    on_click() {
        this.displayBox_ref.display_element(this.element_data, this.i)
    }
}

class displayBox {
    constructor() {
        this.element = document.getElementById("display_box");
        this.symbol_text = document.getElementById("symbol_text");
        this.name_text = document.getElementById("name_text");
        this.additional_info_text = document.getElementById("additional_info_text");
        this.atomic_number_text = document.getElementById("atomic_number_text")
        console.log("Created displaybox")
    }

    display_element(element, i) {
        this.symbol_text.textContent = element.symbol
        this.atomic_number_text.textContent = i
    }
}

// <-- FUNCTIONS -->
async function populate_button_grid() {
    const res = await fetch("elements.json")
    const data = await res.json()

    button_grid.style.gridTemplateColumns = `repeat(${GRID_SIZE[0]}, auto)`

    for (let i = 0; i < GRID_SIZE[0] * GRID_SIZE[1]; i++) {
        const e = data.elements[i]
        console.log(e)
        if (e) {
            const btn = new niceButton(e, i, button_grid, db)
        } else {
            button_grid.appendChild(document.createElement("div"))
        }
        
    }
}

function toggle_dark_mode() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark", isDark);
    document.getElementById("theme_btn").textContent = isDark ? "🌙 Dark mode" : "☀️ Light mode" ;
}

// <-- On load -->

const GRID_SIZE = [18, 9]
let data = null

// Objects
const button_grid = document.getElementById("button_grid")
populate_button_grid()

const display_box = document.getElementById("display_box")
const db = new displayBox()


if (localStorage.getItem("dark") === "true") {
    document.documentElement.classList.add("dark");
}