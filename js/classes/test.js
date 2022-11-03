import { Run } from './run.js';

export class Test extends Run {
    constructor(switchSettingsState, resetBoard) {
        super(switchSettingsState);
        this._testing = false;
        this._resetBoard = resetBoard;
        this._boardChildren = document.getElementById('board').children;
    }

    get algorithms() {
        let list = [];
        let algorithmButton = document.getElementById('algorithms');
        let algorithms = algorithmButton.children;

        for(let algorithm of algorithms) {
            list.push(algorithm.value);
        }
        return list;
    }

    testingMessage() {
        let message = `Currently testing '${this.chosenAlgorithm}'`
        console.log(message);
    }

    successMessage() {
        let message = `Successfully tested '${this.chosenAlgorithm}'`
        console.log(message);
    }

    errorMessage() {
        let message = `Error testing '${this.chosenAlgorithm}'`
        console.warn(message);
    }

    elementsNumber() {
        let list = [];

        for(let i = 0; i < this._boardChildren.length; i++) {
            let number = this._boardChildren[i].offsetHeight;
            list.push(number);
        }
        return list;
    }

    sortList(list) {
        let sortedList = list.sort((a, b) => a - b);
        return sortedList;
    }

    computerSorted() {
        let list = this.elementsNumber();
        let sortedList = this.sortList(list);
        return sortedList;
    }

    selfSorted() {
        let list = this.elementsNumber();
        return list;
    }

    compare(list1, list2) {
        let result = list1.every((value, index) => value === list2[index]);
        return result;
    }

    result(computerSorted) {
        let selfSorted = this.selfSorted();
        let result = this.compare(computerSorted, selfSorted);

        if(result) {
            this.successMessage();
        }
        else {
            this.errorMessage();
        }
    }

    askTesting(algorithm) {
        let confirm = window.confirm(`Are you sure you want to test '${algorithm}' with an list length of ${this._boardChildren.length}?`); 
        return confirm;
    }

    async test() {
        if(this._testing) { return; }
        this._testing = true;

        let algorithms = this.algorithms;

        // set bogosort as last algorithm to test
        let bogoSort = algorithms.splice(algorithms.indexOf('bogo-sort'), 1);
        algorithms.push(bogoSort[0]);

        for(let algorithm of algorithms) {
            // Ask if the user wants to test the algorithm if it's bogo-sort
            if(algorithm == 'bogo-sort') {
                if(!this.askTesting(algorithm)) {
                    break;
                }
            }

            this._resetBoard();
            let computerSorted = this.computerSorted();
            this.chosenAlgorithm = algorithm;

            this.testingMessage();
            await this.run();

            this.result(computerSorted);
        }
        this._testing = false;
    }
}