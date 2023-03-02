import Cell from "./cell";
import { Component, createRef } from "react";

class Board extends Component {
    updateBoard() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Make the board list with the name and number of the cells
        const LENGTH = this.props.boardSize - 1;
        let board = [];
        for (let i = 0; i <= LENGTH; i++) {
            const RANDOM_NUMBER = Math.floor(Math.random() * 500) + 1;
            board.push({
                name: '',
                number: RANDOM_NUMBER
            });
        }
        this.props.setBoard(board);
    }

    componentDidMount() {
        // When the window gets resized, update board list
        window.addEventListener('resize', () => this.updateBoard());

        // Add the initialized board list
        this.updateBoard();
    }

    render() {
        const CELL_WIDTH = this.props.windowWidth / this.props.boardSize;
        return (
            <div className="d-flex justify-content-center">
                {this.props.board.map((data, i) =>
                    <Cell
                        width={CELL_WIDTH}
                        number={data.number}
                        name={data.name}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;