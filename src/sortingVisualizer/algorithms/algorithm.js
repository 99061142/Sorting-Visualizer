import Animations from "./animations";

class Algorithm extends Animations {
    constructor(props) {
        super(props);
        this.numbers = props.cells.map((cell) => cell.current.number);
        this.cells = props.cells.map((cell) => cell.current);
        this.cellsElement = this.cells.map((cellComponent) => cellComponent.ref.current);
    }

    async swapNumbers(from, to, elementMustAnimate=false) {
        // Throw an error if one of the given indexes are out of bounds
        if (!this.indexInBounds(from)) this.indexOutOfBoundsError(from);
        if (!this.indexInBounds(to)) this.indexOutOfBoundsError(to);

        // Swap the numbers inside the list
        [
            this.numbers[from],
            this.numbers[to]
        ] = [
            this.numbers[to], 
            this.numbers[from]
        ];

        // Add the swap to the animations list to animate later.
        // elementMustAnimate key means the animation for the element itself (element moves to the left/right).
        this.animations.push({
            animation: "swap-numbers",
            from,
            to,
            elementMustAnimate
        });
    }

    indexInBounds(i) {
        // Return if the index is out of bounds
        if (
            i < 0 || 
            i >= this.props.boardSize ||
            i === undefined
        ) {
            return false
        }
        return true
    }

    indexOutOfBoundsError(i) {
        // Throw an error with the information why the index is out of bounds
        if (i < 0) throw RangeError(`The index you have given (${i}) can't be smaller than 0`);
        if (i >= this.props.boardSize) throw RangeError(`The index you have given (${i}) can't be larger than ${this.props.boardSize}`);
        throw TypeError('The index can\'t be empty');
    }
}

export default Algorithm;