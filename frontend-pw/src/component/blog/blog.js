import React from "react";
import "./blog.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

function Blog() {

    return(
        <div id="blog">
            <div className="title">
                <h1>
                <Link to="/blog">Blog</Link>
                </h1>
            </div>
        </div>
    );
}

export default Blog;