function RandomizeBoard() {
    // Get a number between 1 and the max possible height of the board
    const BOARD = document.getElementById('board');
    const BOARD_TOP = BOARD.getBoundingClientRect().top;
    const WINDOW_HEIGHT = window.innerHeight;
    const MAX_HEIGHT = Math.floor(WINDOW_HEIGHT - BOARD_TOP);
    const randomCellNumber = () => {
        const NUMBER = Math.floor(Math.random() * (MAX_HEIGHT - 1) + 1);
        return NUMBER
    }

    const CELLS = BOARD.children;
    for(const CELL of CELLS) {
        CELL.dataset.number = randomCellNumber();
        CELL.className = '';
    }
}

export default RandomizeBoard;
