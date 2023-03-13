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
    
    switchNumbers = (indexOne, indexTwo) => {
        // indexOne = number of indexTwo, indexTwo = number of indexOne
        const NUMBERS = [...this.state.numbers];
        const TEMP = NUMBERS[indexOne];
        const NUMBER_TWO = NUMBERS[indexTwo];
        NUMBERS[indexOne] = NUMBER_TWO;
        NUMBERS[indexTwo] = TEMP;
        this.setNumbers(NUMBERS);
    }

    setNumbers = numbers => {
        this.setState({
            numbers: numbers
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
                    switchNumbers={this.switchNumbers}
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