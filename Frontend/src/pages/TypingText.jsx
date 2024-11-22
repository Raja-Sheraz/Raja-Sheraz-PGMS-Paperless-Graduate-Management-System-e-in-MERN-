import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    } else {
      const pauseTimeoutId = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, pause);

      return () => clearTimeout(pauseTimeoutId);
    }
  }, [index, text, speed, pause]);

  return <h1 style={{fontSize: '55px',fontWeight: 'bold',fontFamily: 'initial',marginLeft:'20px',marginTop:'10px'}}> {displayedText}</h1>;
};

export default TypingText;
