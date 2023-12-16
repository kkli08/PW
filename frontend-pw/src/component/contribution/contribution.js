import React from "react";
import "./contribution.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Contribution() {

    return(
        <div id="contribution">
            <div className="title">
                <p>Inspired by many <FontAwesomeIcon icon={faHeart} /> Powered by React, AWS</p>
                <p>Coded by Damian Li</p>
            </div>
        </div>
    );
}

export default Contribution;