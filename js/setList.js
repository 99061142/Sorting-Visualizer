class RunList {
    constructor() {
        this.running = false;
    }

    get algorithm() {
        return this.algorithmsOptions.value;
    }

    run() {
        this.running = true;
        this.toggleSettings()
    }

    sorted() {
        this.running = false;
        this.toggleSettings()
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

            div.style.height = `${value}px`;
            div.style.width = this.sizeWidth();
            this.listDiv.appendChild(div);
        }
    }

    resizeListValues() {
        // get every list div child
        let listDivChildren = this.listDiv.children;
        
        // resize every child
        for(let child of listDivChildren) {
            child.style.width = this.sizeWidth();
        }
    }

    showList() {
        // if list div isn't empty, delete every child inside the list div
        this.deleteListShow();
        this.createListShow();
    }

    resizeList() {
        while(this.list.length > this.sizeSlider.value) {
            this.list.pop() // remove last value
            this.listDiv.removeChild(this.listDiv.lastChild); // remove last child 
        }
    }
}

class ListSettings extends SetList {
    constructor() {
        super();
        this.sizeSlider = document.getElementById('listSize');
        this.listSize = Number(this.sizeSlider.value);
        this.newArray = document.getElementById('newArray');
        this.algorithmsOptions = document.getElementById("algorithms");
        this.runButton = document.getElementById('run-button');

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
        // when user releases the slider
        this.sizeSlider.addEventListener('mouseup', () => {
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
        this.runButton.addEventListener('click', () => {
            this.run();
        });
    }

    settingListeners() {
        this.listSizeListener();
        this.newArrayListener();
        this.sortArrayListener();
        this.windowSizeListener();
    }

    windowSizeListener() {
        window.addEventListener('resize', () => {
            this.sizeSlider.max = window.innerWidth;
            this.resizeList(); // resize list length based on the new width of the screen
            this.resizeListValues(); // resize list values on the screen based on the new width of the screen
        });
    }

    toggleSettings() {
        this.sizeSlider.disabled = this.running;
        this.algorithmsOptions.disabled = this.running;
        this.runButton.disabled = this.running;
    }
}
new ListSettings()