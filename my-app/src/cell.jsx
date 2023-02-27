import { Component, createRef } from "react";

class Cell extends Component {
    constructor() {
        super();
        this.cell = createRef();
        this.state = {
            height: 0
        }
    }

    setHeight(val) {
        this.setState({
            height: val
        })
    }

    componentDidMount() {
        // Get height position of the element
        const CELL = this.cell.current;
        let { y } = CELL.getBoundingClientRect();

        // Get the max height of the website
        const WINDOW_HEIGHT = window.innerHeight
        const MAX_HEIGHT = WINDOW_HEIGHT - y;

        // Set an random height to the cell lower than the max height
        const RANDOM_HEIGHT = Math.floor(Math.random() * MAX_HEIGHT);
        this.setHeight(RANDOM_HEIGHT);
    }

    render() {
        const STYLING = {
            'height': this.state.height,
            'width': this.props.width
        };
        return (
            <div ref={this.cell} style={STYLING} className="bg-primary"></div>
        );
    }
}

export default Cell;