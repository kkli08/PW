import React, { useState } from "react";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import decorations from './decorations.json';
import { Select } from 'antd';
import { Card } from "../card/card";

import "./project.css";
import habotImage from './project_cover/habot.png';
import veImage from './project_cover/ve.jpg';
import sdImage from './project_cover/sd.jpg';
import hpImage from './project_cover/hp.jpg';
import cliImage from './project_cover/clishell.png';
import ssImage from './project_cover/ss.png';
import stopandwaitImage from './project_cover/stopandwait.jpeg';
import wirelessNetworkImage from './project_cover/wirelessnetwork.png';
import pokergameImage from './project_cover/pokergame.png';
import riscv_arm from './project_cover/RISCV_ARM_Architecture.jpeg';
import sdn from './project_cover/Traditional-networking-versus-SDN-networking.png';
// Define the card data
const webApplicationCards = [
    { 
        title: 'Software Defined Network Performance Analysis', 
        description: 'This application visualize the SDN network, let user build their own sdn network topology and see the simulation performance of their own defined network.\n\nClick the picture to visit the site\n\nTool Use: Mininet, React, ReactFlow, JavaScript, AWS EC2, Django, Python, Ant Design', 
        imgSrc: sdn, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://production-aws.d3du2w0lk3c8e3.amplifyapp.com/',
    },
    { 
        title: 'Vocabulary Explorer', 
        description: 'An online visualization dictionary that allows users to expand or collapse different semantic classes through the form of a tree in order to see which word(s) fall under that category, and the relationships between categories.\n\nTool Use: React, D3.js, JavaScript, AWS, Docker, Github, MKDoc, Figma', 
        imgSrc: veImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://www.youtube.com/watch?v=0xyK7al-No4',
    },
    { 
        title: 'Social Distribution', 
        description: 'An web application, enable user engagement and social sharing, including the ability to share posts, comment and like posts, and follow preferred users.\n\nTool Use: Django, React, PostgreSQL, Django REST Framework', 
        imgSrc: sdImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/CMPUT404F22ProjectTeam/WebApplicationProject/wiki',
    },
    { 
        title: 'My Home Page', 
        description: 'Tool Use: React, Ant Design, AWS, Github', 
        imgSrc: hpImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://www.damianli.com/',
    },
    // ... more cards
];

const mobileApplicationCards = [
    { 
        title: 'Habot', 
        description: 'An android application that aims to help people record their daily habits, including adding, deleting, changing habits, and presenting the habits of the day separately.\n\nTool Use: Java, Android Studio, Github, Firebase, Figma', 
        imgSrc: habotImage, // 图片的路径
        imgAlt: 'Mobile App 1 Image',// 图片的替代文本
        link: 'https://github.com/CMPUT301F21T24/Habot/wiki/Part4-StoryBoard',
    },
    // ... more cards
];

const linuxSystemCards = [
    { 
        title: 'CLI Shell', 
        description: 'Individual project. Designed and developed a custom command-line interface utilizing C programming language and Linux operating system to enhance user interaction and efficiency. Demonstrated mastery in software development by implementing functionalities such as process inspection, creation, termination and resume.\n\nTool Use: C, Bash', 
        imgSrc: cliImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/CLI-Shell',
    },
    { 
        title: 'Socket_Server', 
        description: 'Individual project. Developed a cutting-edge client-server interaction simulation utilizing advanced C programming and socket API. Demonstrated exceptional software engineering skills by enabling the server to process and respond to multiple client requests and information concurrently with high efficiency through multi-threading.\n\nTool Use: C, Bash, Socket API', 
        imgSrc: ssImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/Socket_Server',
    },
    // ... more cards
];

const networkProtocols = [
    { 
        title: 'Software Defined Network Performance Analysis', 
        description: 'This application visualize the SDN network, let user build their own sdn network topology and see the simulation performance of their own defined network.\n\nClick the picture to visit the site\n\nTool Use: Mininet, React, ReactFlow, JavaScript, AWS EC2, Django, Python, Ant Design', 
        imgSrc: sdn, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://production-aws.d3du2w0lk3c8e3.amplifyapp.com/',
    },
    { 
        title: 'Wireless Network Communication', 
        description: 'This project involves the development of a TCP-like protocol simulation using the CNET network simulator. The primary goal is to facilitate efficient and reliable message transmission in a simulated wireless network environment. This environment consists of mobile nodes and access points (anchors), where communication is based on transmitting, forwarding, and acknowledging messages.\n\nTool Use: C, Makefile, Cnet', 
        imgSrc: wirelessNetworkImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/Wireless-Network-Communication-Simulation-using-CNET',
    },
    { 
        title: 'Enhanced Stop and Wait Protocol', 
        description: 'This project involves enhancing the traditional stop-and-wait data link protocol for reliable communication in a simulated network environment using the CNET simulator. The primary objective is to ensure reliable transmission between two nodes in a network by handling data and acknowledgment frames effectively. The protocol is designed to work in a setting where piggybacking and negative acknowledgements are not utilized, focusing instead on the core functionality of stop-and-wait mechanisms.\n\nTool Use: C, Cnet, Makefile', 
        imgSrc: stopandwaitImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/Enhanced-Stop-and-Wait-Protocol-for-Reliable-Data-Transmission-in-Network-Simulation',
    },
    // ... more cards
];

const gameStrategy = [
    { 
        title: '2-Player Poker Games', 
        description: 'Blackjack (GUI)\nWho Runs Fast \n\nTool Use: Python, PyQt5', 
        imgSrc: pokergameImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/WhoRunsFast',
    },
];

const assembleLanguage = [
    { 
        title: 'RISC-V to ARM Instruction Set Translator', 
        description: 'This project involves the development of an assembly language program that efficiently translates RISC-V instructions into equivalent ARM instructions. The primary objective is to create a software bridge enabling the execution of RISC-V code on ARM-based architectures, broadening the applicability of RISC-V programs.', 
        imgSrc: riscv_arm, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/RISCV_ARM_Transition',
    },
];

function Project() {
    const [cards, setCards] = useState(networkProtocols);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        switch (value) {
            case 'Web_Application':
                setCards(webApplicationCards);
                break;
            case 'Mobile_Application':
                setCards(mobileApplicationCards);
                break;
            case 'Linux_System':
                setCards(linuxSystemCards);
                break;
            case 'Network_Protocols':
                setCards(networkProtocols);
                break;
            case 'Game_Strategy':
                setCards(gameStrategy);
                break;
            case 'Assemble_Language':
                setCards(assembleLanguage);
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
                defaultValue="Network"
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
                    // {
                    //     label: 'CyberSecurity',
                    //     value: 'CyberSecurity',
                    // },
                    {
                        label: 'Game Strategy',
                        value: 'Game_Strategy',
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
                        label: 'Network',
                        value: 'Network_Protocols',
                    },
                    {
                        label: 'Assembly Language',
                        value: 'Assemble_Language',
                    },
                    // {
                    //     label: 'Distributed System',
                    //     value: 'Distributed_System',
                    // },
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

            {/* <Lottie animationData={tree1} /> */}
        </div>
    );
}

export default Project;