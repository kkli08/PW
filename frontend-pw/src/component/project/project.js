import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
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

import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, ClockCircleFilled} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; 
import {
    BarChartOutlined,
  } from '@ant-design/icons';

// Define the card data
const webApplicationCards = [
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
        title: 'Software Defined Network Performance Analysis', 
        description: 'This application visualize the SDN network, let user build their own sdn network topology and see the simulation performance of their own defined network.\n\nClick the picture to visit the site\n\nTool Use: Mininet, React, ReactFlow, JavaScript, AWS EC2, Django, Python, Ant Design', 
        imgSrc: sdn, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://production-aws.d3du2w0lk3c8e3.amplifyapp.com/',
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
        title: 'Wireless Network Communication', 
        description: 'This project involves the development of a TCP-like protocol simulation using the CNET network simulator. The primary goal is to facilitate efficient and reliable message transmission in a simulated wireless network environment. This environment consists of mobile nodes and access points (anchors), where communication is based on transmitting, forwarding, and acknowledging messages.\n\nTool Use: C, Makefile, Cnet', 
        imgSrc: wirelessNetworkImage, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/Wireless-Network-Communication-Simulation-using-CNET',
    },
    { 
        title: 'Software Defined Network Performance Analysis', 
        description: 'This application visualize the SDN network, let user build their own sdn network topology and see the simulation performance of their own defined network.\n\nTool Use: Mininet, React, ReactFlow, JavaScript, AWS EC2, Django, Python, Ant Design', 
        imgSrc: sdn, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://production-aws.d3du2w0lk3c8e3.amplifyapp.com/',
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

const DatabaseCard = [
    
];

// const gameStrategy = [
//     { 
//         title: '2-Player Poker Games', 
//         description: 'Blackjack (GUI)\nWho Runs Fast \n\nTool Use: Python, PyQt5', 
//         imgSrc: pokergameImage, // 图片的路径
//         imgAlt: 'Image',// 图片的替代文本
//         link: 'https://github.com/kkli08/WhoRunsFast',
//     },
// ];

const assembleLanguage = [
    { 
        title: 'RISC-V to ARM Instruction Set Translator', 
        description: 'This project involves the development of an assembly language program that efficiently translates RISC-V instructions into equivalent ARM instructions. The primary objective is to create a software bridge enabling the execution of RISC-V code on ARM-based architectures, broadening the applicability of RISC-V programs.', 
        imgSrc: riscv_arm, // 图片的路径
        imgAlt: 'Image',// 图片的替代文本
        link: 'https://github.com/kkli08/RISCV_ARM_Transition',
    },
];



const handleClick = (link, isInternal) => {
    if (isInternal) {
        // Use react-router or a similar method to navigate internally
        // For example, if using react-router-dom:
        // history.push(link);
        console.log(`Navigating to internal link: ${link}`);
    } else {
        // Open external links in a new tab
        window.open(link, '_blank');
    }
    };
const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
      {text}
    </span>
    );


    const dataSource = [
        {
            title: 'Software Defined Network Performance Analysis',
            tags: ['Web Application', 'Mininet', 'React', 'AWS EC2', 'Ant Design', 'Python'],
            // icon: <IconText icon={ClockCircleFilled} text="8 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'Visualize and simulate the performance of SDN networks by allowing users to build their own SDN network topology.',
            image: sdn,
            link: 'https://production-aws.d3du2w0lk3c8e3.amplifyapp.com/',
            isInternal: false,
        },
        {
            title: 'Vocabulary Explorer',
            tags: ['Web Application', 'React', 'D3.js', 'JavaScript', 'AWS', 'Docker', 'MKDoc', 'Figma'],
            // icon: <IconText icon={ClockCircleFilled} text="5 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'An online visualization dictionary that allows users to explore and collapse different semantic classes through a tree structure, showing word relationships and category hierarchies.',
            image: veImage,
            link: 'https://www.youtube.com/watch?v=0xyK7al-No4',
            isInternal: false,
        },
        {
            title: 'Social Distribution',
            tags: ['Web Application', 'Django', 'React', 'PostgreSQL', 'Django REST Framework'],
            // icon: <IconText icon={ClockCircleFilled} text="6 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'A web application enabling user engagement and social sharing, including features like posting, commenting, liking, and following users.',
            image: sdImage,
            link: 'https://github.com/CMPUT404F22ProjectTeam/WebApplicationProject/wiki',
            isInternal: false,
        },
        {
            title: 'Habot',
            tags: ['Mobile Application', 'Java', 'Android Studio', 'Firebase', 'Figma'],
            // icon: <IconText icon={ClockCircleFilled} text="4 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'An Android application that helps users track their daily habits by adding, deleting, and viewing habits.',
            image: habotImage,
            link: 'https://github.com/CMPUT301F21T24/Habot/wiki/Part4-StoryBoard',
            isInternal: false,
        },
        {
            title: 'CLI Shell',
            tags: ['Linux System', 'C', 'Bash'],
            // icon: <IconText icon={ClockCircleFilled} text="5 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'A custom command-line interface designed to enhance user interaction with process management functionalities.',
            image: cliImage,
            link: 'https://github.com/kkli08/CLI-Shell',
            isInternal: false,
        },
        {
            title: 'Socket_Server',
            tags: ['Linux System', 'C', 'Bash', 'Socket API'],
            // icon: <IconText icon={ClockCircleFilled} text="6 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'A client-server simulation that supports multiple client requests using multi-threading and efficient server responses.',
            image: ssImage,
            link: 'https://github.com/kkli08/Socket_Server',
            isInternal: false,
        },
        {
            title: 'Wireless Network Communication',
            tags: ['Network Protocols', 'C', 'Makefile', 'Cnet'],
            // icon: <IconText icon={ClockCircleFilled} text="7 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'Simulates a TCP-like protocol in a wireless network using CNET, handling mobile nodes and access points for reliable message transmission.',
            image: wirelessNetworkImage,
            link: 'https://github.com/kkli08/Wireless-Network-Communication-Simulation-using-CNET',
            isInternal: false,
        },
        {
            title: 'Enhanced Stop and Wait Protocol',
            tags: ['Network Protocols', 'C', 'Makefile', 'Cnet'],
            // icon: <IconText icon={ClockCircleFilled} text="7 mins read &nbsp; &nbsp; &nbsp; Sep 5th 2024" key="list-vertical-message" />,
            content: 'An enhanced stop-and-wait protocol for reliable data transmission between two nodes in a simulated network environment.',
            image: stopandwaitImage,
            link: 'https://github.com/kkli08/Enhanced-Stop-and-Wait-Protocol-for-Reliable-Data-Transmission-in-Network-Simulation',
            isInternal: false,
        },
    ];
    
function Project() {
    const [cards, setCards] = useState(networkProtocols);
    const navigate = useNavigate();
    const [viewCount, setViewCount] = useState(0);

    const handleClick = (link, isInternal) => {
        if (isInternal) {
        navigate(link); // Use navigate for internal links
        } else {
        window.open(link, '_blank'); // Open external links in a new tab
        }
    };

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
            // case 'Game_Strategy':
            //     setCards(gameStrategy);
            //     break;
            case 'Database':
                setCards(DatabaseCard);
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
                        label: 'Web',
                        value: 'Web_Application',
                    },
                    {
                        label: 'Mobile',
                        value: 'Mobile_Application',
                    },
                    
                    ],
                },
                {
                    label: 'Individual Projects',
                    options: [
                    {
                        label: 'Database',
                        value: 'Database',
                    },
                    {
                        label: 'Compiler',
                        value: 'Compiler',
                    },
                    {
                        label: 'OS',
                        value: 'Linux_System',
                    },
                    {
                        label: 'Network',
                        value: 'Network_Protocols',
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

            {/* <Lottie animationData={tree1} /> */}
            {/* <div className="ProListdetails">
            <ProList
                itemLayout="vertical"
                rowKey="title" // Assuming titles are unique
                dataSource={dataSource}
                metas={{
                title: {
                    render: (_, row) => (
                        <div
                          onClick={() => handleClick(row.link, row.isInternal)}
                        >
                          {row.title}
                        </div>
                      ),
                },
                description: {
                    render: (_, row) => (
                    <div>
                        {row.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                        ))}
                    </div>
                    ),
                },
                actions: {
                    render: (_, row) => [row.icon],
                },
                extra: {
                    render: (_, row) => (
                    <img
                        width={272}
                        alt={row.title}
                        src={row.image}
                        onClick={() => handleClick(row.link, row.isInternal)}
                        style={{ cursor: 'pointer' }}
                    />
                    ),
                },
                content: {
                    render: (_, row) => (
                    <div
                        onClick={() => handleClick(row.link, row.isInternal)}
                        style={{ cursor: 'pointer' }}
                    >
                        {row.content}
                    </div>
                    ),
                },
                }}
            />
            
            </div> */}
        </div>
    );
}

export default Project;