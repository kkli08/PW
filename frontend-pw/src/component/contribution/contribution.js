import React from "react";
import "./contribution.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Contribution() {

    return(
        <div id="contribution">
            <div className="contributiontitle">
                <p><FontAwesomeIcon icon={faHeart} /> Inspired by many, coded by Ke Li</p>
                <p>damianli.com All rights reserved. © 2025</p>
            </div>
        </div>
    );
}

export default Contribution;