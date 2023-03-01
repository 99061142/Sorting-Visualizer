import { Component } from "react";

class Cell extends Component {
    render() {
        const STYLING = {
            'height': this.props.height,
            'width': this.props.width
        };
        return (
            <div ref={this.element} style={STYLING} className="bg-primary"></div>
        );
    }
}

export default Cell;