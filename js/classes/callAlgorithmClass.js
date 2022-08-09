import { SelectionSort } from "../algorithms/selectionSort.js";

export class callAlgorithmClass {
    get algorithmClass() {
        switch(this.algorithm) {
            case "selection-sort":
                return new SelectionSort(this.list, this.sorted.bind(this));
            default:
                console.warn(`Algorithm '${this.algorithm}' not found`);
                return null;
        }
    }
}