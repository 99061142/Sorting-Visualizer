import { UpdateBoardList } from "../classes/updateBoardList.js"

export class MergeSort extends UpdateBoardList {
    constructor(list) {
        super();
        this.list = list;
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

    async merge(list, leftValues, rightValues) {
        let leftIndex = 0;
        let rightIndex = 0;
        let outputIndex = 0;

        // While there are values inside the left and right list that needs to be compared
        while (leftIndex < leftValues.length && rightIndex < rightValues.length) {
            // Set list value to the lowest value inside the left or right list
            list[outputIndex++] = (leftValues[leftIndex] < rightValues[rightIndex]) ? leftValues[leftIndex++] : rightValues[rightIndex++];
        }

        // Add the remaining values from the left list to the output list
        while (leftIndex < leftValues.length) {
            list[outputIndex++] = leftValues[leftIndex++];
        }

        // Add the remaining values from the right list to the output list
        while (rightIndex < rightValues.length) {
            list[outputIndex++] = rightValues[rightIndex++];
        }
    }

    async mergeSort(list) {
        if (list.length < 2) { return; }

        // Sides
        let leftValues = this.left(list);
        let rightValues = this.right(list);

        // Recursion until list size is 1
        this.mergeSort(leftValues);
        this.mergeSort(rightValues);

        // Merge the two sides from lowest to highest value 
        this.merge(list, leftValues, rightValues);

        
    }

    async run() {
        this.clearBoard();
        this.mergeSort(this.list);
        return this.list;
    }
}