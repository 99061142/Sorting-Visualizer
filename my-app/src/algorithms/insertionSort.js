import Algorithm from "./algorithm";

class insertionSort extends Algorithm {
    constructor(props) {
        super(props);
    }

    async loop(current) {

    }
    
    async run() {
        // For every number in the list
        for(let i = 0; i < this.props.boardSize; i++) {
            await this.loop(i); //
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
    }
}

export default insertionSort;