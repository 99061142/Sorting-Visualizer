import { Component } from "react";

class Algorithm extends Component {
    getCells() {
        const BOARD = document.getElementById("board");
        const CELLS = BOARD.children;
        return CELLS
    }
    
    getCell(index) {
        const CELLS = this.getCells();
        const CELL = CELLS.item(index);
        return CELL
    }

    getNumber(index) {
        const BOARD = this.props.getNumbers();
        const NUMBER = BOARD[index];
        return NUMBER
    }

    async next(index) {
        const CELL_ELEMENT = this.getCell(index)
        CELL_ELEMENT.className= "next";
        await this.sleep();
    }

    async selected(index) {
        const CELL_ELEMENT = this.getCell(index)
        CELL_ELEMENT.className= "selected";
        await this.sleep();
    }

    async sorted(index) {
        const CELL_ELEMENT = this.getCell(index)
        CELL_ELEMENT.className= "sorted";
        await this.sleep();
    }

    standard(index) {
        const CELL_ELEMENT = this.getCell(index)
        CELL_ELEMENT.className= "standard";
    }

    clearBoardExceptSorted() {
        const CELLS = [...this.getCells()];
        for (let [i, cell] of CELLS.entries()) {
            if(cell.className !== "sorted") {
                this.standard(i);
            }
        }
    }

    sleep() {
        let ms = 100 - this.props.getSpeed();
        if(ms == 0) { return }
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Algorithm;