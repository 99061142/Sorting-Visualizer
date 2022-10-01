export class Test {
    constructor() {
        this.testing = false;
        this.speed = document.getElementById('listSortingSpeed')
        this._testAmount = 1;
        this._listSize = 20;
    }

    compare(answer) {
        if(!answer.length) { return console.warn(`'${this.algorithm}' EMPTY`) }

        let correctList = [...this.list].sort((a, b) => a - b);
        let correct = answer.every((value, index) => value == correctList[index]); // Check if sorted correctly
        
        if(!correct) { return console.warn(`'${this.algorithm}' NOT WORKING`); }
        console.log(`'${this.algorithm}' WORKING`);
    }

    listSizeTest() {
        let listSize = this.list.length;
        let listSizeRange = Number(this.sizeSlider.value);
        
        if(listSize != listSizeRange) { return console.warn(`list size NOT SAME`); }
        console.log(`list size SAME`);
    }

    async algorithmTests() {
        // Save list setting before testing
        this.startingSpeed = this.speed.value;
        this.startingAlgorithm = this.algorithmOptions.value // Save original algorithm
        this.startingListSize = this.sizeSlider.value

        this.speed.value = this.speed.max; // Set speed to max
        this.sizeSlider.value = this._listSize;

        // Test every algorithm that isn't disabled
        for(let algorithm of this.algorithmOptions) {
            if(algorithm.disabled) { 
                console.warn(`'${algorithm.value}' DISABLED`);
                continue; 
            }

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

    async runTests() {
        if(this.running) { return; } // Do not test algorithm if it's running
        this.testing = true;

        // test (x) times 
        for(let i = 0; i < this._testAmount; i++) {
            this.listSizeTest(); // Check if list size is same as chosen size with range
            await this.algorithmTests(); // Check if every algorithm is working correctly
        }
    }
}