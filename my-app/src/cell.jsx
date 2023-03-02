import { Component } from "react";

function Cell({ name, number, width }) {
    return (
        <div style={{ height: number, width: width }} className={`cell ${name}`}></div>
    );
}

export default Cell;