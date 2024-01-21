import React, { useState }  from "react";
import "./blogdetail.css";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import { Select } from 'antd';
import { Card } from "../card/card";
import bufferoverflowImage from '../blog/blog_cover/buffer_overflow.png';
import securityauditImage from '../blog/blog_cover/security_audit.png';

const cybersecurityCards = [
    { 
        title: 'Buffer Overflow', 
        description: 'Buffer overflow is a vulnerability in low level programming languages such as C and C++. It is caused by writing data beyond the allocated memory. This can lead to a crash of the program or even worse, the attacker can execute arbitrary code.', 
        imgSrc: bufferoverflowImage, // 图片的路径
        imgAlt: 'buffer overflow Image',// 图片的替代文本
        link: 'https://github.com/kkli08/Buffer-Overflow/wiki#welcome-to-my-buffer-overflow-blog',
    },
    { 
        title: 'Security Audit', 
        description: 'Security audit is a process of analyzing the security of a system or software by performing a series of tests.', 
        imgSrc: securityauditImage, // 图片的路径
        imgAlt: 'security audit Image',// 图片的替代文本
        link: 'https://drive.google.com/drive/folders/1ATDzG_buiJkn0oEsTJ37vbSzizCntiFq?usp=sharing',
    },
    // ... more cards
];

function Blogdetail() {
    const [cards, setCards] = useState(cybersecurityCards);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        switch (value) {
            case 'Cybersecurity':
                setCards(cybersecurityCards);
                break;
            // ... handle other cases
            default:
                setCards([]);
        }
        };

    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                Welcome to My Blog
                </h1>
                {/* <p>(Under Construction)</p>
                <p> : ) </p> */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Select
                defaultValue="Cybersecurity"
                className="select-width"
                onChange={handleChange}
                options={[
                {
                    label: 'Technical Blogs',
                    options: [
                    {
                        label: 'Cybersecurity',
                        value: 'Cybersecurity',
                    },
                    {
                        label: 'Leetcode',
                        value: 'Leetcode',
                    },
                    {
                        label: 'Distributed Systems',
                        value: 'Distributed_System',
                    },
                    {
                        label: 'Interview',
                        value: 'Interview',
                    },
                    ],
                },
                {
                    label: 'Life Blogs',
                    options: [
                    {
                        label: 'Travel',
                        value: 'Travel',
                    },
                    {
                        label: 'Food',
                        value: 'Food',
                    },
                    {
                        label: 'Art',
                        value: 'Art',
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

export default Blogdetail;