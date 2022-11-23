import { SelectionSort } from "../algorithms/selectionSort.js";
import { BubbleSort } from "../algorithms/bubbleSort.js";
import { InsertionSort } from "../algorithms/insertionSort.js";
import { MergeSort } from "../algorithms/mergeSort.js";
import { BogoSort } from "../algorithms/bogoSort.js";
import { QuickSort } from "../algorithms/quickSort.js";

export class Run {
    constructor(switchSettingsState) {
        this.running = false;
        this._switchSettingsState = switchSettingsState;
        this._algorithmButton = document.getElementById("algorithms");
    }

    get chosenAlgorithm() {
        let algorithm = this._algorithmButton.value;
        return algorithm;
    }

    set chosenAlgorithm(algorithm) {
        this._algorithmButton.value = algorithm;
    }

    get algorithmClass() {
        // call algorithm class based on the current algorithm
        switch (this.chosenAlgorithm) {
            case "selection-sort":
                return SelectionSort;
            case "bubble-sort":
                return BubbleSort;
            case "insertion-sort":
                return InsertionSort;
            case "merge-sort":
                return MergeSort;
            case "bogo-sort":
                return BogoSort;
            case "quick-sort":
                return QuickSort;
            default:
                this.running = false;
                this._switchSettingsState(false);
                throw new Error(`Algorithm '${this.chosenAlgorithm}' not found`);
        }
    }

    async run() {
        if(this.running) { return; }
        this.running = true;
        this._switchSettingsState(true);

        // Run the algorithm
        await new this.algorithmClass().run().then(() => {
            this.running = false;
            this._switchSettingsState(false);
        })
    }
}