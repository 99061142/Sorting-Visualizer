import Algorithm from "./algorithm";

class SelectionSort extends Algorithm {
    constructor(props) {
        super(props);
    }

    async loop(current) {
        await this.selected(current);

        // Find the lowest cell number
        let lowestNum = this.getNumber(current);
        let lowestIndex = current;
        for(let i = current+1; i < this.props.numbersAmount; i++) {
            const NUMBER = this.getNumber(i);
            if(NUMBER < lowestNum) {
                await this.next(lowestIndex);
                await this.selected(i);
                lowestIndex = i;
                lowestNum = NUMBER;
            } else {
                await this.next(i);
            }
        }
        // If the lowest index isn't the same as the starting index, switch cells
        if(current !== lowestIndex) {
            this.props.switchNumbers(current, lowestIndex);
        }
        await this.sorted(current);
    }
    
    async run() {
        // For every number in the list
        for(let i = 0; i < this.props.numbersAmount; i++) {
            await this.loop(i); // Move lowest number to the left of the list
            this.clearBoardExceptSorted(); // Clear board except elements that are already sorted
        }
    }
}

export default SelectionSort;