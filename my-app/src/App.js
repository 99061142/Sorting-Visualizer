import './app.css';
import { Component } from 'react';
import Settings from './settings';
import Board from './board';

class App extends Component {
    constructor() {
        super();
        this.state = {
            boardSize: window.innerWidth * .25,
            windowWidth: window.innerWidth
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.windowResized());
    }

    windowResized = () => {
        const WINDOW_WIDTH = window.innerWidth;
        this.setState({
            windowWidth: WINDOW_WIDTH
        });
    }

    setBoardSize = size => {
        size = Number(size)
        this.setState({
            boardSize: size,
        });
    }

    render() {
        return (
            <>
                <Settings {...this.state} setBoardSize={this.setBoardSize} />
                <Board {...this.state} />
            </>
        );
    }
}

export default App;