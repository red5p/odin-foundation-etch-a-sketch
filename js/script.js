// initialize 16 * 16 grid
function initialzeGrid() {
    for (let i=0; i<16*16; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
}

function addColor() {
    this.style.backgroundColor = 'black';
    // this.classList.add('colored');
}

function addRandomColor() {
    let x = Math.random() * 256;
    let y = Math.random() * 256;
    let z = Math.random() * 256;
    let randomColor = `rgb(${x}, ${y}, ${z})`;
    this.style.backgroundColor = randomColor;
}

function makeNewGrid() {
    let size = Number(window.prompt('Please enter the size of new gird: '));
    let cellSize = 800/size;
    // Remove old cells
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
    // Change grid properties
    container.style.setProperty('grid-template-columns', `repeat(${size}, ${cellSize}px)`);
    container.style.setProperty('grid-auto-rows', `repeat(${size}, ${cellSize}px)`);
    // Add new cells to the grid
    for (let i=0; i<size*size; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
    // Add event listeners to new cells
    switchDefaultColorMode();
}

function switchDefaultColorMode() {    
    let cells = container.querySelectorAll('.cell');
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
    let cells = container.querySelectorAll('.cell');
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
    let cells = container.querySelectorAll('.cell');
    // remove old event listener
    cells.forEach((cell) => {
        cell.removeEventListener('mouseenter', addColor);
        cell.removeEventListener('mouseenter', addRandomColor);
    });
    // add new event listener
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', eraseColor);
    });
}

function eraseColor() {
    this.style.backgroundColor = 'white';
}


let container = document.querySelector('.container');

initialzeGrid();
switchDefaultColorMode();

let newGridBtn = document.querySelector('#newGridBtn');
newGridBtn.addEventListener('click', makeNewGrid);

let defaultBtn = document.querySelector('#defaultBtn');
defaultBtn.addEventListener('click', switchDefaultColorMode);

let rainbowBtn = document.querySelector('#rainbowBtn');
rainbowBtn.addEventListener('click', switchRainbowColorMode);

let eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.addEventListener('click', switchEraserMode);