import { Component } from "react";
import { Button } from "react-bootstrap";

// Algorithms
import InsertionSort from "./algorithms/insertionSort";
import BubbleSort from "./algorithms/bubbleSort";
import SelectionSort from "./algorithms/selectionSort";
import MergeSort from "./algorithms/mergeSort";

class Run extends Component {
    get algorithm() {
        // Return the algorithm class based on the chosen algorithm
        const ALGORITHM = this.props.algorithm.replace(' ', '-').toLowerCase();
        switch (ALGORITHM) {
            case "insertion-sort":
                return InsertionSort
            case "bubble-sort":
                return BubbleSort
            case "selection-sort":
                return SelectionSort
            case "merge-sort":
                return MergeSort
            default:
                throw Error(`"${this.props.algorithm}" isn't an optional algorithm`);
        }
    }

    async clicked() {
        // Clear the type of the cells
        const board = this.props.board.current;
        board.clear();

        this.props.setRunning(true);

        // Run the algorithm
        await new this.algorithm({
            speedRangeRef: this.props.speedRangeRef,
            cells: board.cells,
            boardSize: board.size,
            algorithm: this.props.algorithm, // for testing purposes
            board
        }).run();

        this.props.setRunning(false);
    }

    render() {
        return (
            <Button
                className="w-100"
                style={{
                    backgroundColor: this.props.running ? "#dc3545" : "#28a745",
                    border: "transparent"
                }}
                disabled={this.props.running}
                onClick={() => this.clicked()}
            >
                Run {this.props.algorithm}
            </Button>
        );
    }
}

export default Run;