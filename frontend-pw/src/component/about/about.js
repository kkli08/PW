import React, { useState, useEffect } from "react";
import aboutPhoto2 from "./images/aboutphoto2.jpg";
import aboutPhoto1 from "./images/aboutphoto1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faDumbbell, faHeadphonesSimple, faBasketball, faPersonSwimming, faCamera, faFilePdf, faPersonHiking, faPersonSnowboarding } from '@fortawesome/free-solid-svg-icons'
import { Card } from "../card/card";
import "./about.css";
import ScrollReveal from 'scrollreveal';
import Lottie from "lottie-react";
import decorations from './decorations.json';


function About () {
    // State to track the current image
    const [currentImage, setCurrentImage] = useState(aboutPhoto1);


    useEffect(() => {
        // Set up an interval to switch the image every hour (3600000 milliseconds)
        const interval = setInterval(() => {
            setCurrentImage(current => (current === aboutPhoto1 ? aboutPhoto2 : aboutPhoto1));
        }, 3600000); // 3600000 milliseconds = 1 hour

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this effect runs once on mount

    useEffect(() => {
        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 200
        });
        ScrollReveal().reveal('.title', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.photo', { delay: 350, origin: 'bottom' });
        ScrollReveal().reveal('.text ', { delay: 450, origin: 'right' });
        // ScrollReveal().reveal('.mobile-menu ', { delay: 450, origin: 'right' });
        ScrollReveal().reveal('.boxcol', { delay: 450, origin: 'bottom' });
        ScrollReveal().reveal('.iframe-style', { delay: 450, origin: 'bottom' });
        ScrollReveal().reveal('.select-width', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.timeline-width', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.lottie-animation-right-year ', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.image-container', { delay: 250, origin: 'bottom' });
        ScrollReveal().reveal('.ProListdetails', { delay: 250, origin: 'bottom' });

        
        // Add more ScrollReveal configurations here as needed
        // You can target elements across different components

        return () => ScrollReveal().destroy(); // Clean up
    }, []);
    // 通过style属性动态设置背景图片

    return (
        <div className="about-content">

            <div className="lottie-animation-left">
                <Lottie animationData={decorations} />
            </div>

            {/* <div className="lottie-animation-right-year">
                <img src={dragonImage} alt="Dragon" />
            </div> */}

            <div className="lottie-animation-right">
                <Lottie animationData={decorations} />
            </div>

            <div className="title">
                <h1>About Me</h1>
            </div>
            <div className="about-description">
                
                <div className="photo">
                    <img src={currentImage} alt="Ke Li" loading="lazy" decoding="async" />
                </div>
                <div className="text">
                    <h1>What I hope to do</h1>
                    
                    <p className="about-text">In the next 20 years, I hope to achieve three ambitious goals: 
                        sailing around the world, climbing K2 and spending rest of my life with Olivia.         
                    </p>

                    <h1>What I'm doing </h1>

                    <p className="about-text">
                    I'm currently working at XPENG ROBOTICS on reinforcement learning post-training infrastructure, with a focus on scalable training, rollout, evaluation, and the systems that make experiments reliable.
                    </p>
                    <p className="about-text">
                    Previously, I worked on the OceanBase Vector/SQL Engine team at Ant Group and studied Computer Engineering at the University of Toronto.
                    </p>
                    <p className="about-text">
                    You can find a concise overview of my background in my <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">resume <FontAwesomeIcon icon={faFilePdf} /></a>.
                    </p>

                    <h1>When I'm not coding, you can find me</h1>

                    <p className="about-text">
                    <FontAwesomeIcon icon={faPassport} /> Travelling | <FontAwesomeIcon icon={faBasketball} /> Basketball | <FontAwesomeIcon icon={faDumbbell} /> Lifting | <FontAwesomeIcon icon={faHeadphonesSimple} /> Spotifying |

                    </p>
                    <p className="about-text">
                    <FontAwesomeIcon icon={faPersonSnowboarding} /> Snowboarding | <FontAwesomeIcon icon={faPersonSwimming} /> Swimming | <FontAwesomeIcon icon={faCamera} /> Photographing | <FontAwesomeIcon icon={faPersonHiking} /> Hiking |
                    </p>
                </div>
            </div>
            <div className="boxcol">
                <Card
                    title={"Toolbox"}
                    description={"Programming Languages: C/C++, Rust, Python, JavaScript\nDeveloper Tools: CMake, Git, Docker, Kubernetes\nFrameworks: GTest, React, Django, Cypress, Jest, Material-UI, Ant-Design\nLibraries: pandas, NumPy, Matplotlib, D3.js, ReactFlow, Mininet"}
                    
                />
                <Card
                    title={"Learning"}
                    description={"FALL 2025 :\nECE 1508 Applied Deep Learning\nFALL 2024 :\nCSC2234H Database System Technology\nECE1747H Parallel Programming\nECE1724H Performant Software Systems with Rust\nSUMMER 2024 :\nAPS1052H Neural Network & Deep Learning\nWINTER 2024 :\nECE1779H S (Winter) Introduction to Cloud Computing\nECE568H1 S (Winter) Computer Security"}                
                />
                <Card
                    title={"Interests"}
                    description={"1) AI Infrastructure\n2) Database Kernel Development\n3) High-frequency Trading System \n4) Making this homepage more accessible"}                
                />
            </div>
            
        </div>
    );
}

export default About;
