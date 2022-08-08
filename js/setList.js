class SetList {
    constructor() {
        this.list = [];
    }

    setRandomList() {
        this.list = this.randomList;
    }

    get randomList() {
        return Array(this.listSize).fill().map(() => Math.round(Math.random() * 100));
    }
}

class ListSettings extends SetList {
    constructor() {
        super();
        this.sizeSlider = document.getElementById('listSize');
        this.listSize = null;
        this.listSizeListener();
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
}
new ListSettings()