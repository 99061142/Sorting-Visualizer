import Algorithm from "./algorithm";

class MergeSort extends Algorithm {
    midIndex(startIndex, endIndex) {
        // Return the mid index
        const midIndex = Math.floor((startIndex + endIndex) / 2);
        return midIndex
    }

    merge(numbers, startIndex, midIndex, endIndex, auxiliaryNumbers) {
        let index = startIndex;
        let leftIndex = startIndex;
        let rightIndex = midIndex + 1;
        
        while (leftIndex <= midIndex && rightIndex <= endIndex) {
            // Push the animation to compare 2 numbers with eachother
            this.animations.push({
                animation: "comparison",
                indexes: [leftIndex, rightIndex]
            });
            
            // If the left number is larger
            if (auxiliaryNumbers[leftIndex] <= auxiliaryNumbers[rightIndex]) {
                // Push the animation to set the given number to the given index
                this.animations.push({
                    animation: "set-number",
                    index,
                    number: auxiliaryNumbers[leftIndex]
                })

                numbers[index++] = auxiliaryNumbers[leftIndex++];
                continue
            }
            
            // Push the animation to set the given number to the given index
            this.animations.push({
                animation: "set-number",
                index,
                number: auxiliaryNumbers[rightIndex]
            })

            numbers[index++] = auxiliaryNumbers[rightIndex++];
        }

        while (leftIndex <= midIndex) {
            // Push the animation to show on which cell the algorithm is, and update the number
            this.animations.push(
                {
                    animation: "comparison",
                    indexes: [leftIndex]
                },
                {
                    animation: "set-number",
                    index,
                    number: auxiliaryNumbers[leftIndex]
                }
            );
            numbers[index++] = auxiliaryNumbers[leftIndex++];
        }

        while (rightIndex <= endIndex) {
            // Push the animation to show on which cell the algorithm is, and update the number
            this.animations.push(
                {
                    animation: "comparison",
                    indexes: [rightIndex]
                },
                {
                    animation: "set-number",
                    index,
                    number: auxiliaryNumbers[rightIndex]
                }
            );
            numbers[index++] = auxiliaryNumbers[rightIndex++];
        }
    }

    mergeSort(numbers, startIndex, endIndex, auxiliaryNumbers) {
        // If the numbers doesn't need to be compared, return
        if (startIndex === endIndex) return
        
        const midIndex = this.midIndex(startIndex, endIndex);
        this.mergeSort(auxiliaryNumbers, startIndex, midIndex, numbers);
        this.mergeSort(auxiliaryNumbers, midIndex + 1, endIndex, numbers);
        this.merge(numbers, startIndex, midIndex, endIndex, auxiliaryNumbers);
    }

    async run() {
        this.mergeSort(this.numbers, 0, this.props.boardSize - 1, [...this.numbers]);    
        
        // Show that the board is sorted
        this.animations.push({ animation: "board-sorted" });

        // Animate the algorithm
        await this.animate();
        
    }
}

export default MergeSort;