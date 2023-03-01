import { Component } from "react";

class Cell extends Component {
    render() {
        const STYLING = {
            'height': this.props.height,
            'width': this.props.width
        };
        return (
            <div ref={this.element} style={STYLING} className={`cell ${this.props.name}`}></div>
        );
    }
}

export default Cell;