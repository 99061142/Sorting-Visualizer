import { List } from "./list.js";

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

    async runTests() {
        if(this.running) { return; } // Do not test algorithm if it's running
        this.testing = true;
        this.speed.value = this.speed.max

        // Test every algorithm that isn't disabled
        for(let algorithm of this.algorithmOptions) {
            if(algorithm.disabled) { continue; } // Skip disabled algorithms
            this.algorithmOptions.value = algorithm.value; // Set algorithm

            // Run algorithm and compare to correct answer
            let answer = await this.run();
            this.compare(answer);

            this.updateList(); // Create new list
        }
    }
}