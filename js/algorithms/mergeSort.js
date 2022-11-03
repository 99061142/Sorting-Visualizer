import { UpdateBoardList } from "../classes/updateBoardList.js"

export class MergeSort extends UpdateBoardList {
    constructor() {
        super();
    }

    left(list) {
        return list.slice(0, this.mid(list));
    }

    right(list) {
        return list.slice(this.mid(list), list.length);
    }

    mid(list) {
        return Math.floor(list.length / 2);
    }

    async merge(list, left, right) {
        let currentI = 0;
        let leftI = 0;
        let rightI = 0;

        while (leftI < left.length && rightI < right.length) {
            if (left[leftI].number < right[rightI].number) {
                // Update number list and element height
                await this.next(list[currentI].index);
                this.updateNumber(list[currentI].index, left[leftI].number);

                // Update check list
                list[currentI] = left[leftI];
                leftI++;
            }
            else {
                // Update number list and element height
                await this.next(list[currentI].index);
                this.updateNumber(list[currentI].index, right[rightI].number);

                // Update check list
                list[currentI] = right[rightI];
                rightI++;
            }
            currentI++;
        }

        while (leftI < left.length) {
            // Update number list and element height
            await this.next(list[currentI].index);
            this.updateNumber(list[currentI].index, left[leftI].number);

            // Update check list
            list[currentI] = left[leftI];
            leftI++;
            currentI++;
        }

        while (rightI < right.length) {
            // Update number list and element height
            await this.next(list[currentI].index);
            this.updateNumber(list[currentI].index, right[rightI].number);

            // Update check list
            list[currentI] = right[rightI];
            rightI++;
            currentI++;
        }
        this.clearBoardExceptSorted();
    }

    async mergeSort(list) {
        if (list.length < 2) { return; }

        // Sides
        let left = this.left(list);
        let right = this.right(list);

        // Recursion until list size is < 2
        await this.mergeSort(left);
        await this.mergeSort(right);

        // Merge the two sides from lowest to highest number
        await this.merge(list, left, right);
    }

    get numbersWithIndexes() {
        let list = [];

        // Create a list with the number and the element index
        for (let [i, number] of this.numbers.entries()) {
            list.push({ 
                number: number, 
                index: i
            });
        }
        return list;
    }

    async run() {
        this.clearBoard();
        await this.mergeSort(this.numbersWithIndexes);
        await this.fullBoardSorted();
    }
}