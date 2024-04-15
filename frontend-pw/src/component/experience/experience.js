import React, { useState, useEffect } from "react";
import "./experience.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { Select } from 'antd';
import { EnvironmentOutlined, TeamOutlined, TrophyOutlined, GoogleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import dragonImage from './dragon_pic.jpg';

function Experience() {
    
    const [timelineMode, setTimelineMode] = useState('alternate');

    // 检测屏幕宽度的函数
    const checkScreenSize = () => {
        if (window.innerWidth <= 780) {
        setTimelineMode('left');
        } else {
        setTimelineMode('alternate');
        }
    };
    
    // 使用 useEffect 钩子添加事件监听器
    useEffect(() => {
        checkScreenSize(); // 首次渲染时检查屏幕宽度
        window.addEventListener('resize', checkScreenSize); // 添加 resize 事件监听器
    
        // 清理函数
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return(
        <div id="experience">
            
            <div className="timeline">
            <Timeline
                mode={timelineMode}
                className="timeline-width"
                
                items={[
                {
                    position: 'left',
                    color: 'green',
                    dot: <EnvironmentOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>University Of Alberta</h1>
                                                                    <p>2019 - 2023</p>
                                                                    <p>Bachelor of Science </p>
                                                                    
                                                                    <ul>
                                                                        <li>Major: Computer Science</li> 
                                                                        <li>Awards: Dean’s Honor Roll (22-23)</li>
                                                                        <li>Coursework: Operating System, Computer Networks, Computer Architecture, Web Development, Mobile App Development, Interface Design, Database Management, Machine Learning, Agile Methodology</li>   
                                                                    </ul>    
                                                                    </div>,
                },
                {
                    position: 'right',
                    color: 'black',
                    dot: <TeamOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>Backend Engineer Intern</h1>
                                                                    <p>May - Aug 2021</p>
                                                                    <p>Nandou Six Star System integration Co., LTD </p>
                                                                    
                                                                    <ul>
                                                                        <li>Contributed as a member of the backend development team for the Dongfeng Pilot Autopilot project, using Django to implement interfaces and connect to the databases.</li> 
                                                                        <li>Deploying endpoints to the company's online server with the use of Gunicorn and Nginx.</li>
                                                                        <li>Experienced in data analysis, manipulation, database documentation writing and maintenance.</li>   
                                                                    </ul>    
                                                                    </div>,
                },
                {
                    position: 'right',
                    color: 'black',
                    dot: <TeamOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>Full Stack Student Developer</h1>
                                                                    <p>Jan - Apr 2023</p>
                                                                    <p>Alberta Language Technology Lab (ALT Lab)</p>
                                                                    
                                                                    <ul>
                                                                        <li>Participated as a Scrum team member in the development of a web-based visual dictionary application, utilizing advanced technical skills in Django, React, D3, and Docker to provide English and Cree word definitions with the ability to expand and collapse semantic categories for improved clarity.</li> 
                                                                        <li>Implemented advanced React and D3 architecture to create an interactive, visually appealing front-end display of all the words in the dictionary.</li>
                                                                        <li>Adopted Docker for streamlined continuous deployment.</li>   
                                                                        <li>Used MKDocs to edit online documentation, providing stakeholders with easy access and understanding of the project.</li>  
                                                                    </ul>    
                                                                    </div>,
                },
                {
                    position: 'left',
                    color: 'blue',
                    dot: <EnvironmentOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>University Of Toronto</h1>
                                                                    <p>2023 - 2025</p>
                                                                    <p>Master of Engineering</p>
                                                                    
                                                                    <ul>
                                                                        <li>Major Area of Focus: Computing Engineering & Identity, Privacy and Security (IPS)</li> 
                                                                        <li>Coursework: Computer Security, Cloud Computing</li>   
                                                                    </ul>    
                                                                    </div>,
                },
                // {
                //     position: 'left',
                //     color: 'green',
                //     dot: <GoogleOutlined  className="timeline-item-content"/>,
                //     children: <div className="timeline-item-content"><h1>Google Cybersecurity Professional Certificate</h1>
                //                                                     <p>May 2024</p>
                                                                    
                //                                                     </div>,
                // },
                {
                    position: 'left',
                    color: 'gold',
                    dot: <TrophyOutlined className="timeline-item-content"/>,
                    
                },
                ]}
            />
            </div>

            <div className="image-container">
                {/* <img src={dragonImage} alt="Dragon" /> */}
            </div>
        </div>
    );
}

export default Experience;