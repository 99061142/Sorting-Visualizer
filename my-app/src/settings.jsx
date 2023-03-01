import { createRef } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Board from "./board";
import selectionSort from "./algorithms/selectionSort";

class Settings extends Board {
    constructor() {
        super();
        this.state = {
            speed: 50,
        };
        this.algorithm = createRef();
    }

    async run() {
        const ALGORITHM = this.algorithm.current.value


        this.props.setRunning(true);
        switch (ALGORITHM) {
            case "selection-sort":
                await new selectionSort().run();
                break
            default:
                throw Error(`Algorithm "${ALGORITHM}" was not found`);
        }
        this.props.setRunning(false);
    }

    getSpeed = () => {
        const SPEED = this.state.speed;
        return SPEED
    }

    setSpeed(val) {
        val = Number(val);
        this.setState({
            speed: val
        });
    }

    async setSize(val) {
        val = Number(val);
        await this.props.setBoardSize(val);
        this.updateBoard();
    }

    render() {
        return (
            <Container className="bg-dark py-3" fluid>
                <Row>
                    <Col xs={6} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="speed">Speed</Form.Label>
                            <Form.Range id="speed" onChange={(element) => this.setSpeed(element.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={6} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="size">Size</Form.Label>
                            <Form.Range id="size" disabled={this.props.running} onChange={(e) => this.setSize(e.target.value)} min={2} max={this.props.windowWidth} />
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                            <Form.Select ref={this.algorithm} id="algorithm" disabled={this.props.running}>
                                <option value="selection-sort">Selection sort</option>
                                <option value="bubble-sort">Bubble sort</option>
                                <option value="insertion-sort">Insertion sort</option>
                                <option value="a*">Merge sort</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="d-flex justify-content-center">
                        <Button className="px-5 py-0" variant={this.props.running ? "danger" : "warning"} onClick={() => this.updateBoard()}>New list</Button>
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