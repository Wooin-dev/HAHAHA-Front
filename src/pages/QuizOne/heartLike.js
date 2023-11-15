import React from 'react';

function HeartLike(props) {

    const baseStyle = "transition-colors duration-300 flex justify-center w-24 h-24 mx-auto my-5 rounded-full ";

    return (
        <div>
            <div
                className={`${baseStyle} ${props.isLiked ? "font-bold bg-gradient-to-t from-yellow-400 to-yellow-100 shadow-xl shadow-red-50"
                    : "border-gray-200 border-[1px] bg-gray-50"}`}
                onClick={() => {
                    props.onClickHandler();
                }}>
                <div className="flex flex-col items-center justify-center">
                    <p className={`transition-transform transform origin-center m-1.5 ${
                        props.isLiked ? 'scale-150' : 'scale-100'
                    }`}>&#128518;</p>
                    <div>{props.likeCnt}</div>
                </div>
            </div>
            {/*<div className="mx-auto w-18 text-center">*/}
            {/*    {props.isLiked ? "푸하하!!" : "..."}*/}
            {/*</div>*/}
        </div>
    );
}

export default HeartLike;