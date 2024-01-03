import { Component, createRef } from "react";
import Board from "./Board";
import Settings from "./Settings";

class App extends Component {
    constructor() {
        super();
        this.state = {
            boardMounted: false
        }
        this.settings = createRef(null);
        this.board = createRef(null);
    }

    setBoardMounted = (bool) => {
        this.setState({
            boardMounted: bool
        });
    }

    get boardMounted() {
        const boardMounted = this.state.boardMounted;
        return boardMounted
    }
    
    render() {
        return (
            <>
                <Settings
                    board={this.board}
                    boardMounted={this.boardMounted}
                    ref={this.settings}
                />
                <Board
                    ref={this.board}
                    setBoardMounted={this.setBoardMounted}
                />
            </>
        )
    }
}

export default App;