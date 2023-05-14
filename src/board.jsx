import { useEffect } from 'react';
import Cell from './cell';
import RandomizeBoard from './randomizeBoard';

function Board({ boardSize }) {
    // Randomize the board when the board size gets updated
    useEffect(() => {
        RandomizeBoard();
    }, [boardSize]);

    return (
        <div
            id='board'
            className='d-flex justify-content-center'
        >
            {[...Array(boardSize)].map((_, key) =>
                <Cell
                    width={window.innerWidth / boardSize}
                    index={key}
                    key={key}
                />
            )}
        </div>
    );
}

export default Board;