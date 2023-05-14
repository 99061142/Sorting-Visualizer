import { createRef, useEffect, useState } from "react";

function Cell({ width, index }) {
    const element = createRef(null);
    const [number, setNumber] = useState(0)

    // Update the setNumber state when the dataset 'number' gets changed
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const DATASET_NUMBER = Number(mutation.target.dataset.number);
                setNumber(DATASET_NUMBER)
            }
        });

        observer.observe(element.current, {
            attributeFilter: ['data-number'],
        });
    }, [element]);

    return (
        <div
            ref={element}
            id={'cell-' + index}
            data-number={number}
            style={{
                backgroundColor: '#007bff',
                width,
                height: number
            }}
        >
            {width >= 40 && number >= 20 &&
                <p
                    className='text-center mb-0'
                >
                    {number}
                </p>
            }
        </div >
    );
}

export default Cell;