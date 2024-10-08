import React, { useState }  from "react";
import "./blogdetail.css";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import { Select } from 'antd';
import { Card } from "../card/card";
import bufferoverflowImage from '../blog/blog_cover/buffer_overflow.png';
import securityauditImage from '../blog/blog_cover/security_audit.png';
import doublefreeImage from '../blog/blog_cover/double_free.jpg';
import formatstringImage from '../blog/blog_cover/format_string.png';
import hmacImage from '../blog/blog_cover/hmac.png'; 
import guitarsoloImage from '../blog/blog_cover/electricguitarcover.jpg';
import classicalmusicImage from '../blog/blog_cover/classicmusic.jpg';
import cloudImage from '../blog/blog_cover/cloud.png';
import sql from '../blog/blog_cover/sql.png';

const cybersecurityCards = [
    { 
        title: 'Buffer Overflow', 
        description: 'Buffer overflow is a vulnerability in low level programming languages such as C and C++. It is caused by writing data beyond the allocated memory. This can lead to a crash of the program or even worse, the attacker can execute arbitrary code.\n\n[Binary Exploitation][Stack]', 
        imgSrc: bufferoverflowImage, // 图片的路径
        imgAlt: 'buffer overflow Image',// 图片的替代文本
        link: '/blog/cybersecurity/bufferoverflow',
    },
    { 
        title: 'Network Attack', 
        description: 'Blog for :\nCross-Site Scripting (XSS)\nCross-site request forgery (CSRF)\nSQL Injection\n\n[Network][SQL]', 
        imgSrc: sql, // 图片的路径
        imgAlt: 'SQL Image',// 图片的替代文本
        link: 'https://github.com/kkli08/OWASP-Network-Attack/wiki',
    },
    { 
        title: 'HMAC Authentication', 
        description: 'HMAC is a type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It is used to verify the data integrity and the authentication of a message.\n\n[Integrity][Authenticity]', 
        imgSrc: hmacImage, // 图片的路径
        imgAlt: 'hmac Image',// 图片的替代文本
        link: 'https://github.com/kkli08/HMAC/wiki#hmac',
    },
    { 
        title: 'Double Free Exploitation', 
        description: 'Double free is a memory corruption bug that occurs when free() is called on the same allocated memory address more than once. This can lead to a exploitation, the attacker can execute arbitrary code by assigning the shellcode address(in the heap) to the return address($rip).\n\n[Binary Exploitation][Heap]', 
        imgSrc: doublefreeImage, // 图片的路径
        imgAlt: 'double free Image',// 图片的替代文本
        link: 'https://github.com/kkli08/format-string/wiki#double-free',
    },
    { 
        title: 'Format String Overflow', 
        description: 'Format string vulnerability is a type of software vulnerability that can be used in security exploits. This can lead to a exploitation, the attacker can execute arbitrary code by overwriting the return address.\n\n[Binary Exploitation][Stack]', 
        imgSrc: formatstringImage, // 图片的路径
        imgAlt: 'format string Image',// 图片的替代文本
        link: 'https://github.com/kkli08/format-string/wiki#format-string',
    },
    // ... more cards
];


const musicCards = [
    { 
        title: 'My Favorite Electric Guitar SOLOs', 
        description: '“I still believe in the need for guitars and drums and desperate poetry.” \n -- Frank Turner ', 
        imgSrc: guitarsoloImage, // 图片的路径
        imgAlt: 'electric guitar solos',// 图片的替代文本
        link: 'https://open.spotify.com/playlist/10Gc1xdoVZ5HR57d09U6kp?si=9c2a1f2ece2446b1',
    },
    { 
        title: 'My Favorite Classical Music', 
        description: '"I am hitting my head against the walls, but the walls are giving way."\n -- Gustav Mahler', 
        imgSrc: classicalmusicImage, // 图片的路径
        imgAlt: 'classical music',// 图片的替代文本
        link: 'https://open.spotify.com/playlist/4S2NresR0bc1D2YlNvlpeI?si=c11a76b33e9f4d44',
    },
];
const cloudComputingCards = [
    { 
        title: 'MindMap', 
        description: '1779', 
        imgSrc: cloudImage, // 图片的路径
        imgAlt: 'electric guitar solos',// 图片的替代文本
        link: 'https://github.com/kkli08/1779-Cloud-Computing/wiki',
    },
];

function Blogdetail() {
    const [cards, setCards] = useState(cybersecurityCards);
    const [selectedCategory, setSelectedCategory] = useState('Cybersecurity'); // New state to track selected category

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedCategory(value); // Update the selected category
        switch (value) {
            case 'Cybersecurity':
                setCards(cybersecurityCards);
                break;
            case 'Music':
                setCards(musicCards);
                break;
            case 'Cloud_Computing':
                setCards(cloudComputingCards);
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
                        label: 'Cloud Computing',
                        value: 'Cloud_Computing',
                    },
                    // {
                    //     label: 'Leetcode',
                    //     value: 'Leetcode',
                    // },
                    // {
                    //     label: 'Distributed Systems',
                    //     value: 'Distributed_System',
                    // },
                    // {
                    //     label: 'Interview',
                    //     value: 'Interview',
                    // },
                    ],
                },
                {
                    label: 'Life Blogs',
                    options: [
                    // {
                    //     label: 'Travel',
                    //     value: 'Travel',
                    // },
                    {
                        label: 'Music',
                        value: 'Music',
                    },
                    // {
                    //     label: 'Art',
                    //     value: 'Art',
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
            {selectedCategory === 'Music' && (
                <div className="boxcol">
                    <iframe 
                        className="iframe-style"  
                        src="https://open.spotify.com/embed/playlist/10Gc1xdoVZ5HR57d09U6kp?utm_source=generator" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                    </iframe>
                    <iframe 
                        className="iframe-style" 
                        src="https://open.spotify.com/embed/playlist/4S2NresR0bc1D2YlNvlpeI?utm_source=generator" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                    </iframe>
                    <iframe 
                        className="iframe-style" 
                        src="https://open.spotify.com/embed/playlist/0lOCBrOeMJayCRU7psz0vz?utm_source=generator" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                    </iframe>
                </div>
            )}
            {/* <Lottie animationData={tree1} /> */}
            
        </div>
    );
}

export default Blogdetail;