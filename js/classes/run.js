import { SelectionSort } from "../algorithms/selectionSort.js";
import { BubbleSort } from "../algorithms/bubbleSort.js";
import {InsertionSort } from "../algorithms/insertionSort.js";
import { MergeSort } from "../algorithms/mergeSort.js";

export class Run {
    constructor() {
        this.running = false;
    }

    get algorithmClass() {
        switch(this.algorithm) {
            case "selection-sort":
                return new SelectionSort();
            case "bubble-sort":
                return new BubbleSort();
            case "insertion-sort":
                return new InsertionSort();
            case "merge-sort":
                return new MergeSort();
            default:
                console.warn(`'${this.algorithm}' NOT FOUND`);
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
        }
    }

    toggleRun() {
        this.running = !this.running;
        this.toggleSettings();
    }
}