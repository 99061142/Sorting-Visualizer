import Cell from "./cell";
import { Component } from "react";

class Board extends Component {
    render() {
        const CELL_WIDTH = this.props.windowWidth / this.props.boardSize;
        return (
            <div className="d-flex justify-content-center">
                {[...Array(this.props.boardSize)].map((_, i) =>
                    <Cell width={CELL_WIDTH} key={i} />
                )}
            </div>
        );
    }
}

export default Board;