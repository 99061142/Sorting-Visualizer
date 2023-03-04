function Cell({ number, width }) {
    return (
        <div style={{ height: number, width: width }} className="standard"></div>
    );
}

export default Cell;