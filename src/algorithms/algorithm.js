import { Component } from 'react';

class Algorithm extends Component {
    constructor() {
        super();
        this.cells = [...document.querySelectorAll("[id^='cell']")];
        this.numbers = this.cells.map(cell => Number(cell.dataset.number));
        this.boardSize = this.numbers.length;
    }

    nextSmallest(i) {
        const CURRENT_NUMBER = this.getNumber(i);
        const NEXT_NUMBER = this.getNumber(i+1);

        console.log(NEXT_NUMBER)
        if(NEXT_NUMBER === undefined) {
            return false
        }
        return NEXT_NUMBER < CURRENT_NUMBER
    }

    previousSmallest(i) {
        const CURRENT_NUMBER = this.getNumber(i);
        const PREVIOUS_NUMBER = this.getNumber(i-1);

        if(PREVIOUS_NUMBER === undefined) {
            return false
        }
        return PREVIOUS_NUMBER < CURRENT_NUMBER
    }

    getCell(i) {
        const ID = 'cell-' + i;
        const CELL_ELEMENT = document.getElementById(ID);
        return CELL_ELEMENT;
    }

    getNumber(i) {
        const NUMBER = this.numbers[i];
        return NUMBER
    }

    setCellClassName(i, className) {
        const CELL_ELEMENT = this.getCell(i);
        CELL_ELEMENT.className = className;
    }

    async selected(i) {
        this.setCellClassName(i, 'selected');
        await this.sleep();
    }

    async next(i) {
        this.setCellClassName(i, 'next');
        await this.sleep();
    }

    async sorted(i) {
        this.setCellClassName(i, 'sorted');
        await this.sleep();
    }

    standard(i) {
        this.setCellClassName(i, '');
    }

    sleep() {
        const SPEED_ELEMENT = document.getElementById('speed');
        const CURRENT_SPEED = Number(SPEED_ELEMENT.value);
        const MS = 100 - CURRENT_SPEED;
        return new Promise(resolve => setTimeout(resolve, MS));
    }

    swapNumbers(indexOne, indexTwo) {
        const NUMBERS = this.numbers;
        const NUMBER_ONE = NUMBERS[indexOne];
        const NUMBER_TWO = NUMBERS[indexTwo];
        this.setNumber(indexTwo, NUMBER_ONE);
        this.setNumber(indexOne, NUMBER_TWO);
    }

    setNumber(i, number) {
        // Set number inside list
        this.numbers[i] = number;

        // Set number on the screen
        const CELL = this.cells[i];
        CELL.dataset.number = number;
    }

    async clearBoardExceptSorted() {
        for (const [i, cell] of this.cells.entries()) { 
            const TYPE = cell.className;    
            if(TYPE !== 'sorted') {
                this.standard(i);
            }
        }
    }

    async clearBoard() {
        for (let i = 0; i < this.boardSize; i++) {  
            this.standard(i);
        }
    }

    async setBoardSorted() {
        for (let i = 0; i < this.boardSize; i++) {  
            await this.sorted(i);
        }
    }
}

export default Algorithm;