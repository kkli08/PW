import React from "react";
import "./blogdetail.css";
import tree1 from "./tree.json";
import Lottie from "lottie-react";

function Blogdetail() {

    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                Welcome to My Blog
                </h1>
                <p>(Under Construction)</p>
                <p> : ) </p>
                <Lottie animationData={tree1} />
            </div>
        </div>
    );
}

export default Blogdetail;