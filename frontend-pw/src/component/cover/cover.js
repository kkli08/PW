import React, { useState } from 'react';
import "./cover.css";
import Bg1 from "./bgvideo/bgvideo1.mp4";
import Bg2 from './bgvideo/bgvideo2.mp4';
import Bg3 from './bgvideo/bgvideo3.mp4';
import Bg4 from './bgvideo/bgvideo4.mp4';
import Bg5 from './bgvideo/bgvideo5.mp4';
import Bg6 from './bgvideo/bgvideo6.mp4';
import Bg7 from './bgvideo/bgvideo7.mp4';
import Bg8 from './bgvideo/bgvideo8.mp4';
import Bg9 from './bgvideo/bgvideo9.mp4';
import Bg10 from './bgvideo/bgvideo10.mp4';


function Cover () {
    // 视频数组
    const videos = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9, Bg10];


    // 按顺序播放
    // 当前视频的索引状态
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleVideoEnd = () => {
        const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
        setCurrentVideoIndex(nextVideoIndex);
    };

    return (
        <section>
            <video 
                src={videos[currentVideoIndex]} 
                autoPlay 
                loop={false} 
                muted 
                onEnded={handleVideoEnd}
            />
            <div className='overlay'></div>
            <div className="cover-text">
                <h1>"In matters of principle, stand like a rock."</h1>
                <p>- Thomas Jefferson</p>
            </div>
        </section>
    );


}

export default Cover;