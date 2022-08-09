import { callAlgorithmClass } from "./callAlgorithmClass.js";

export class Run extends callAlgorithmClass {
    constructor() {
        super();
        this.running = false;
    }

    get algorithm() {
        return this.algorithmsOptions.value;
    }

    run() {
        this.running = true;
        this.toggleSettings();

        if(this.algorithmClass != null) {
            this.algorithmClass.run();
        }else{
            this.sorted();
        }
    }

    sorted() {
        this.running = false;
        this.toggleSettings();
    }
}