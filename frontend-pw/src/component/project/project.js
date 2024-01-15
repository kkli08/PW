import React, { useState } from "react";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import decorations from './decorations.json';
import { Select } from 'antd';
import { Card } from "../card/card";

import "./project.css";
import habotImage from './project_cover/habot.png';
import veImage from './project_cover/ve.png';

// Define the card data
const webApplicationCards = [
    { 
        title: 'Web Application - Vocabulary Explorer', 
        description: 'An online visualization dictionary that allows users to expand or collapse different semantic classes through the form of a tree in order to see which word(s) fall under that category, and the relationships between categories.\n\nTool Use: React, D3.js, JavaScript, AWS, Docker, Github, MKDoc, Figma', 
        imgSrc: veImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://www.youtube.com/watch?v=0xyK7al-No4',
    },
    { 
        title: 'Web Application - ', 
        description: '\n\nTool Use: ', 
        imgSrc: habotImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: '',
    },
    { 
        title: 'Web Application - ', 
        description: '\n\nTool Use: ', 
        imgSrc: habotImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: '',
    },
    { 
        title: 'Web Application - ', 
        description: '\n\nTool Use: ', 
        imgSrc: habotImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: '',
    },
];

const mobileApplicationCards = [
    { 
        title: 'Android Application - Habot', 
        description: 'An android application that aims to help people record their daily habits, including adding, deleting, changing habits, and presenting the habits of the day separately.\n\nTool Use: Java, Android Studio, Github, Firebase, Figma', 
        imgSrc: habotImage, // 图片的路径
        imgAlt: 'Mobile App 1 Image',// 图片的替代文本
        link: 'https://github.com/CMPUT301F21T24/Habot/wiki/Part4-StoryBoard',
    },
    // ... more cards
];


function Project() {
    const [cards, setCards] = useState(webApplicationCards);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        switch (value) {
            case 'Web_Application':
                setCards(webApplicationCards);
                break;
            case 'Mobile_Application':
                setCards(mobileApplicationCards);
                break;
            // ... handle other cases
            default:
                setCards([]);
        }
        };

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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Select
                defaultValue="Web Application"
                className="select-width"
                onChange={handleChange}
                options={[
                {
                    label: 'Team Projects',
                    options: [
                    {
                        label: 'Web Application',
                        value: 'Web_Application',
                    },
                    {
                        label: 'Mobile Application',
                        value: 'Mobile_Application',
                    },
                    {
                        label: 'CyberSecurity',
                        value: 'CyberSecurity',
                    },
                    ],
                },
                {
                    label: 'Individual Projects',
                    options: [
                    {
                        label: 'Linux System',
                        value: 'Linux_System',
                    },
                    {
                        label: 'Network Protocols',
                        value: 'Network_Protocols',
                    },
                    {
                        label: 'Distributed System',
                        value: 'Distributed_System',
                    },
                    ],
                },
                ]}
            />
            </div>

            <div className="boxcol">
                {cards.map((card, index) => (
                    <Card 
                        key={index} 
                        title={card.title} 
                        description={card.description} 
                        imgSrc={card.imgSrc}
                        imgAlt={card.imgAlt}
                        link={card.link}
                    />
                ))}
            </div>

            <Lottie animationData={tree1} />
        </div>
    );
}

export default Project;