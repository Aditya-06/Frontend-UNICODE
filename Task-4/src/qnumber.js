import React, { useState } from 'react';


// prints the heading displaying information about the progress of user (Eg: 3/5)
function Qnumber (props) {
    return (
    <h3>Question {props.currentQ} of {props.total}</h3>
    );
}

export default Qnumber;