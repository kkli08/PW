import React, { useState, useEffect } from "react";
import aboutPhoto from "./images/aboutphoto.jpg";
import aboutPhoto1 from "./images/aboutphoto1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faDumbbell, faHeadphonesSimple, faBasketball, faPersonSwimming, faCamera, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Card } from "../card/card";
import "./about.css";
import ScrollReveal from 'scrollreveal';
import Lottie from "lottie-react";
import decorations from './decorations.json';
import santa from './santa.json';
import dragonImage from './images/dragon_pic.jpg';
function About () {
    // State to track the current image
    const [currentImage, setCurrentImage] = useState(aboutPhoto1);

    useEffect(() => {
        // Set up an interval to switch the image every hour (3600000 milliseconds)
        const interval = setInterval(() => {
            setCurrentImage(current => (current === aboutPhoto1 ? aboutPhoto : aboutPhoto1));
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
        ScrollReveal().reveal('.boxcol', { delay: 450, origin: 'bottom' });
        ScrollReveal().reveal('.iframe-style', { delay: 450, origin: 'bottom' });
        ScrollReveal().reveal('.select-width', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.timeline-width', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.lottie-animation-right-year ', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.image-container', { delay: 250, origin: 'bottom' });
        
        // Add more ScrollReveal configurations here as needed
        // You can target elements across different components

        return () => ScrollReveal().destroy(); // Clean up
    }, []);
    // 通过style属性动态设置背景图片

    return (
        <div id="about">

            <div className="lottie-animation-left">
                <Lottie animationData={decorations} />
            </div>

            <div className="lottie-animation-right-year">
                <img src={dragonImage} alt="Dragon" />
            </div>

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
                    <h1>What I hope to do</h1>
                    
                    <p className="about-text">I aspire to become a  
                    Software Engineer / Cybersecurity Engineer. 
                    My commitment to integrity and protecting people's privacy and 
                    virtual assets drives my passion for developing robust cybersecurity/software solutions.
                    I am eager to apply my skills to safeguard information, 
                    uphold ethical standards, and contribute effectively to the evolving field of cybersecurity.
                    </p>

                    <h1>What I'm doing </h1>

                    <p className="about-text">
                    I'm currently pursuing my Master degree at University of Toronto, 
                    my major study areas are Computing Engineering and Cybersecurity.
                    I'm seeking 4 months internships starting from Summer 2024 & Summer 2025. <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFilePdf} /></a>
                    </p>

                    <h1>When I'm not coding, you can find me</h1>

                    <p className="about-text">
                    <FontAwesomeIcon icon={faPassport} /> Travelling | <FontAwesomeIcon icon={faBasketball} /> Basketball | <FontAwesomeIcon icon={faDumbbell} /> Working out | <FontAwesomeIcon icon={faHeadphonesSimple} /> Sportifying |

                    </p>
                    <p className="about-text">
                    <FontAwesomeIcon icon={faPersonSwimming} /> Swimming | <FontAwesomeIcon icon={faCamera} /> Photographing | 
                    </p>
                </div>
            </div>
            <div className="boxcol">
                <Card
                    title={"Toolbox"}
                    description={"Languages: C++, C, Python, Java, JavaScript, RISC-V\nFramework: Django, React, React Flow, D3.js, Spring\nDeployment/Cloud Tools: Docker, K8s, AWS, Nginx, Gunicorn, Git\nOS: Linux, Bash\nOther: Experienced with SDN, TCP, Ethernet Protocol"}
                    
                />
                <Card
                    title={"Learning"}
                    description={"WINTER 2024:\nECE1779H S (Winter) Introduction to Cloud Computing\nECE568H1 S (Winter) Computer Security\nSUMMER 2024:\nAPS1080H Y (Full Session) Introduction to Reinforcement Learning\nAPS1050H Y (Full Session) Blockchain Technologies and Cryptocurrencies\n"}                
                />
                <Card
                    title={"Hacking On"}
                    description={"1) System Design\n2) Design Patterns\n3) Cybersecurity \n4) Cloud Computing\n5) Making this homepage more accessible"}                
                />
            </div>
            
        </div>
    );
}

export default About;

