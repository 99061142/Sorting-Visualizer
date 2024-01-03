import { Component, createRef } from "react";
import './styling/cell.scss';

class Cell extends Component {
    constructor() {
        super();
        this.state = {
            type: '',
            number: 0
        };
        this.ref = createRef(null);
    }

    componentDidMount() {
        this.randomizeNumber();
    }

    randomizeNumber() {
        this.number = this.randomNumber;
    }

    get randomNumber() {
        // Return a random number between min and max.
        // Max value can't be higher than the calculation: window inner height - board top
        const max = window.innerHeight - this.props.boardTop;
        const min = 50;
        const randomNumber = Math.floor(Math.random() * (max - min) + min);
        return randomNumber
    }

    get type() {
        const type = this.state.type;
        return type
    }

    set type(type) {
        this.setState({
            type
        });
    }

    get number() {
        const number = this.state.number;
        return number
    }

    set number(number) {
        this.setState({
            number
        });
    }

    render() {
        return (
            <div
                className={
                    "cell border border-dark" +
                    (this.type ? ' ' + this.type : '')
                }
                style={{
                    width: this.props.width,
                    height: this.state.number,
                    backgroundColor: "#007bff"
                }}
                ref={this.ref}
            >
            </div>
        );
    }
}

export default Cell;