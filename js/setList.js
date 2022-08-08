class RunList {
    get algorithm() {
        return this.algorithmsOptions.value;
    }

    run() {
        
    }
}


class SetList extends RunList {
    constructor() {
        super();
        this.list = [];
        this.listDiv = document.getElementById('list');
    }

    setRandomList() {
        this.list = this.randomList;
        this.showList();
    }

    get randomList() {
        let list = [];

        for(let i = 0; i < this.listSize; i++) {
            let random_num = Math.floor(Math.random() * 100);

            if(random_num == 0) { random_num = 1; }
            list.push(random_num);
        }
        return list;
    }

    deleteListShow() {
        // get every list div child
        let listDivChildren = this.listDiv.children;
        
        // delete every child
        while (listDivChildren.length > 0) {
            this.listDiv.removeChild(listDivChildren[0]);
        }
    }

    sizeWidth() {
        // get current width of the screen
        let width = window.innerWidth;

        // calculate how big 1 div should be based on the width of the screen and the number of values in the list
        let size = width / this.list.length;
        return `${size}px`;
    }

    createListShow() {
        for(let value of this.list) {
            // add each value to the list
            let div = document.createElement('div');

            div.id = "list-value"
            div.style.height = `${value}px`;
            div.style.width = this.sizeWidth();
            this.listDiv.appendChild(div);
        }
    }

    showList() {
        // if list div isn't empty, delete every child inside the list div
        this.deleteListShow();

        this.createListShow();
    }
}

class ListSettings extends SetList {
    constructor() {
        super();
        this.sizeSlider = document.getElementById('listSize');
        this.listSize = Number(this.sizeSlider.value);
        this.newArray = document.getElementById('newArray');
        this.algorithmsOptions = document.getElementById("algorithms");
        this.sortArray = document.getElementById('sortArray');

        this.settingListeners();
        this.setRandomList();

        this.sizeSlider.max = window.innerWidth;
    }

    get listSizeValue() {
        return this.listSize;
    }

    set listSizeValue(value) {
        this.listSize = Number(value);
    }    

    listSizeListener() {
        // when value changes
        this.sizeSlider.addEventListener('input', () => {
            this.listSizeValue = this.sizeSlider.value;
            this.setRandomList();
        });
    }

    newArrayListener() {
        // Generate new array
        this.newArray.addEventListener('click', () => {
            this.listSizeValue = this.sizeSlider.value;
            this.setRandomList();
        });
    }

    sortArrayListener() {
        // Run array    
        this.sortArray.addEventListener('click', () => {
            this.run();
        });
    }

    settingListeners() {
        this.listSizeListener();
        this.newArrayListener();
        this.sortArrayListener();
    }
}
new ListSettings()