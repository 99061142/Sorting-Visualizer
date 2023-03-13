import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            numbersAmount: Math.floor(window.innerWidth * .05)
        }
    }

    async setNumbersAmount(amount) {
        this.setState({
            numbersAmount: amount
        });
    }

    updateBoard() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Get the max height of the board
        const BOARD = document.getElementById("board");
        const BOARD_TOP = BOARD.getBoundingClientRect().top;
        const WINDOW_HEIGHT = window.innerHeight;
        const MAX_HEIGHT = Math.floor(WINDOW_HEIGHT - BOARD_TOP);

        // Create a list with numbers
        let numbers = [];
        for (let i = 0; i < this.state.numbersAmount; i++) {
            const RANDOM_NUMBER = Math.floor(Math.random() * MAX_HEIGHT) + 1;
            numbers.push(RANDOM_NUMBER);
        }
        // Set the numbers as current
        this.props.setNumbers(numbers);
    }

    windowResized() {
        this.clearBoard();
        this.updateBoard();
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.windowResized());

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