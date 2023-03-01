import { Component } from "react";

class Algorithm extends Component {
    getCell(index) {
        const BOARD = this.props.board;
        const CELL = BOARD[index]
        return CELL
    }
    
    next(index) {
        const CELL = this.getCell(index);
        CELL.name = "next"
    }

    selected(index) {
        const CELL = this.getCell(index);
        CELL.name = "selected"
    }

    sorted(index) {
        const CELL = this.getCell(index);
        CELL.name = "sorted"
    }
}

export default Algorithm;