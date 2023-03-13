import { createRef } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Board from "./board";
import selectionSort from "./algorithms/selectionSort";
import bubbleSort from "./algorithms/bubbleSort";
import insertionSort from "./algorithms/insertionSort";

class Settings extends Board {
    constructor() {
        super();
        this.state = {
            ...this.state,
            speed: 50,
        };
        this.algorithm = createRef();
    }

    getAlgorithm() {
        const ALGORITHM = this.algorithm.current.value
        switch (ALGORITHM) {
            case "selection-sort":
                return selectionSort;
            case "bubble-sort":
                return bubbleSort;
            case "insertion-sort":
                return insertionSort;
            default:
                throw Error(`Algorithm "${ALGORITHM}" was not found`);
        }
    }

    async run() {
        this.clearBoard();
        this.props.setRunning(true);

        // Run the algorithm
        const ALGORITHM = this.getAlgorithm();
        const STATES = {
            numbers: this.props.numbers,
            numbersAmount: this.state.numbersAmount,
            getSpeed: this.getSpeed,
            setNumbers: this.props.setNumbers,
            getNumbers: this.props.getNumbers
        };
        await new ALGORITHM(STATES).run();

        this.props.setRunning(false);
    }

    getSpeed = () => {
        const SPEED = this.state.speed;
        return SPEED
    }

    setSpeed(speed) {
        speed = Number(speed);
        this.setState({
            speed
        });
    }

    newList() {
        this.clearBoard();
        this.updateBoard();
    }

    algorithmChanged() {
        this.clearBoard();
        this.updateBoard();
    }

    async sizeChanged(amount) {
        amount = Number(amount);
        await this.setNumbersAmount(amount);
        this.clearBoard();
        this.updateBoard();
    }

    render() {
        return (
            <Container className="bg-dark py-3" fluid>
                <Row>
                    <Col xs={6} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                            <Form.Range id="speed" value={this.state.speed} max={99} onChange={(e) => this.setSpeed(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="numbersAmount">Numbers</Form.Label>
                            <Form.Range id="numbersAmount" value={this.state.numbersAmount} disabled={this.props.running} min={2} max={window.innerWidth} onChange={(e) => this.sizeChanged(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                            <Form.Select ref={this.algorithm} id="algorithm" disabled={this.props.running} onChange={() => this.algorithmChanged()}>
                                <option value="selection-sort">Selection sort</option>
                                <option value="bubble-sort">Bubble sort</option>
                                <option value="insertion-sort">Insertion sort</option>
                                <option value="merge-sort" disabled>Merge sort</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="d-flex justify-content-center">
                        <Button className="px-5 py-0" variant={this.props.running ? "danger" : "warning"} onClick={() => this.newList()}>New list</Button>
                    </Col>
                    <Col xs={4} lg={true} className="d-flex justify-content-center">
                        <Button className="px-5 py-0" variant={this.props.running ? "danger" : "success"} onClick={() => this.run()}>Run</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Settings;