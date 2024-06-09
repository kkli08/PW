import React from 'react';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
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
import sql from '../blog/blog_cover/sql.png';
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const dataSource = [
    {
        title: 'Buffer Overflow',
        tags: ['Cybersecurity', 'Binary exploit', 'C/C++'],
        icon: <IconText icon={MessageOutlined} text="15 mins read" key="list-vertical-message" />,
        content: 'Buffer overflow is a vulnerability in low level programming languages such as C and C++. It is caused by writing data beyond the allocated memory. This can lead to a crash of the program or even worse, the attacker can execute arbitrary code.',
        image: bufferoverflowImage,
        link: '/blog/cybersecurity/bufferoverflow',
        isInternal: true,
    },
    {
        title: 'HMAC Authentication',
        tags: ['HMAC-SHA1', 'TOTP', 'Cybersecurity'],
        icon: <IconText icon={MessageOutlined} text="7 mins read" key="list-vertical-message" />,
        content: 'HMAC is a type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It is used to verify the data integrity and the authentication of a message.',
        image: hmacImage,
        link: 'https://github.com/kkli08/HMAC/wiki#hmac',
        isInternal: false,
    },
    {
        title: 'Network Attack',
        tags: ['CSRF', 'XSS', 'Cybersecurity'],
        icon: <IconText icon={MessageOutlined} text="5 mins read" key="list-vertical-message" />,
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
        image: guitarsoloImage,
        link: 'https://open.spotify.com/playlist/4S2NresR0bc1D2YlNvlpeI?si=c11a76b33e9f4d44',
        isInternal: false,
    },
  ];

function Blogdetail() {
    const navigate = useNavigate();

    const handleClick = (link, isInternal) => {
        if (isInternal) {
        navigate(link); // Use navigate for internal links
        } else {
        window.open(link, '_blank'); // Open external links in a new tab
        }
    };
    return(
        <div id="blogdetail">
            <div className="blogdetailtitle">
                <h1>
                Welcome to My Blog
                </h1>
            </div>
            <div className="ProListdetails">
            <ProList
                itemLayout="vertical"
                rowKey="title" // Assuming titles are unique
                dataSource={dataSource}
                metas={{
                title: {},
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