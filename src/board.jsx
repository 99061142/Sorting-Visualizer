import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    updateBoard() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Clear all styling of the board
        this.clearBoard();

        // Make the board list with the name and number of the cells
        const LENGTH = this.props.boardSize - 1;
        let board = [];
        for (let i = 0; i <= LENGTH; i++) {
            const RANDOM_NUMBER = Math.floor(Math.random() * 500) + 1;
            board.push(RANDOM_NUMBER);
        }
        this.props.setNumbers(board);
    }

    componentDidMount() {
        // When the window gets resized, update board list
        window.addEventListener('resize', () => this.updateBoard());

        // Add the initialized board list
        this.updateBoard();
    }

    clearBoard() {
        // Clear all styling of the board
        const BOARD = document.getElementById("board");
        const CELLS = BOARD.children;
        for (const cell of CELLS) {
            if (cell.className !== '') {
                cell.className = "standard";
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