import React from 'react';

function Title(props) {
    return (
        <div className="p-5 text-center mb-5">
            <h1 className="
            text-4xl font-bold
            m-auto my-5
            ">
                {props.title}
            </h1>
            <h3 className="
            text-gray-700
            ">
                {props.subtitle}
            </h3>
        </div>
    );
}

export default Title;