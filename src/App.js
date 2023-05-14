import './app.css';
import { useState } from 'react';
import Settings from './settings';
import Board from './board';

function App() {
    const [boardSize, setBoardSize] = useState(0);
    return (
        <>
            <Settings setBoardSize={setBoardSize} />
            <Board boardSize={boardSize} />
        </>
    );
}

export default App;