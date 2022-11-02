import { UpdateBoardList } from "../classes/updateBoardList.js"

export class BogoSort extends UpdateBoardList {
    constructor() {
        super();
    }
    
    get sortedList() {
        // Get correctly sorted list
        let list = this.currentNumbers;
        let sorted = list.sort((a, b) => a - b);
        return sorted;
    }

    get randomizedList() {
        // Randomize list
        let list = this.currentNumbers.sort(() => Math.random() - 0.5);
        return list;
    }

    compare(sortedList, randomizedList) {
        // Compare the 2 lists
        let result = sortedList.every((value, index) => value === randomizedList[index]);
        return result;
    }
    
    async sort() {
        let sortedList = this.sortedList;
        let randomizedList = null;

        // Loop until board is sorted
        do {
            let elements = [...this.elements];
            let list = this.randomizedList;

            // For every element on the board
            for(let [i, element] of elements.entries()) {
                // Get a random number
                let randomIndex = Math.floor(Math.random() * list.length);
                let number = list[randomIndex];
                list.splice(randomIndex, 1);

                // Update element number with the random number
                this.dict[i].number = number;
                element.style.height = number + 'px';
            }
            await this.sleep();
            randomizedList = this.currentNumbers;
        } while(!this.compare(sortedList, randomizedList));
    }

    async run() {
        this.clearBoard();
        await this.sort();
        await this.fullBoardSorted();
    }
}