import { ListSettings } from './ListSettings.js';

export class Test extends ListSettings {
    constructor() {
        super();
        this.testing = false;
    }

    compare(answer) {
        let correctList = [...this.list].sort((a, b) => a - b);
        let correct = answer.every((value, index) => value == correctList[index]); // Check if sorted correctly

        if(correct) { return console.log(`Algorithm '${this.algorithm}' is working correctly`); }
        console.warn(`Algorithm '${this.algorithm}' is not working correctly`);
    }

    async runTests() {
        if(this.running) { return; } // Do not test algorithm if it's running
        this.testing = true;

        let lastChosenAlgorithm = this.algorithmOptions.value; // Save last chosen algorithm

        // Test every algorithm that isn't disabled
        for(let algorithm of this.algorithmOptions) {
            if(algorithm.disabled) { continue; } // Skip disabled algorithms

            this.algorithmOptions.value = algorithm.value;
            let answer = await this.run();
            this.compare(answer);
        }
        this.algorithmOptions.value = lastChosenAlgorithm; // Restore last chosen algorithm
    }
}
let test = new Test();

document.getElementById('test-algorithms').addEventListener('click', () => {
    test.runTests();
});