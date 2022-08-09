export class SelectionSort {
    constructor(list) {
        this.list = list;
    }

    async run() {
        // For every number in the list
        for(let i = 0; i < this.list.length; i++) {
            let currentNumber = this.list[i];
            let currentIndex = i;
            let smallestNumberIndex = i;
            let smallestNumber = currentNumber;

            // For every number in the list after the current number
            for(let j = i + 1; j < this.list.length; j++) {
                let nextNumber = this.list[j];

                // If the next number is smaller than the current number
                if(nextNumber < smallestNumber) {
                    smallestNumber = nextNumber;
                    smallestNumberIndex = j;
                }
            }

            // If the index of the current smallest number is not the same as the current index
            if(smallestNumberIndex && currentIndex != smallestNumberIndex) {
                // Swap the current number with the smallest number
                this.list[currentIndex] = smallestNumber;
                this.list[smallestNumberIndex] = currentNumber;
            }
        }
        return this.list;
    }
}