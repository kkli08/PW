import React from "react";
import "./gallery.css";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
function Gallery() {

    return(
        <div id="gallery">
            <div className="gallerytitle">
                <h1>
                Welcome to My Gallery
                </h1>
                <p>(Under Construction)</p>
                <p> : ) </p>
                <Lottie animationData={tree1} />
            </div>
        </div>
    );
}

export default Gallery;