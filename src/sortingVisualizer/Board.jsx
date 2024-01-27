import { Component, createRef } from "react";
import Cell from "./Cell";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            cells: [],
            size: 0
        };
        this._ref = createRef(null);
        this.minSize = 10;
    }

    componentDidMount() {
        // Set the init board size
        this.size = this.props.initSize || Math.floor(this.maxSize * .1);

        //! Set the BoardComponentMounted state to "true".
        //! This is needed for size range inside the Settings component. 
        //! The range uses the Board class functionality, and must render AFTER the board was mounted
        this.props.setBoardComponentMounted(true);
    }

    set size(size) {
        // Throw an error if the size is out of bounds
        if (size < this.minSize) throw RangeError(`The given board size (${size}) is smaller than the min board size (${this.minSize})`);
        if (size > this.maxSize) throw RangeError(`The given board size (${size}) is larger than the max board size (${this.maxSize})`);

        // Create a list with references for the Cells components that gets rendered with this list
        let cells = [];
        for (let i = 0; i < size; i++) {
            cells.push(createRef(null));
        }

        // Set the new size and cells references
        this.setState({
            size,
            cells
        });
    }

    get size() {
        const size = this.state.size;
        return size
    }

    get maxSize() {
        // Minimum padding of the cell without borders
        const cellPadding = 5;

        // Pixels of 1 border side
        const cellBorder = 1;

        // Minimum cell width
        const cellWidth = cellPadding + (cellBorder * 2);

        // Divide the board width with the minimum cell width, and return the answer
        const maxSize = Math.floor(this.width / cellWidth);
        return maxSize
    }

    get cells() {
        const cells = this.state.cells;
        return cells
    }

    get width() {
        // Return the width of the board
        const board = this._ref.current;
        const width = board.getBoundingClientRect().width;
        return width
    }

    get top() {
        // Return the top of the board
        const board = this._ref.current;
        const height = board.getBoundingClientRect().top;
        return height
    }

    clear() {
        // Clear the type of the cells
        for (const cell of this.cells) {
            cell.current.type = '';
        }
    }

    randomize() {
        // Clear the type of the cells
        this.clear();

        // Randomize every cell number
        for (const cell of this.cells) {
            cell.current.randomizeNumber();
        }
    }

    render() {
        return (
            <div
                className="d-flex justify-content-center"
                ref={this._ref}
            >
                {this.cells
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