import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faLinkedin, faSlack } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { Statistic, Row, Col } from 'antd';
import { ref, get } from 'firebase/database';
import { database } from '../../firebase'; 
import "./contact.css";

function Contact() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchViewCount = async () => {
      const viewCountRef = ref(database, 'viewCount');
      const snapshot = await get(viewCountRef);
      if (snapshot.exists()) {
        setViewCount(snapshot.val());
      }
    };

    fetchViewCount();
  }, []);

  return (
    <div id="contact">
      <div className="title">
        <h1>Contact</h1>
      </div>

      <div className="contact-icon">
        <a href="https://www.instagram.com/damian_liiii/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://github.com/kkli08" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/ke-li-b4978b220/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://join.slack.com/t/slack-c3d5136/shared_invite/zt-2au024z9x-uLg6v~OcefxbVqZX3TsIjA" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSlack} />
        </a>
        <a href="mailto:kegrad2023@gmail.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>

      
    </div>
  );
}

export default Contact;