function Cell({ number }) {
    const BOARD_SIZE = document.getElementById("boardSize").value;
    const WIDTH = window.innerWidth / BOARD_SIZE;
    return (
        <div style={{ width: WIDTH, height: number }}>
            {WIDTH >= 40 && number >= 25 &&
                <p className="text-center">
                    {number}
                </p>
            }
        </div>
    );
}

export default Cell;