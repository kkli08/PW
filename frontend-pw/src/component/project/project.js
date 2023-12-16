import React from "react";
import Astronaut from "./astronot.json";
import Lottie from "lottie-react";
import "./project.css";


function Project() {

    return(
        <div id="projects">
            <div className="title">
                <h1>Projects</h1>
            </div>
            <Lottie animationData={Astronaut} />
        </div>
    );
}

export default Project;