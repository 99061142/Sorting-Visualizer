import { Button, Container, Row, Col, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import FormRange from 'react-bootstrap/esm/FormRange';
import { createRef, useState, useEffect } from 'react';
import Run from './run';
import RandomizeBoard from './randomizeBoard';

function Settings({ setBoardSize }) {
    const [running, setRunning] = useState(false);
    const boardSizeRange = createRef(null);
    const algorithm = createRef(null);

    const run = async () => {
        setRunning(true);
        await Run({
            algorithmName: algorithm.current.value
        });
        setRunning(false);
    }

    const boardSizeChanged = () => {
        const BOARD_SIZE = Number(boardSizeRange.current.value);
        setBoardSize(BOARD_SIZE);
    }

    // When the component is created, set the board size as the default value as the size range
    useEffect(() => {
        boardSizeChanged();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            className='bg-dark py-3'
            fluid
        >
            <Row>
                <FormGroup
                    as={Col}
                    xs={6}
                    lg={true}
                >
                    <FormLabel
                        className='text-white'
                        htmlFor='speed'
                    >
                        Speed
                    </FormLabel>
                    <FormRange
                        id='speed'
                        max={99}
                    />
                </FormGroup>
                <FormGroup
                    as={Col}
                    xs={6}
                    lg={true}
                >
                    <FormLabel
                        className='text-white'
                        htmlFor='boardSize'
                    >
                        Numbers
                    </FormLabel>
                    <FormRange
                        ref={boardSizeRange}
                        disabled={running}
                        min={2}
                        max={Math.floor(window.innerWidth * .25)}
                        defaultValue={Math.floor(window.innerWidth * .024)}
                        onMouseUp={boardSizeChanged}
                        onPointerUp={boardSizeChanged}
                    />
                </FormGroup>
                <FormGroup
                    as={Col}
                    xs={4}
                    lg={true}
                >
                    <FormLabel
                        className='text-white'
                        htmlFor='algorithm'
                    >
                        Algorithm
                    </FormLabel>
                    <FormSelect
                        ref={algorithm}
                        disabled={running}
                        defaultValue='insertion-sort'
                        onChange={RandomizeBoard}
                    >
                        <option value='selection-sort'>Selection sort</option>
                        <option value='bubble-sort'>Bubble sort</option>
                        <option value='insertion-sort'>Insertion sort</option>
                    </FormSelect>
                </FormGroup>
                <Col
                    xs={4}
                    lg={true}
                    className='d-flex justify-content-center'
                >
                    <Button
                        id='randomizeBoard'
                        className='px-5 py-0'
                        variant={running ? 'danger' : 'warning'}
                        disabled={running}
                        onClick={() => RandomizeBoard()}
                    >
                        New board
                    </Button>
                </Col>
                <Col
                    xs={4}
                    lg={true}
                    className='d-flex justify-content-center'
                >
                    <Button
                        className='px-5 py-0'
                        variant={running ? 'danger' : 'success'}
                        disabled={running}
                        onClick={() => run()}
                    >
                        Run
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Settings;