import React from "react";
import "./card.css";

export const Card = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
  }) => {
    return (
      <div className="card-container">
        {imgSrc && imgAlt && link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <img src={imgSrc} alt={imgAlt} className="card-img" />
                </a>
            )}
        {title && <h1 className="card-title">{title}</h1>}
        {description && <p className="card-description">{description}</p>}
        {buttonText && link && (
          <a href={link} className="card-btn">
            {buttonText}
          </a>
        )}
      </div>
    );
  };