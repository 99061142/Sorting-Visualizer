import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    updateBoard() {
        // Make a list of random numbers with the size of the boardSize state
        const LENGTH = this.props.boardSize;
        const NUMBERS = Array.from({ length: LENGTH }, () => Math.floor(Math.random() * 500));
        this.props.setNumbers(NUMBERS);
    }

    componentDidMount() {
        // When the window gets resized, update board list
        window.addEventListener('resize', () => this.updateBoard());

        // Add the initialized board list
        this.updateBoard(this.props.boardSize);
    }

    render() {
        const CELL_WIDTH = this.props.windowWidth / this.props.boardSize;
        return (
            <div className="d-flex justify-content-center">
                {this.props.numbers.map((number, i) =>
                    <Cell
                        width={CELL_WIDTH}
                        height={number}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;