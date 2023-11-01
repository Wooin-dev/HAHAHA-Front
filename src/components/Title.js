import React from 'react';

function Title(props) {
    return (
        <h1 className="
            text-4xl font-bold text-center
            m-auto p-16
            ">
            {props.title}
        </h1>
    );
}

export default Title;