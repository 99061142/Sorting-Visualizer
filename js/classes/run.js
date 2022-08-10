import { SelectionSort } from "../algorithms/selectionSort.js";
import { BubbleSort } from "../algorithms/bubbleSort.js";

export class Run {
    constructor() {
        this.running = false;
    }

    get algorithmClass() {
        switch(this.algorithm) {
            case "selection-sort":
                return new SelectionSort(this.list);
            case "bubble-sort":
                return new BubbleSort(this.list);
            default:
                return null;
        }
    }

    get algorithm() {
        return this.algorithmOptions.value;
    }

    run() {
        if(this.running) { return; } // Do not run algorithm if it's running
        this.running = true;

        this.toggleSettings();

        // If algorithm class is not null, run the algorithm and return sorted list
        try {
            return this.algorithmClass.run().then(list => this.done(list));
        } catch(e) {
            console.error(e);
            this.done();
            return null;
        }
    }

    done(list) {
        this.running = false;
        this.toggleSettings();
        return list
    }
}