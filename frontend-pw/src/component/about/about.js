import React from "react";
import Astronaut from "./images/astronot.json";
import Lottie from "lottie-react";
import aboutPhoto from "./images/aboutphoto.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faDumbbell, faHeadphonesSimple, faBasketball, faPersonSwimming, faCamera } from '@fortawesome/free-solid-svg-icons'
import "./about.css";


function About () {
    // 通过style属性动态设置背景图片

    return (
        <div id="about">
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
                    solutions in the tech industry.
                    </p>

                    <h1>What I'm doing</h1>

                    <p className="about-text">
                    I'm currently pursuing my Master degree at University of Toronto, 
                    my major study areas are Computing Engineering and Cybersecurity.
                    I'm seeking 4 or 8 months internships starting from Summer 2024.
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
            <Lottie animationData={Astronaut} />
        </div>
    );
}

export default About;

// <Lottie animationData={Astronaut} />