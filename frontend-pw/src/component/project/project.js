import React from "react";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import decorations from './decorations.json';
import "./project.css";


function Project() {

    return(
        <div id="projects">
            <div className="lottie-animation-left">
                <Lottie animationData={decorations} />
            </div>

            <div className="lottie-animation-right">
                <Lottie animationData={decorations} />
            </div>
            
            <div className="title">
                <h1>Projects</h1>
            </div>
            <Lottie animationData={tree1} />
        </div>
    );
}

export default Project;