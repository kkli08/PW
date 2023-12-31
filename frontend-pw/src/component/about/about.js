import React, { useEffect } from "react";
import aboutPhoto from "./images/aboutphoto.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faDumbbell, faHeadphonesSimple, faBasketball, faPersonSwimming, faCamera, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { Card } from "../card/card";
import "./about.css";
import ScrollReveal from 'scrollreveal';
import Lottie from "lottie-react";
import decorations from './decorations.json';
import santa from './santa.json';

function About () {
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
        ScrollReveal().reveal('.select-width', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.timeline-width', { delay: 250, origin: 'left' });
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

            <div className="lottie-animation-right">
                <Lottie animationData={santa} />
            </div>

            <div className="lottie-animation-right">
                <Lottie animationData={decorations} />
            </div>

            <div className="title">
                <h1>About Me</h1>
            </div>
            <div className="about-description">
                
                <div className="photo">
                    <img src={aboutPhoto} alt="aboutphoto" />
                </div>
                <div className="text">
                    <h1>What I hope to do</h1>
                    
                    <p className="about-text">I aspire to become a distributed system engineer 
                    / software development engineer, driven by my passion for creating innovative 
                    solutions.
                    </p>

                    <h1>What I'm doing </h1>

                    <p className="about-text">
                    I'm currently pursuing my Master degree at University of Toronto, 
                    my major study areas are Computing Engineering and Cybersecurity.
                    I'm seeking 4 or 8 months internships starting from Summer 2024. <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFilePdf} /></a>
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
                    description={"Languages: C++, C, Python, Java, JavaScript, RISC-V\nFramework: Django, React.js, D3.js, Spring\nDeployment Tools: Docker, AWS, Nginx, Gunicorn, Git\nOS: Linux, Bash\nOther: Experienced with TCP, Ethernet Protocol"}
                    
                />
                <Card
                    title={"Learning"}
                    description={"WINTER 2024:\nECE1755H S (Winter) Parallel Computer Architecture and Programming\nECE1776H S (Winter) Computer Security, Cryptography and Privacy\nECE1779H S (Winter) Introduction to Cloud Computing\nECE568H1 S (Winter) Computer Security\n"}                
                />
                <Card
                    title={"Hacking On"}
                    description={"1) System Design\n2) Design Patterns\n3) School projects\n4) Leetcoding for interview\n5) Making this homepage more accessible"}                
                />
            </div>
            
        </div>
    );
}

export default About;

