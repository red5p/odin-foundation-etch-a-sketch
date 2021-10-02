// initialize 16 * 16 grid
function initialzeGrid() {
    for (let i=0; i<16*16; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
}

function addColor() {
    this.classList.add('colored');
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
    addCellEventListener();
}

function addCellEventListener() {
    let cells = container.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', addColor);
    });
}


let container = document.querySelector('.container');
initialzeGrid();

addCellEventListener();

let newGridBtn = document.querySelector('#newGridBtn');
newGridBtn.addEventListener('click', makeNewGrid);
