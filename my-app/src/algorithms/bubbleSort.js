import Algorithm from "./algorithm";

class BubbleSort extends Algorithm {
    constructor(props) {
        super(props);
    }

    async loop(current) {
        // Move highest number to the right side of the board
        const END = this.props.boardSize - current - 1;
        for(let i = 0; i < END; i++) {
            if(i >= 1) { await this.next(i-1); }
            await this.selected(i);

            // Switch current and right number if right number is smaller
            if(this.nextSmallest(i)) { 
                this.props.switchNumbers(i, i+1);
            }
        }
        this.sorted(END);
    }
    
    async run() {
        // For every number in the list
        for(let i = 0; i < this.props.boardSize; i++) {
            await this.loop(i); // Move highest number to the right side of the board
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
    }
}

export default BubbleSort;