export class Run {
    constructor() {
        this.running = false;
    }

    get algorithm() {
        return this.algorithmsOptions.value;
    }

    run() {
        this.running = true;
        this.toggleSettings();
    }

    sorted() {
        this.running = false;
        this.toggleSettings();
    }
}