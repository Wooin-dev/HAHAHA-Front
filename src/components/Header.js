import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link style={{display: 'flex', alignItems: 'center'}} to='/'>
                        Go to home
                    </Link>
                    <ul>
                        <li>
                            <Link className='header-nav-item' to='/quiz'>
                                퀴즈
                            </Link>
                        </li>
                        <li>
                            <Link className='header-nav-item' to='/rank'>
                                아재왕
                            </Link>
                        </li>
                        <li>
                            <Link className='header-nav-item' to='/my-page'>
                                마이페이지
                            </Link>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    )
}