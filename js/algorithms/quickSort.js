import { UpdateBoardList } from "../classes/updateBoardList.js"

export class QuickSort extends UpdateBoardList {
    constructor() {
        super();
    }

    async partition(list, start, end) {
        // Choose the middle element as pivot
        let pivotIndex = Math.floor((end + start) / 2);
        let pivotValue = list[pivotIndex];

        this.selected(pivotIndex);

        // Indexes to compare numbers
        let leftI = start - 1;
        let rightI = end + 1;

        while(true) {
            /* 
            Move the left index to the right at least once and while the element at
            the left index is less than the pivot */
            do {
                leftI++;
                
                if(!this.isSelected(leftI)) {
                    await this.next(leftI);
                }
            } while (list[leftI] < pivotValue);
            
            /* 
            Move the right index to the left at least once and while the element at
            the right index is greater than the pivot */
            do {
                rightI--;

                if(!this.isSelected(rightI)) {
                    await this.next(rightI);
                }
            } while (list[rightI] > pivotValue);

            if(leftI >= rightI) {
                this.clearBoardExceptSorted();

                // Set the index of the pivot to the right index
                return rightI;
            }
            this.swapNumbers(leftI, rightI);
        }
    }

    async sort(list, start, end) {
        if(start >= 0 && end >= 0 && start < end) {
            let pivot = await this.partition(list, start, end);

            await this.sort(list, start, pivot);
            await this.sort(list, pivot + 1, end);
        }
    }

    async run() {
        this.clearBoard();
        await this.sort(this.numbers, 0, this.numbersAmount - 1);
        await this.fullBoardSorted();
    }
}