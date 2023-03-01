import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    updateBoard() {
        // If the algorithm is running, return
        if (this.props.running) { return }

        // Make a list of random numbers with the size of the boardSize state
        const LENGTH = this.props.boardSize - 1;
        let board = []
        for (let i = 0; i <= LENGTH; i++) {
            const HEIGHT = Math.floor(Math.random() * 500)
            const DATA = {
                number: HEIGHT,
                name: ''
            };
            board.push(DATA);
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
                        height={data.number}
                        name={data.name}
                        key={i}
                    />
                )}
            </div>
        );
    }
}

export default Board;