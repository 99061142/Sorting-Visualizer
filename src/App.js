import './app.css';
import { Component } from 'react';
import Settings from './settings';
import Board from './board';

class App extends Component {
    constructor() {
        super();
        this.state = {
            numbers: [],
            running: false
        };
    }

    setRunning = bool => {
        this.setState({
            running: bool
        });
    }

    setNumbers = numbers => {
        this.setState({
            numbers
        });
    }

    getNumbers = () => { 
        const NUMBERS = this.state.numbers;
        return NUMBERS
    }

    render() {
        return (
            <>
                <Settings 
                    {...this.state} 
                    setRunning={this.setRunning}
                    setNumbers={this.setNumbers}
                    getNumbers={this.getNumbers}
                />
                <Board
                    {...this.state}
                    setNumbers={this.setNumbers}
                />
            </>
        );
    }
}

export default App;