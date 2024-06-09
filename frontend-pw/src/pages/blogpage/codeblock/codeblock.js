// CodeBlock.js
import React, { useEffect, useState, useRef } from 'react';
import './codeblock.css';

const CodeBlock = ({ code }) => {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [lineNumbers, setLineNumbers] = useState([]);
  const [containerHeight, setContainerHeight] = useState('100px'); // Set a base height

  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbersEle = lineNumbersRef.current;

    // Set the styles to match the textarea
    const textareaStyles = window.getComputedStyle(textarea);
    ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding'].forEach(property => {
      lineNumbersEle.style[property] = textareaStyles[property];
    });

    const parseValue = (v) => (v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0);

    const font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    const paddingLeft = parseValue(textareaStyles.paddingLeft);
    const paddingRight = parseValue(textareaStyles.paddingRight);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;

    const calculateNumLines = (str) => {
      const textareaWidth = textarea.getBoundingClientRect().width - paddingLeft - paddingRight;
      const words = str.split(' ');
      let lineCount = 0;
      let currentLine = '';
      for (let i = 0; i < words.length; i++) {
        const wordWidth = context.measureText(words[i] + ' ').width;
        const lineWidth = context.measureText(currentLine).width;

        if (lineWidth + wordWidth > textareaWidth) {
          lineCount++;
          currentLine = words[i] + ' ';
        } else {
          currentLine += words[i] + ' ';
        }
      }

      if (currentLine.trim() !== '') {
        lineCount++;
      }

      return lineCount;
    };

    const calculateLineNumbers = () => {
      const lines = textarea.value.split('\n');
      const numLines = lines.map((line) => calculateNumLines(line));

      let lineNumbers = [];
      let i = 1;
      while (numLines.length > 0) {
        const numLinesOfSentence = numLines.shift();
        lineNumbers.push(i);
        if (numLinesOfSentence > 1) {
          Array(numLinesOfSentence - 1)
            .fill('')
            .forEach(() => lineNumbers.push(''));
        }
        i++;
      }

      return lineNumbers;
    };

    const displayLineNumbers = () => {
      const lineNumbers = calculateLineNumbers();
      setLineNumbers(lineNumbers);
      const lineHeight = parseValue(textareaStyles.lineHeight) || parseValue(textareaStyles.fontSize);
      const dynamicHeight = lineNumbers.length * lineHeight + 30; // 20px for padding
      setContainerHeight(`${Math.max(dynamicHeight, 10)}px`); // Ensure it's at least 400px
    };

    const handleScroll = () => {
      lineNumbersEle.scrollTop = textarea.scrollTop;
    };

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        const rect = textarea.getBoundingClientRect();
        lineNumbersEle.style.height = `${rect.height}px`;
        displayLineNumbers();
      });
    });

    resizeObserver.observe(textarea);

    textarea.addEventListener('input', displayLineNumbers);
    textarea.addEventListener('scroll', handleScroll);

    displayLineNumbers();

    // Cleanup
    return () => {
      resizeObserver.unobserve(textarea);
      textarea.removeEventListener('input', displayLineNumbers);
      textarea.removeEventListener('scroll', handleScroll);
    };
  }, [code]);

  return (
    <div className="container" style={{ height: containerHeight }}>
      <div id="line-numbers" className="container__lines" ref={lineNumbersRef}>
        {lineNumbers.map((number, index) => (
          <div key={index}>{number || '\u00A0'}</div>
        ))}
      </div>
      <textarea
        id="textarea"
        className="container__textarea"
        ref={textareaRef}
        defaultValue={code}
      />
    </div>
  );
};

export default CodeBlock;