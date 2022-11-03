import { UpdateBoardList } from "../classes/updateBoardList.js"

export class BogoSort extends UpdateBoardList {
    constructor() {
        super();
    }
    
    get sortedList() {
        // Get correctly sorted list
        let list = [...this.numbers];
        let sorted = list.sort((a, b) => a - b);
        return sorted;
    }

    compare(sortedList, randomizedList) {
        // Compare the 2 lists
        let result = sortedList.every((value, index) => value === randomizedList[index]);
        return result;
    }

    get randomizedList() {
        let list = [...this.numbers];
        let currentIndex = list.length;
        let randomIndex = null;

        // While there can still be elements to shuffle
        while (currentIndex != 0) {
            // Pick a random index
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Switch current index number with random index number
            let temp = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temp;
        }
        return list;
    }
    
    async sort() {
        let sortedList = this.sortedList;
        let randomizedList = null;

        // Loop until list is sorted
        do {
            randomizedList = this.randomizedList;

            // Switch list with randomized list
            for(let i = 0; i < this.numbersAmount; i++) {
                this.updateNumber(i, randomizedList[i]);
            }
            await this.sleep();
            this.clearBoardExceptSorted(); 
        } while(!this.compare(sortedList, randomizedList))
    }

    async run() {
        this.clearBoard();
        await this.sort();
        await this.fullBoardSorted();
    }
}