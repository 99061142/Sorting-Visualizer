import Algorithm from "./algorithm";

class insertionSort extends Algorithm {
    constructor(props) {
        super(props);
        this.sortedIndex = 0;
    }

    async loop(current) {
        this.standard(this.sortedIndex);
        
        // When the previous cell isn't smaller, return
        if(this.previousSmallest(current)) { return }

        await this.sorted(current);

        // Switch current number with left number until left number is smaller
        while(current > 0 && !this.previousSmallest(current)) {
            this.props.switchNumbers(current, current-1);
            current--;
            await this.next(current);
        }
    }
    
    
    async run() {
        // For every number in the list
        for(let i = 0; i < this.props.numbersAmount; i++) {
            await this.loop(i); // Move current number to the left until left number is smaller
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
        await this.boardSorted(); // Set all cells to sorted
    }
}

export default insertionSort;