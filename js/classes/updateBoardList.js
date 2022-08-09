export class UpdateBoardList {
    constructor() {
        this.listDiv = document.getElementById('list');
        this.smallestIndex = null;
    }

    sleep() {
        let ms = document.getElementById('listSortingSpeed').value;
        if(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
    }

    get children() {
        return this.listDiv.children;
    }

    current(i) {
        this.children.item(i).style.backgroundColor = 'green';
    }

    async next(i) {
        await this.sleep();
        this.children.item(i).style.backgroundColor = 'orange';
    }
    
    standard(i) {
        this.children.item(i).style.backgroundColor = 'blue';
    }

    isSmallest(i) {
        return this.smallestIndex == i;
    }

    smallest(i) { 
        if(!this.isSmallest(i)) { this.next(this.smallestIndex); }
        this.smallestIndex = i;

        this.children.item(i).style.backgroundColor = 'red';
    }

    updateHeight(i, value) {
        this.children.item(i).style.height = `${value}px`;
    }
}