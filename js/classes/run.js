import { SelectionSort } from "../algorithms/selectionSort.js";
import { BubbleSort } from "../algorithms/bubbleSort.js";
import { Test } from "./test.js";

export class Run extends Test {
    constructor() {
        super();
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
        this.toggleRun();

        // If algorithm class is not null, run the algorithm and return sorted list
        try {
            return this.algorithmClass.run().then((list) => {
                this.toggleRun();
                return list;
            });
        }catch(e) {
            console.error(e);
            this.toggleRun();
            return null;
        }
    }

    toggleRun() {
        this.running = !this.running;
        this.toggleSettings();
    }
}