import { SelectionSort } from "../algorithms/selectionSort.js";
import { BubbleSort } from "../algorithms/bubbleSort.js";
import { InsertionSort } from "../algorithms/insertionSort.js";
import { MergeSort } from "../algorithms/mergeSort.js";
import { BogoSort } from "../algorithms/bogoSort.js";

export class Run {
    constructor(switchSettingsState) {
        this._runnning = false;
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
            default:
                this._runnning = false;
                this._switchSettingsState(this._runnning);
                throw new Error(`Algorithm '${this.chosenAlgorithm}' not found`);
        }
    }

    async run() {
        if(this._runnning) { return; }
        this._runnning = true;
        this._switchSettingsState(this._runnning);

        // Run the algorithm
        await new this.algorithmClass().run().then(() => {
            this._runnning = false;
            this._switchSettingsState(this._runnning);
        })
    }
}