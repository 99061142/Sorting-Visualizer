import SelectionSort from './algorithms/selectionSort';
import BubbleSort from './algorithms/bubbleSort';
import InsertionSort from './algorithms/insertionSort';
import MergeSort from './algorithms/mergeSort';

async function Run({algorithmName}) {
    const getAlgorithmClass = () => {
        // Get the algorithm class
        switch (algorithmName) {
            case 'selection-sort':
                return SelectionSort
            case 'bubble-sort':
                return BubbleSort
            case 'insertion-sort':
                return InsertionSort
            case 'merge-sort':
                return MergeSort
            default:
                throw Error(`Algorithm '${algorithmName}' couldn't be found.`);
        }
    }

    // Run the algorithm
    const algorithm = getAlgorithmClass();
    await new algorithm().run();
}

export default Run;