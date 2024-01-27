import { Component } from "react";

class Animations extends Component {
    constructor(props) {
        super(props);
        this.animations = [];
        this.selectedIndex = null;
    }

    async clearSelected() {
        // If there isn't a cell selected, return
        if(this.selectedIndex === null) return
        
        // Clear the cell that was selected
        const cell = this.cell(this.selectedIndex);
        cell.type = '';

        // Set the selectedIndex class var to null
        this.selectedIndex = null;
    }

    async clearBoard() {
        // Clear the type of the cells
        for (const cell of this.cells)
            cell.type = '';
    }

    async boardSorted() {
        // Set every type of the cells to "sorted"
        for (const cell of this.cells) {
            cell.type = "sorted";
            await this.sleep();
        }
    }

    async setType(animation) {
        const { i, type } = animation

        // Set the cell type
        const cell = this.cell(i);
        cell.type = type;

        // If the cell got the type "selected", set the selectedIndex class var to the cell index
        if (type === "selected") 
            this.selectedIndex = i;

        await this.sleep()
    }

    cellElement(i) {
        // Return the cell element
        const cell = this.cell(i);
        const cellElement = cell.ref.current;
        return cellElement
    }

    cell(i) {
        // Return the cell component
        if (!this.indexInBounds(i)) this.indexOutOfBoundsError(i);
        const cell = this.cells[i];
        return cell
    }

    async swapTransformation(from, to) {
        function transformTranslation(from, to) {
            // Return the transformTranslation for the cell element animation
            const endTransformationPercentage = (from < to) ? 100 : -100;
            const transformTranslation = [
                { transform: "translate(0)" },
                { transform: `translate(${endTransformationPercentage}%)`}
            ];
            return transformTranslation
        }

        // Animate the swap between 2 numbers. 
        // The animation moves the cell element to the left / right side, on the position where the other cell element is
        const duration = this.speed * 5;
        this.cellElement(from).animate(
            transformTranslation(from, to),
            duration
        );
        this.cellElement(to).animate(
            transformTranslation(to, from),
            duration
        );

        await this.sleep(duration);
    }

    async swapCellNumbers(from, to) {
        // Swap the cell element height with eachother
        const cellOne = this.cell(from);
        const cellTwo = this.cell(to);
        [cellOne.number, cellTwo.number] = [cellTwo.number, cellOne.number];
        await this.sleep();
    }

    async swap(animation) {
        const { from, to, elementMustAnimate } = animation

        // If the cell elements must be animated to move
        if (elementMustAnimate)
            await this.swapTransformation(from, to);
        
        // Swap the cell element numbers
        await this.swapCellNumbers(from, to);
    }

    async compare(animation) {
        // Show which cell elements gets to be compared with eachother
        for (let i = 0; i <= 1; i++) {
            for(const cellIndex of animation.indexes) {
                const cell = this.cell(cellIndex);
                cell.type = (cell.type === "selected") ? '' : "selected"
                await this.sleep(1)
            }
        }
        await this.sleep();
    }

    setNumber(animation) {
        // Set the cell element height
        const { index, number } = animation
        const cell = this.cell(index);
        cell.number = number;
    }

    async animate() {
        for (const animation of this.animations) {
            switch (animation.animation) {
                case "comparison":
                    await this.compare(animation);
                    continue
                case "set-number":
                    this.setNumber(animation);
                    continue
                case "set-type":
                    this.setType(animation);
                    continue
                case "swap-numbers":
                    await this.swap(animation);
                    continue
                case "clear-board":
                    await this.clearBoard();
                    continue
                case "board-sorted":
                    await this.boardSorted();
                    continue
                case "clear-selected":
                    await this.clearSelected();
                    continue
                default:
                    throw Error(`The function for the animation '${animation.animation}' couldn't be found`);
            }
        }

        // Clear the animations list to animate the algorithm when the algorithm isn't yet completed.
        // Example: Between every shuffle for the bogosort algorithm
        this.animations = [];
    }

    get speed() {
        // Return the current speed (ms) [1, 100]
        // The MS represents how long it takes between animations
        const ms = this.props.getSleepMS();
        return ms
    }

    async sleep(ms=null) {
        // If the ms parameter isn't null, sleep based on the given parameter
        if (ms) return new Promise((resolve) => setTimeout(resolve, ms));

        // SLeep X ms based on the current speed [1, 100]
        return new Promise((resolve) => setTimeout(resolve, this.speed));
    }
}

export default Animations;