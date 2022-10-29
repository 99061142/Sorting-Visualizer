import { UpdateBoardList } from "../classes/updateBoardList.js"

export class MergeSort extends UpdateBoardList {
    constructor() {
        super();
    }

    left(dict) {
        return dict.slice(0, this.mid(dict));
    }

    right(dict) {
        return dict.slice(this.mid(dict), dict.length);
    }

    mid(dict) {
        return Math.floor(dict.length / 2);
    }

    async merge(dict, left, right) {
        let currentI = 0;
        let leftI = 0;
        let rightI = 0;
        let startingDict = [...dict];

        while (leftI < left.length && rightI < right.length) {
            if (left[leftI].number < right[rightI].number) {
                dict[currentI] = left[leftI];
                leftI++;
            }
            else {
                dict[currentI] = right[rightI];
                rightI++;
            }
            currentI++;
        }

        while (leftI < left.length) {
            dict[currentI] = left[leftI];
            leftI++;
            currentI++;
        }

        while (rightI < right.length) {
            dict[currentI] = right[rightI];
            rightI++;
            currentI++;
        }

        await this.sortElementHeights(startingDict, dict);
        this.clearBoardExceptSorted();
    }

    async mergeSort(dict=this.dict) {
        if (dict.length < 2) { return; }

        // Sides
        let left = this.left(dict);
        let rigt = this.right(dict);

        // Recursion until list size is < 2
        await this.mergeSort(left);
        await this.mergeSort(rigt);
        
        // Merge the two sides from lowest to highest number
        await this.merge(dict, left, rigt);
    }

    async run() {
        this.clearBoard();
        await this.mergeSort();
        await this.fullBoardSorted();
    }
}