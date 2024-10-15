import React, { useState, useEffect } from "react";
import aboutPhoto2 from "./images/aboutphoto2.jpg";
import aboutPhoto1 from "./images/aboutphoto1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faDumbbell, faHeadphonesSimple, faBasketball, faPersonSwimming, faCamera, faFilePdf, faPersonHiking } from '@fortawesome/free-solid-svg-icons'
import { Card } from "../card/card";
import "./about.css";
import ScrollReveal from 'scrollreveal';
import Lottie from "lottie-react";
import decorations from './decorations.json';
import santa from './santa.json';
import dragonImage from './images/dragon_pic.jpg';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; 
import {
    BarChartOutlined,
  } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import CountUp from 'react-countup';


function About () {
    // State to track the current image
    const [currentImage, setCurrentImage] = useState(aboutPhoto1);
    const [viewCount, setViewCount] = useState(0);


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

    useEffect(() => {
        const fetchViewCount = async () => {
        const viewCountRef = ref(database, 'viewCount');
        const snapshot = await get(viewCountRef);
        if (snapshot.exists()) {
            setViewCount(snapshot.val());
        }
        };

        fetchViewCount();
    }, []);

    return (
        <div id="about">

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
                    <img src={currentImage} alt="aboutphoto" />
                </div>
                <div className="text">
                    {/* <h1>What I hope to do</h1>
                    
                    <p className="about-text">$_0
                    
                    </p> */}

                    <h1>What I'm doing </h1>

                    <p className="about-text">
                    I'm currently pursuing my Master degree at University of Toronto, 
                    my major study areas are Computing Engineering and Cybersecurity.
                    I'm seeking 4 months internships starting from Winter 2025 & Summer 2025. <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFilePdf} /></a>
                    </p>

                    <h1>When I'm not coding, you can find me</h1>

                    <p className="about-text">
                    <FontAwesomeIcon icon={faPassport} /> Travelling | <FontAwesomeIcon icon={faBasketball} /> Basketball | <FontAwesomeIcon icon={faDumbbell} /> Lifting | <FontAwesomeIcon icon={faHeadphonesSimple} /> Spotifying |

                    </p>
                    <p className="about-text">
                    <FontAwesomeIcon icon={faPersonSwimming} /> Swimming | <FontAwesomeIcon icon={faCamera} /> Photographing | <FontAwesomeIcon icon={faPersonHiking} /> Hiking |
                    </p>
                    <Flex wrap>
                    <Tag icon={<BarChartOutlined />} color="#55acee">
                    <CountUp end={viewCount} duration={2} separator="," />
                    {' '}views
                    </Tag>
                    </Flex>
                </div>
            </div>
            <div className="boxcol">
                <Card
                    title={"Toolbox"}
                    description={"Programming Languages: C/C++, Rust, Python, JavaScript\nDeveloper Tools: CMake, Git, Docker, Kubernetes\nFrameworks: GTest, React, Django, Cypress, Jest, Material-UI, Ant-Design\nLibraries: pandas, NumPy, Matplotlib, D3.js, ReactFlow, Mininet"}
                    
                />
                <Card
                    title={"Learning"}
                    description={"FALL 2024 :\nCSC2234H Database System Technology\nECE1747H Parallel Programming\nECE1724H Performant Software Systems with Rust\nSUMMER 2024 :\nAPS1052H Neural Network & Deep Learning\nWINTER 2024 :\nECE1779H S (Winter) Introduction to Cloud Computing\nECE568H1 S (Winter) Computer Security"}                
                />
                <Card
                    title={"Interests"}
                    description={"1) Database Design\n2) Compiler Optimization\n3) Cybersecurity \n4) Making this homepage more accessible"}                
                />
            </div>
            
        </div>
    );
}

export default About;

