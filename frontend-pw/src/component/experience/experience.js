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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLandmark, faSchool} from '@fortawesome/free-solid-svg-icons'

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
                    dot: <FontAwesomeIcon icon={faLandmark} className="timeline-item-content"/>,
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
                    children: <div className="timeline-item-content"><h1>Backend Engineer</h1>
                                                                    <p>May - Aug 2021 | Internship</p>
                                                                    <p>Nandou Six Star System integration Co., LTD </p>
                                                                    
                                                                    <ul>
                                                                        <li>Wrote backend code that handled external HTTP requests from third party endpoints.</li> 
                                                                        <li>Gained experience in Gunicorn, Nginx, SQLite and Django REST framework.</li>   
                                                                    </ul>    
                                                                    </div>,
                },
                {
                    position: 'right',
                    color: 'black',
                    dot: <TeamOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>Student Developer</h1>
                                                                    <p>Jan - Apr 2023 | Internship | Edmonton, Canada</p>
                                                                    <p>University of Alberta ALT Lab</p>
                                                                    
                                                                    <ul>
                                                                        <li>Developed a website that generates interactive word graphs based on Cree words and their domains using React, D3.js and Docker.</li> 
                                                                        <li>Optimize graph load times from 10 to 0.5 seconds by implementing the lazy loading time design pattern.</li>
                                                                        <li>Reviewed 50+ PR and contributed 4K+ lines of code to the codebase via Git.</li>   
                                                                        <li>Maintained web application documentation using MkDocs.</li> 
                                                                        <li>Used Jest for unit testing and Cypress for functional testing.</li>  
                                                                    </ul>    
                                                                    </div>,
                },
                {
                    position: 'left',
                    color: 'blue',
                    dot: <FontAwesomeIcon icon={faLandmark} className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>University Of Toronto</h1>
                                                                    <p>2024 - 2025</p>
                                                                    <p>Master of Engineering</p>
                                                                    
                                                                    <ul>
                                                                        <li>Major Area of Focus: Computing Engineering & Identity, Privacy and Security (IPS)</li> 
                                                                        <li>Coursework: Parallel Programming, System Programming in Rust , Computer Security, Cloud Computing, Deep Learning & Neural Network</li>   
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
                    position: 'right',
                    color: 'black',
                    dot: <TeamOutlined className="timeline-item-content"/>,
                    children: <div className="timeline-item-content"><h1>Database Kernel Engineer </h1>
                                                                    <p>Dec 2024 - Present | Internship | Shenzhen, China</p>
                                                                    <p>Ant Group </p>
                                                                    
                                                                    <ul>
                                                                        <li>Oceanbase Department, KV & Multi-Model Team.</li> 
                                                                        <li>Developed array expressions for MySQL in the OceanBase observer project to enable array type support
                                                                        for diverse use cases.</li> 
                                                                        <li>Wrote and executed SQL tests to validate the functionality and performance of the array expressions.</li> 
                                                                    </ul>    
                                                                    </div>,
                },
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