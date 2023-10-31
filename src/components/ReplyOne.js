import React from 'react';

function ReplyOne(props) {

    const CreatedAt = () => {
        return (
            <div className="text-xs">
                {props && props.createdAt ? (
                    <div>
                        <p>{props.createdAt.slice(0, 10)} {props.createdAt.slice(11, 19)}</p>
                    </div>
                ) : (
                    <div>
                        <p></p>
                    </div>
                )}
            </div>
        )
    }


    return (
        <div className="Quiz-Contents-Section
            overflow-hidden whitespace-no-wrap">
            <div className="flex items-baseline space-x-2 mb-1.5">
                <div className="text-xs font-bold">
                    <span>{props.author}</span>
                </div>
                <CreatedAt/>
            </div>
            <div className="text-sm">
                <p className="">{props.contents}</p>
            </div>

        </div>
    );
}

export default ReplyOne;