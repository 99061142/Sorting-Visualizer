import { Component } from "react";
import { Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import { Form } from "react-bootstrap";

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            speed: 50
        };
    }

    run() {

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

    refresh() {
        // Refresh the page
        window.location.reload();
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
                            <Form.Label className="text-white" htmlFor="speed">Size</Form.Label>
                            <Form.Range id="speed" disabled={this.state.running} />
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true}>
                        <Form.Group>
                            <Form.Label className="text-white" htmlFor="algorithm">Algorithm</Form.Label>
                            <Form.Select id="algorithm" onChange={(element) => this.setAlgorithm(element.target.value)} disabled={this.state.running}>
                                <option value="selection-sort">Selection sort</option>
                                <option value="bubble-sort">Bubble sort</option>
                                <option value="insertion-sort">Insertion sort</option>
                                <option value="a*">Merge sort</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xs={4} lg={true} className="d-flex justify-content-center">
                        <Button variant={this.state.running ? "danger" : "warning"}>Generate new array</Button>
                    </Col>
                    <Col xs={4} lg={true} className="d-flex justify-content-center">
                        <Button className="px-5 py-0" variant={this.state.running ? "danger" : "success"} onClick={() => this.run()}>Run</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Settings;