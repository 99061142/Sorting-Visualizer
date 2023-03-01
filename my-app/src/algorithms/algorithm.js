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

    clearBoardExceptSorted() {
        const BOARD = this.props.board;
        for(let [i, data] of BOARD.entries()) {
            if(data.name !== "sorted") {
                data.name = "";
            }
        }
    }

    previousSmaller(index) {
        const CURRENT_CELL = this.getCell(index);
        const CURRENT_NUMBER = CURRENT_CELL.number;
        const PREVIOUS_CELL = this.getCell(index-1);
        const PREVIOUS_NUMBER = PREVIOUS_CELL.number;
        return PREVIOUS_NUMBER < CURRENT_NUMBER
    }
}

export default Algorithm;