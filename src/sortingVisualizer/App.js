import { Component, createRef } from "react";
import Board from "./Board";
import Settings from "./Settings";

class App extends Component {
    constructor() {
        super();
        this.state = {
            boardComponentMounted: false
        };
        this.board = createRef(null);
    }

    setBoardComponentMounted = (bool) => {
        this.setState({
            boardComponentMounted: bool
        });
    }

    get boardComponentMounted() {
        const settingsComponentMounted = this.state.boardComponentMounted;
        return settingsComponentMounted
    }
    
    render() {
        return (
            <>
                <Settings
                    board={this.board}
                    boardComponentMounted={this.boardComponentMounted}
                />
                <Board
                    ref={this.board}
                    setBoardComponentMounted={this.setBoardComponentMounted}
                />
            </>
        )
    }
}

export default App;