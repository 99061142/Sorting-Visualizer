import { UpdateBoardList } from "../classes/updateBoardList.js"

export class MergeSort extends UpdateBoardList {
    constructor() {
        super();
    }

    left(list) {
        list = list.slice(0, this.mid(list));
        return list;
    }

    right(list) {
        list = list.slice(this.mid(list), list.length);
        return list;
    }

    mid(list) {
        let mid = Math.floor(list.length / 2);
        return mid;
    }

    async merge(list, left, right, fullListI) {
        let currentI = 0;
        let leftI = 0;
        let rightI = 0;
        let number = null;

        while (leftI < left.length && rightI < right.length) {
            if (left[leftI] < right[rightI]) {
                number = left[leftI];
                leftI++;
            }
            else {
                number = right[rightI];
                rightI++;
            }
            await this.next(fullListI);
            this.updateListNumber(currentI, fullListI, number, list);
            fullListI++;
            currentI++;
        }

        while (leftI < left.length) {
            number = left[leftI];
            leftI++;

            await this.next(fullListI);
            this.updateListNumber(currentI, fullListI, number, list);
            fullListI++
            currentI++;
        }

        while (rightI < right.length) {
            number = right[rightI];
            rightI++;

            await this.next(fullListI);
            this.updateListNumber(currentI, fullListI, number, list);
            fullListI++;
            currentI++;
        }
        this.clearBoardExceptSorted();
    }

    async mergeSort(list, fullListI) {
        if (list.length < 2) { return; }

        // Sides
        let left = this.left(list);
        let right = this.right(list);

        // Recursion until list size is < 2
        await this.mergeSort(left, fullListI);
        await this.mergeSort(right, fullListI + this.mid(list));

        // Merge the two sides from lowest to highest number
        await this.merge(list, left, right, fullListI);
    }

    async run() {
        this.clearBoard();
        await this.mergeSort(this.numbers, 0, this.numbers.length);
        await this.fullBoardSorted();
    }
}