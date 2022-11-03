export class Board {
    constructor() {
        this._board = document.getElementById('board');
        this._listSizeSlider = document.getElementById('sizeSlider');
        this._standardElementClasses = [''];
        this.init();
    }

    get elementsWidth() {
        let width = window.innerWidth / this.currentElementsAmount;
        return width + 'px';
    }

    get elementsHeight() {
        let randomNumber = Math.floor(Math.random() * 500);
        return randomNumber + 'px';
    }

    get elements() {
        return this._board.children;
    }

    get boardElementsAmount() {
        return this._board.childElementCount;
    }

    get currentElementsAmount() {
        return parseInt(this._listSizeSlider.value);
    }

    get maxElementsAmount() {
        return this._listSizeSlider.max;
    }

    set maxElementsAmount(amount) {
        this._listSizeSlider.max = amount;
    }

    addElement() {
        let element = document.createElement('div');
        element.style.width = this.elementsWidth;
        element.style.height = this.elementsHeight;
        this._board.appendChild(element);
    }

    removeElement() {
        this._board.removeChild(this._board.lastChild);
    }

    init() {
        this.maxElementsAmount = window.innerWidth;
        this.update();
    }

    resize() {
        this.maxElementsAmount = window.innerWidth;
        this.update();
    }

    addElements(difference) {
        for (let i = 0; i < difference; i++) {
            this.addElement();
        }
    }

    deleteElements(difference) {    
        for (let i = 0; i < difference; i++) {
            this.removeElement();
        }
    }

    updateElementsStyling() {
        for (let element of this.elements) {
            element.style.width = this.elementsWidth;
            element.style.height = this.elementsHeight;
            element.className = this._standardElementClasses.join(' ');
        }
    }

    update() {
        let difference = this.currentElementsAmount - this.boardElementsAmount;
        this.updateElementsStyling();

        if (difference > 0) {
            this.addElements(difference);
        }
        else {
            this.deleteElements(-difference);
        }
    }

    resetBoard() {
        for (let element of this.elements) {
            element.classList = this._standardElementClasses;
            element.style.height = this.elementsHeight;
        }
    }
}