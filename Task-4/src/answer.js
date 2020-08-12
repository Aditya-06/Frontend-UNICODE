import React from 'react';

// responsible for rendering the individual options
function Answer(props) {

    // pushes class 'selected' if the option is selected (Style change)
    let classes = ['answer'];
    if (props.selected) {
        classes.push('selected');
    }

    // returns an individual option
    return(
        <button value={props.letter} className={classes.join(' ')} onClick={props.buttonClick}>
            {props.letter}. {props.option}
        </button>
    )
}


export default Answer;