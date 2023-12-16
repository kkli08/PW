import React from "react";
import Astronaut from "./images/astronot.json";
import Lottie from "lottie-react";
import aboutPhoto from "./images/aboutphoto.jpg";
import "./about.css";


function About () {
    // 通过style属性动态设置背景图片
    const photoStyle = {
        backgroundImage: `url(${aboutPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // 设定图片的高度和宽度
        width: '100%', // 或者是 '30vw' 根据需要
        height: '100%' // 或者是 '20vw' 根据需要
    };

    return (
        <div id="about">
            <div className="title">
                <h1>About Me</h1>
            </div>
            <div className="about-description">
                <div className="photo" style={photoStyle}></div>
                <div className="text">
                    <h1>What I hope to do</h1>
                    
                    <p className="about-text">I aspire to become a distributed system engineer 
                    or software development engineer, driven by my passion for creating innovative 
                    solutions in the tech industry.</p>
                </div>
            </div>
            <Lottie animationData={Astronaut} />
        </div>
        // <div id="about">
        //     <div className="title">
        //         <h1>About Me</h1>
        //     </div>
        //     <div className="about-description">
        //             <h1>What I hope to do</h1>
        //             <p className="about-text">I aspire to become a distributed system engineer 
        //             or software development engineer, driven by my passion for creating innovative 
        //             solutions in the tech industry.</p>
        //     </div>
            
            
            
        // </div>
    );
}

export default About;

// <Lottie animationData={Astronaut} />