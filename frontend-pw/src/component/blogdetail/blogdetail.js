import React, { useEffect, useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined, ClockCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; 
import './blogdetail.css';
import bufferoverflowImage from '../blog/blog_cover/buffer_overflow.png';
import securityauditImage from '../blog/blog_cover/security_audit.png';
import doublefreeImage from '../blog/blog_cover/double_free.jpg';
import formatstringImage from '../blog/blog_cover/format_string.png';
import hmacImage from '../blog/blog_cover/hmac.png'; 
import guitarsoloImage from '../blog/blog_cover/electricguitarcover.jpg';
import classicalmusicImage from '../blog/blog_cover/classicmusic.jpg';
import cloudImage from '../blog/blog_cover/cloud.png';
import logisticregression from '../blog/blog_cover/logistic_regression.png';
import shallowNeuralNetwork from '../blog/blog_cover/shallowNeuralNetwork.png';


import sql from '../blog/blog_cover/sql.png';
import ScrollReveal from 'scrollreveal';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; 
import {
    BarChartOutlined,
  } from '@ant-design/icons';
  import CountUp from 'react-countup';

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
        title: 'Shallow Neural Network',
        tags: ['Deep Learning', 'Python', 'NumPy'],
        icon: <IconText icon={ClockCircleFilled} text="7 mins read &nbsp; &nbsp; &nbsp; Jun 19th 2024" key="list-vertical-message" />,
        content: 'Notes about neural network with single hidden layer, activation functions and update weights and bias by using backpropagation.',
        image: shallowNeuralNetwork,
        link: 'https://damians-blog.gitbook.io/deep-learning-specialization/shallow-neural-networks',
        isInternal: false,
    },
    {
        title: 'Logistic Regression',
        tags: ['Deep Learning', 'Python', 'NumPy'],
        icon: <IconText icon={ClockCircleFilled} text="10 mins read &nbsp; &nbsp; &nbsp; Jun 17th 2024" key="list-vertical-message" />,
        content: 'Notes about logistic regression, cost function, optimization methods and implementation using Python NumPy.',
        image: logisticregression,
        link: 'https://damians-blog.gitbook.io/deep-learning-specialization',
        isInternal: false,
    },
    {
        title: 'Buffer Overflow',
        tags: ['Cybersecurity', 'Binary exploit', 'C/C++'],
        icon: <IconText icon={ClockCircleFilled} text="15 mins read &nbsp; &nbsp; &nbsp; Jan 24th 2024" key="list-vertical-message" />,
        content: 'Buffer overflow is a vulnerability in low level programming languages such as C and C++. It is caused by writing data beyond the allocated memory. This can lead to a crash of the program or even worse, the attacker can execute arbitrary code.',
        image: bufferoverflowImage,
        link: '/blog/cybersecurity/bufferoverflow',
        isInternal: true,
    },
    {
        title: 'HMAC Authentication',
        tags: ['HMAC-SHA1', 'TOTP', 'Cybersecurity'],
        icon: <IconText icon={ClockCircleFilled} text="7 mins read &nbsp; &nbsp; &nbsp; Feb 7th 2024" key="list-vertical-message" />,
        content: 'HMAC is a type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It is used to verify the data integrity and the authentication of a message.',
        image: hmacImage,
        link: 'https://github.com/kkli08/HMAC/wiki#hmac',
        isInternal: false,
    },
    {
        title: 'Network Attack',
        tags: ['CSRF', 'XSS', 'Cybersecurity'],
        icon: <IconText icon={ClockCircleFilled} text="5 mins read &nbsp; &nbsp; &nbsp; Mar 15th 2024" key="list-vertical-message" />,
        content: 'Cross-Site Scripting (XSS) | Cross-site request forgery (CSRF) | SQL Injection',
        image: sql,
        link: 'https://github.com/kkli08/OWASP-Network-Attack/wiki',
        isInternal: false,
    },
    {
        title: 'My Favorite Electric Guitar SOLOs',
        tags: ['Lynyrd Skynyrd', 'Chuck Berry', 'Queen'],
        icon: <IconText icon={StarOutlined} text="1 hr 54 mins" key="list-vertical-message" />,
        content: '“I still believe in the need for guitars and drums and desperate poetry.” \n -- Frank Turner ',
        image: guitarsoloImage,
        link: 'https://open.spotify.com/playlist/10Gc1xdoVZ5HR57d09U6kp?si=9c2a1f2ece2446b1',
        isInternal: false,
    },
    {
        title: 'My Favorite Classical Music',
        tags: ['Frédéric Chopin', 'Lang Lang', 'Bach'],
        icon: <IconText icon={StarOutlined} text="1 hr 38 mins" key="list-vertical-message" />,
        content: '"I am hitting my head against the walls, but the walls are giving way."\n -- Gustav Mahler ',
        image: classicalmusicImage,
        link: 'https://open.spotify.com/playlist/4S2NresR0bc1D2YlNvlpeI?si=c11a76b33e9f4d44',
        isInternal: false,
    },
  ];

function Blogdetail() {
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
        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 200
        });
        ScrollReveal().reveal('.blogdetailtitle', { delay: 250, origin: 'left' });
        ScrollReveal().reveal('.ProListdetails', { delay: 250, origin: 'bottom' });
        
        // Add more ScrollReveal configurations here as needed
        // You can target elements across different components

        return () => ScrollReveal().destroy(); // Clean up
    }, []);

    useEffect(() => {
        const fetchViewCount = async () => {
        const viewCountRef = ref(database, 'viewBlogCount');
        const snapshot = await get(viewCountRef);
        if (snapshot.exists()) {
            setViewCount(snapshot.val());
        }
        };

        fetchViewCount();
    }, []);
    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                Welcome to My Blog
                </h1>
            </div>
            
            <div className="ProListdetails">
                <div className='viewCounter'>
                    <Tag icon={<BarChartOutlined />} color="#3b5999">
                        <CountUp end={viewCount} duration={2} separator="," />
                        {' '}views
                    </Tag>
                </div>
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
            </div>
            
         </div>
    );
}

export default Blogdetail;