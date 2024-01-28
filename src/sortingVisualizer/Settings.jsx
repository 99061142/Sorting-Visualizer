import { Component, createRef } from "react";
import { Col, Container, Row, Dropdown, DropdownMenu, Button, DropdownItem, FormGroup, FormLabel } from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import FormRange from "react-bootstrap/FormRange";
import Run from "./Run";
import "./styling/settings.scss";

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            running: false,
            algorithmIndex: 3
        };
        this._algorithms = [
            "Insertion Sort",
            "Bubble Sort",
            "Selection Sort",
            "Merge Sort",
            "Bogo Sort"
        ];
        this.speedRangeRef = createRef(null);
        this.boardSizeRangeRef = createRef(null);
    }

    algorithmChanged(algorithmIndex) {
        // If the algorithm isn't changed, return
        if (algorithmIndex === this.state.algorithmIndex) return

        // Set the algorithm index
        this.setState({
            algorithmIndex
        });

        // Randomize every cell number
        this.props.board.current.randomize();
    }

    setRunning = (bool) => {
        // Set if the algorithm is running
        this.setState({
            running: bool
        });
    }

    get algorithm() {
        // Return the algorithm name
        const algorithm = this._algorithms[this.state.algorithmIndex];
        return algorithm
    }

    boardSizeChanged(ev) {
        const size = Number(ev.target.value);

        // If the board size isn't changed, return
        const board = this.props.board.current;
        if (size === board.state.size) return

        // Randomize the numbers on the board
        board.randomize();

        // Change the board size
        board.size = size;
    }

    getSleepMS = () => {
        // Return the amount of MS the algorithm needs to sleep when needed
        const speedRangeRef = this.speedRangeRef.current
        const maxSpeed = Number(speedRangeRef.max);
        const currentSpeed = Number(speedRangeRef.value);
        const ms = maxSpeed - currentSpeed + 1;
        return ms
    }

    render() {
        return (
            <Container
                className="bg-dark py-3"
                fluid
            >
                <Row
                    className="d-flex align-items-center"
                >
                    <Dropdown
                        as={Col}
                        xs={4}
                        lg={true}
                        onSelect={(algorithmIndex) => this.algorithmChanged(Number(algorithmIndex))}
                    >
                        <DropdownToggle
                            id="algorithms"
                            className={
                                "w-100 m-0 text-center btn btn-dark" +
                                (this.state.running ? " text-danger" : '')
                            }
                            disabled={this.state.running}
                        >
                            Algorithms
                        </DropdownToggle>
                        <DropdownMenu>
                            {this._algorithms
                                .map((algorithm, i) =>
                                    <DropdownItem
                                        as={Button}
                                        active={this.state.algorithmIndex === i}
                                        eventKey={i}
                                        key={i}
                                    >
                                        {algorithm}
                                    </DropdownItem>
                                )}
                        </DropdownMenu>
                    </Dropdown>
                    {this.props.boardComponentMounted &&
                        <FormGroup
                            as={Col}
                            xs={4}
                            lg={true}
                        >
                            <FormLabel
                                className="text-white"
                                htmlFor="size"
                            >
                                Size
                            </FormLabel>
                            <FormRange
                                ref={this.boardSizeRangeRef}
                                id="size"
                                style={{
                                    touchAction: "none"
                                }}
                                disabled={this.state.running}
                                min={this.props.board.current.minSize}
                                max={this.props.board.current.maxSize}
                                onPointerUp={(ev) => this.boardSizeChanged(ev)}
                                onMouseUp={(ev) => this.boardSizeChanged(ev)}
                            />
                        </FormGroup>
                    }
                    <FormGroup
                        as={Col}
                        xs={4}
                        lg={true}
                    >
                        <FormLabel
                            className="text-white"
                            htmlFor="speed"
                        >
                            Speed
                        </FormLabel>
                        <FormRange
                            ref={this.speedRangeRef}
                            id="speed"
                            min={1}
                            max={100}
                        />
                    </FormGroup>
                    {this.props.boardComponentMounted &&
                        <Col
                            xs={7}
                            lg={true}
                        >
                            <Run
                                speedRangeRef={this.speedRangeRef}
                                setRunning={this.setRunning}
                                algorithm={this.algorithm}
                                running={this.state.running}
                                board={this.props.board}
                                boardSize={this.state.boardSize}
                                getSleepMS={this.getSleepMS}
                            />
                        </Col>
                    }
                    <Col
                        xs={5}
                        lg={true}
                        className="d-flex justify-content-center"
                    >
                        <Button
                            className="w-100"
                            style={{
                                backgroundColor: this.state.running ? "#dc3545" : "#ffc107",
                                border: "transparent"
                            }}
                            disabled={this.state.running}
                            onClick={() => this.props.board.current.randomize()}
                        >
                            Randomize board
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Settings;