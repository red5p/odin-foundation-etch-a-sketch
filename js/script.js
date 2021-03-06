const COLOR_MODE = 'color';
const RAINBOW_MODE = 'rainbow';
const DARKEN_MODE = 'darken';
const ERASER_MODE = 'eraser';
const INITIAL_SIZE = 16;

let currentMode = COLOR_MODE;
let currentSize = INITIAL_SIZE;

const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#colorBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const darkenBtn = document.querySelector('#darkenBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const newGridSelector = document.querySelector('#newGridSelector');
const newGridNumber = document.querySelector('#newGridNumber');
const newGridBtn = document.querySelector('#newGridBtn');

initialzeGrid(currentSize);
colorBtn.onclick = () => changeMode('color');
rainbowBtn.onclick = () => changeMode('rainbow');
darkenBtn.onclick = () => changeMode('darken');
eraserBtn.onclick = () => changeMode('eraser');
clearBtn.onclick = () => clearGrid();
newGridSelector.onmousemove = () => {
    newGridNumber.textContent = newGridSelector.value + ' x ' +
                                newGridSelector.value;
    currentSize = Number(newGridSelector.value);
}
newGridBtn.onclick = () => makeNewGrid(currentSize);


function initialzeGrid(size) {
    grid.style.setProperty('grid-template-columns', `repeat(${size}, 1fr)`);
    grid.style.setProperty('grid-auto-rows', `repeat(${size}, 1fr)`);

    // add div's to the grid
    for (let i=0; i<size*size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.backgroundColor = 'rgb(255,255,255)';
        cell.dataset.darken = 0;
        cell.addEventListener('mouseenter', changeColor);
        grid.appendChild(cell);
    }
}

function changeMode(mode) {
    activeButton(mode);
    currentMode = mode;
}

// remove active style from previous button and add active style to the new button
function activeButton(newMode) {
    switch (currentMode) {
        case COLOR_MODE:
            colorBtn.classList.remove('active');
            break;
        case RAINBOW_MODE:
            rainbowBtn.classList.remove('active');
            break;
        case DARKEN_MODE:
            darkenBtn.classList.remove('active');
            break;
        case ERASER_MODE:
            eraserBtn.classList.remove('active');
    }
    switch (newMode) {
        case COLOR_MODE:
            colorBtn.classList.add('active');
            break;
        case RAINBOW_MODE:
            rainbowBtn.classList.add('active');
            break;
        case DARKEN_MODE:
            darkenBtn.classList.add('active');
            break;
        case ERASER_MODE:
            eraserBtn.classList.add('active');
    }
}

// change background-color of the div, according to the mode the user selected
function changeColor() {
    if (currentMode === COLOR_MODE) {
        this.style.backgroundColor = colorPicker.value;
        this.dataset.darken = 0;
    } else if (currentMode === RAINBOW_MODE) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        this.style.backgroundColor = `rgb(${r},${g},${b})`;
        this.dataset.darken = 0;
    } else if (currentMode === DARKEN_MODE) {
        addShade(this);
    } else if (currentMode === ERASER_MODE){
        this.style.backgroundColor = 'rgb(255,255,255)';
        this.dataset.darken = 0;
    }
}

// calculate the next darkened color
function addShade(target) {
    // extract r, g, b from string "rgb(r,g,b)"
    let color = target.style.backgroundColor;
    color = color.split('(')[1].split(')')[0];
    color = color.split(',');
    let r = Number(color[0]);
    let g = Number(color[1]);
    let b = Number(color[2]);

    let darkenStep = Number(target.dataset.darken);
    if (darkenStep === 10) {
        return;
    }

    // calculate new color
    r = r - Math.ceil(r / (10 - darkenStep));
    g = g - Math.ceil(g / (10 - darkenStep));
    b = b - Math.ceil(b / (10 - darkenStep));
    r = (r < 0) ? 0 : r;
    g = (g < 0) ? 0 : g;
    b = (b < 0) ? 0 : b;
  
    darkenStep++;
    target.dataset.darken = darkenStep;
    target.style.backgroundColor = `rgb(${r},${g},${b})`;  
}

function makeNewGrid(size) {
    removeCells();
    initialzeGrid(size);
}

function removeCells() {
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
}

// erase all cells
function clearGrid() {
    const cells = grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.backgroundColor = 'rgb(255,255,255)';
    });
}







