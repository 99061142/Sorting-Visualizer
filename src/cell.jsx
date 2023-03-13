function Cell({ number }) {
    const NUMBERS_AMOUNT = document.getElementById("numbersAmount").value;
    const WIDTH = window.innerWidth / NUMBERS_AMOUNT;
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