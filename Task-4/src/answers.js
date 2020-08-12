import React from 'react';
import Answer from './answer';

// renders all the options  -- paragraph tags prints approppriate messgae -- Select/Confirm option
function Answers (props) {
    return (
        <>
            <div className="Answers">
                <Answer letter='a' option={props.options[0]}  selected={props.currentA === 'a'} buttonClick={props.buttonClick} />
                <Answer letter='b' option={props.options[1]}  selected={props.currentA === 'b'} buttonClick={props.buttonClick}/>
                <Answer letter='c' option={props.options[2]}  selected={props.currentA === 'c'} buttonClick={props.buttonClick}/>
                <Answer letter='d' option={props.options[3]}  selected={props.currentA === 'd'} buttonClick={props.buttonClick}/>

                
                <p>{props.currentA === '' ? "Select an Option" : `Is ( ${props.currentA} ) your final answer?`}</p>
            </div>
        </>
    );
}

export default Answers;