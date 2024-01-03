import { Component, createRef } from "react";
import Cell from "./Cell";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            cells: [],
            size: Math.floor(this.maxSize * .25)
        };
        this.minSize = 10;
        this.ref = createRef(null);
    }

    componentDidMount() {
        // Add the cells on the board based on the init state size
        this.setCells();

        // Set the App component "boardMounted" state to true.
        // The Settings component would throw an error if the "boardMounted" state wasn't added.
        // The error happens because the Settings component uses the functionality of the Board component.
        this.props.setBoardMounted(true);
    }

    setCells() {
        // Create a list with references for the cell components and set the list as the "cells" state.
        // The length of the list is based on the "size" state
        let cells = [];
        for (let i = 0; i < this.state.size; i++) cells.push(createRef(null));
        this.setState({
            cells
        });
    }

    get size() {
        const size = this.state.size;
        return size
    }

    set size(size) {
        if (size > this.maxSize) throw RangeError(`The given board size (${size}) is larger than the max board size (${this.maxSize})`);
        if (size < this.minSize) throw RangeError(`The given board size (${size}) is smaller than the min board size (${this.minSize})`);

        this.setState({
            size
        }, () => this.setCells());
    }

    get maxSize() {
        // Return the max amount of cells
        const cellPadding = 5;
        const cellBorder = 1;
        const cellWidth = cellPadding + (cellBorder * 2);
        const maxSize = Math.floor(window.innerWidth / cellWidth);
        return maxSize
    }

    get cells() {
        const cells = this.state.cells;
        return cells
    }

    clear() {
        // Clear the type of the cells
        for (const cell of this.state.cells) cell.current.type = '';
    }

    randomize() {
        // Clear the type of the cells
        this.clear();

        // Randomize every cell number
        for (const cell of this.state.cells) cell.current.randomizeNumber();
    }

    get width() {
        // Return the width of the board
        const board = this.ref.current;
        const width = board.getBoundingClientRect().width;
        return width
    }

    get top() {
        // Return the starting height of the board
        const board = this.ref.current;
        const height = board.getBoundingClientRect().top;
        return height
    }

    render() {
        return (
            <div
                className="d-flex justify-content-center"
                ref={this.ref}
            >
                {this.state.cells
                    .map(
                        (ref, i) => <Cell
                            width={this.width / this.size}
                            boardTop={this.top}
                            ref={ref}
                            key={i}
                        />
                    )
                }
            </div>
        );
    }
}

export default Board;