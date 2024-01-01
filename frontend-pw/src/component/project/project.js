import React from "react";
import tree1 from "./tree.json";
import Lottie from "lottie-react";
import decorations from './decorations.json';
import { Select } from 'antd';

import "./project.css";


function Project() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
            <Lottie animationData={tree1} />
        </div>
    );
}

export default Project;