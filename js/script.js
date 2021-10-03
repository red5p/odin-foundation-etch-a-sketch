// initialize 16 * 16 grid
function initialzeGrid() {
    for (let i=0; i<16*16; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = 'rgb(255,255,255)';
        cell.dataset.darken = 0;
        grid.appendChild(cell);
    }
}

function addColor() {
    this.style.backgroundColor = colorPicker.value;
}

function addRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    this.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function makeNewGrid() {
    let size = Number(newGridSelector.value);
    // Remove old cells
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
    // Change grid properties
    grid.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);
    grid.style.setProperty('grid-auto-rows', `repeat(${size}, 1fr)`);
    // Add new cells to the grid
    for (let i=0; i<size*size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = 'rgb(255,255,255)';
        cell.dataset.darken = 0;
        grid.appendChild(cell);
    }
    // Add event listeners to new cells
    switchDefaultColorMode();
}

// default color mode
function switchDefaultColorMode() {    
    let cells = grid.querySelectorAll('.cell');
    // remove old event listener
    cells.forEach((cell) => {
        cell.removeEventListener('mouseenter', addRandomColor);
    });
    // add new event listener
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', addColor);
    });
}

function switchRainbowColorMode() {
    let cells = grid.querySelectorAll('.cell');
    // remove old event listener
    cells.forEach((cell) => {
        cell.removeEventListener('mouseenter', addColor);
    });
    // add new event listener
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', addRandomColor);
    });
}

function switchEraserMode() {
    let cells = grid.querySelectorAll('.cell');
    // remove old event listener
    cells.forEach((cell) => {
        cell.removeEventListener('mouseenter', addColor);
        cell.removeEventListener('mouseenter', addRandomColor);
        cell.removeEventListener('mouseenter', addShade);
    });
    // add new event listener
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', eraseColor);
    });
}

function switchShadeMode() {
    let cells = grid.querySelectorAll('.cell');
    // remove old event listener
    cells.forEach((cell) => {
        cell.removeEventListener('mouseenter', addColor);
        cell.removeEventListener('mouseenter', addRandomColor);
        cell.removeEventListener('mouseenter', eraseColor);
    });
    // add new event listener
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', addShade);
    });
}

function addShade() {
    let color = this.style.backgroundColor;
    color = color.split('(')[1].split(')')[0];
    color = color.split(',');
    let r = Number(color[0]);
    let g = Number(color[1]);
    let b = Number(color[2]);

    let darkenStep = Number(this.dataset.darken);
    if (darkenStep === 10) {
        return;
    }
    r = r - Math.ceil(r / (10 - darkenStep));
    r = (r < 0) ? 0 : r;
    g = g - Math.ceil(g / (10 - darkenStep));
    g = (g < 0) ? 0: g;
    b = b - Math.ceil(b / (10 - darkenStep));
    b = (b < 0) ? 0 : b;
  
    darkenStep++;
    this.dataset.darken = darkenStep;
    this.style.backgroundColor = `rgb(${r},${g},${b})`;  
}

function eraseColor() {
    this.style.backgroundColor = 'rgb(255,255,255)';
}

function clearGrid() {
    let cells = grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'rgb(255,255,255)';
    });
}


let grid = document.querySelector('#grid');
initialzeGrid();
switchDefaultColorMode();

let colorPicker = document.querySelector('#colorPicker');

let colorBtn = document.querySelector('#colorBtn');
colorBtn.addEventListener('click', switchDefaultColorMode);

let rainbowBtn = document.querySelector('#rainbowBtn');
rainbowBtn.addEventListener('click', switchRainbowColorMode);

let darkenBtn = document.querySelector('#darkenBtn');
darkenBtn.addEventListener('click', switchShadeMode);

let eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', switchEraserMode);

let clearBtn = document.querySelector('#clearBtn');
clearBtn.addEventListener('click', clearGrid);

let newGridSelector = document.querySelector('#newGridSelector');
let newGridNumber = document.querySelector('#newGridNumber');
newGridSelector.addEventListener('mousemove', function() {
    newGridNumber.textContent = newGridSelector.value + ' x ' + newGridSelector.value;
})

let newGridBtn = document.querySelector('#newGridBtn');
newGridBtn.addEventListener('click', makeNewGrid);