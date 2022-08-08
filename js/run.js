import { SelectionSort } from "./algorithms/selectionSort.js";

export class Run {
    constructor() {
        this.running = false;
    }

    get algorithmClass() {
        switch(this.algorithm) {
            case "selection-sort":
                return new SelectionSort(this.list, this.sorted.bind(this));
            default:
                console.warn(`Algorithm '${this.algorithm}' not found`);
                return null;
        }
    }

    get algorithm() {
        return this.algorithmsOptions.value;
    }

    run() {
        this.running = true;
        this.toggleSettings();

        if(this.algorithmClass != null) {
            this.algorithmClass.run();
        }else{
            this.sorted();
        }
    }

    sorted() {
        this.running = false;
        this.toggleSettings();
    }
}