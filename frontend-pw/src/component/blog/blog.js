import React from "react";
import "./blog.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { Select } from 'antd';


function Blog() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        };

    return(
        <div id="blog">
            <div className="title">
                <h1>
                <Link to="/blog">Blog</Link>
                </h1>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Select
                defaultValue="Happy New Year"
                className="select-width"
                onChange={handleChange}
                options={[
                {
                    label: 'Technical Blogs',
                    options: [
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
        </div>
    );
}

export default Blog;