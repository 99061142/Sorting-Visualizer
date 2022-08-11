export class Test {
    constructor() {
        this.testing = false;
        this.speed = document.getElementById('listSortingSpeed')
    }

    compare(answer) {
        let correctList = [...this.list].sort((a, b) => a - b);
        let correct = answer.every((value, index) => value == correctList[index]); // Check if sorted correctly
        
        if(!answer.length) { return console.warn(`Algorithm '${this.algorithm}' anwer is empty`) }
        if(!correct) { return console.warn(`Algorithm '${this.algorithm}' is not working correctly`); }
        console.log(`Algorithm '${this.algorithm}' is working correctly`);
    }

    listSizeTest() {
        let listSize = this.list.length;
        let listSizeRange = Number(this.sizeSlider.value);
        
        if(listSize != listSizeRange) { return console.warn(`list size is not the same as the chosen size`); }
        console.log(`list size is the same as the chosen size`);
    }

    async algorithmTests() {
        // Save list setting before testing
        this.startingSpeed = this.speed.value;
        this.startingAlgorithm = this.algorithmOptions.value // Save original algorithm
        this.startingListSize = this.sizeSlider.value

        this.speed.value = this.speed.max; // Set speed to max
        this.sizeSlider.value = 20; // Set list size to 20

        // Test every algorithm that isn't disabled
        for(let algorithm of this.algorithmOptions) {
            if(algorithm.disabled) { continue; } // Skip disabled algorithms
            this.algorithmOptions.value = algorithm.value; // Set algorithm
            this.updateList(); // Create new list

            // Run algorithm and compare to correct answer
            let answer = await this.run();
            this.compare(answer);
        }
        // Reset list settings to original values
        this.speed.value = this.startingSpeed;
        this.algorithmOptions.value = this.startingAlgorithm;
        this.sizeSlider.value = this.startingListSize;
        this.updateList(); // Create new list
    }

    runTests() {
        if(this.running) { return; } // Do not test algorithm if it's running
        this.testing = true;

        this.listSizeTest(); // Check if list size is same as chosen size with range
        this.algorithmTests(); // Check if every algorithm is working correctly
    }
}