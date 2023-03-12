import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    updateBoard() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Get the max height of the board
        const BOARD = document.getElementById("board");
        const BOARD_TOP = BOARD.getBoundingClientRect().top;
        const WINDOW_HEIGHT = window.innerHeight;
        const MAX_HEIGHT = Math.floor(WINDOW_HEIGHT - BOARD_TOP);

        // Create a list with numbers
        const LENGTH = this.props.boardSize;
        let board = [];
        for (let i = 0; i < LENGTH; i++) {
            const RANDOM_NUMBER = Math.floor(Math.random() * MAX_HEIGHT) + 1;
            board.push(RANDOM_NUMBER);
        }
        // Set the numbers as current
        this.props.setNumbers(board);
    }

    windowResized() {
        this.clearBoard();
        this.updateBoard();
    }

    componentDidMount() {
        // When the window gets resized, update board list
        window.addEventListener('resize', () => this.windowResized());

        // Add the initialized board list
        this.updateBoard();
    }

    clearBoard() {
        // Clear all styling of the board
        const BOARD = document.getElementById("board");
        const CELLS = BOARD.children;
        for (const cell of CELLS) {
            if (cell.className !== '') {
                cell.className = '';
            }
        }
    }

    render() {
        return (
            <div id="board" className="d-flex justify-content-center">
                {this.props.numbers.map((number, i) =>
                    <Cell
                        number={number}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;