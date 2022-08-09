import { SelectionSort } from "../algorithms/selectionSort.js";


export class Run {
    constructor() {
        this.running = false;
    }

    get algorithmClass() {
        switch(this.algorithm) {
            case "selection-sort":
                return new SelectionSort(this.list);
            default:
                return null;
        }
    }

    get algorithm() {
        return this.algorithmOptions.value;
    }

    run() {
        this.running = true;
        this.toggleSettings();

        // If algorithm class is not null, run the algorithm and return sorted list
        if(this.algorithmClass != null) {
            return this.algorithmClass.run().then((list) => {
                this.done();
                return list;
            });
        }else {
            console.warn(`Algorithm '${this.algorithm}' not found`);
            this.done();
        }
        return null;
    }

    done() {
        this.running = false;
        this.toggleSettings();
    }
}