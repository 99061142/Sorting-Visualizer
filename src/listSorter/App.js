import { Component, createRef } from "react";
import Board from "./Board";
import Settings from "./Settings";

class App extends Component {
    constructor() {
        super();
        this.state = {
            settingsComponentMounted: false
        }
        this.settings = createRef(null);
        this.board = createRef(null);
    }

    setSettingsComponentMounted = (bool) => {
        this.setState({
            settingsComponentMounted: bool
        });
    }

    get settingsComponentMounted() {
        const settingsComponentMounted = this.state.settingsComponentMounted;
        return settingsComponentMounted
    }
    
    render() {
        return (
            <>
                <Settings
                    ref={this.settings}
                    board={this.board}
                    setSettingsComponentMounted={this.setSettingsComponentMounted}
                />
                {this.state.settingsComponentMounted &&
                    <Board
                        ref={this.board}    
                        settings={this.settings}
                    />
                }
            </>
        )
    }
}

export default App;