import React, { useState, useEffect } from 'react';
import "./cover.css";
import Bg1 from "./bgvideo/bgvideo1.mp4";
import Bg2 from './bgvideo/bgvideo2.mp4';
import Bg3 from './bgvideo/bgvideo3.mp4';
import Bg4 from './bgvideo/bgvideo4.mp4';
import Bg5 from './bgvideo/bgvideo5.mp4';
import Bg6 from './bgvideo/bgvideo6.mp4';
import Bg7 from './bgvideo/bgvideo7.mp4';
import Bg8 from './bgvideo/bgvideo8.mp4';
import Christmas from './bgvideo/Christmas.mp4';
import ScrollReveal from 'scrollreveal';

function Cover() {
    const videos = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        // 计算当前时间段对应的视频索引
        const calculateCurrentVideoIndex = () => {
            const date = new Date();
            const currentHour = date.getHours();
            const index = Math.floor(currentHour / 3) % videos.length;
            setCurrentVideoIndex(index);
        };

        // 设置定时器，每小时更新一次视频
        const interval = setInterval(calculateCurrentVideoIndex, 3600000); // 3600000ms = 1小时

        // 初始化
        calculateCurrentVideoIndex();

        // 清除定时器
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        ScrollReveal({
            reset: true,
            distance: '60px',
            duration: 2500,
            delay: 200
        });
        ScrollReveal().reveal('.cover-text', { delay: 250, origin: 'right' });
        // Add more ScrollReveal configurations here as needed
        // You can target elements across different components

        return () => ScrollReveal().destroy(); // Clean up
    }, []);

    return (
        <section>
            
            <video 
                src={videos[currentVideoIndex]} 
                // src={Christmas}
                autoPlay 
                loop 
                playsInline
                muted 
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


// 循环播放
// function Cover () {
//     // 视频数组
//     const videos = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9];


//     // 按顺序播放
//     // 当前视频的索引状态
//     const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//     const handleVideoEnd = () => {
//         const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
//         setCurrentVideoIndex(nextVideoIndex);
//     };

//     return (
//         <section>
//             <video 
//                 src={videos[currentVideoIndex]} 
//                 autoPlay 
//                 loop={false} 
//                 muted 
//                 onEnded={handleVideoEnd}
//             />
//             <div className='overlay'></div>
//             <div className="cover-text">
//                 <h1>"In matters of principle, stand like a rock."</h1>
//                 <p>- Thomas Jefferson</p>
//             </div>
//         </section>
//     );


// }

// export default Cover;