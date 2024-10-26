// components/Loading.js
"use client";
import React, { useState, useEffect } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
   <div>
    <div className='custom'>
        <div className='balls'>
            <div className="ball ball1"></div>
            <div className="ball ball2"></div>
            <div className="ball ball3"></div>
        </div>

    </div>
   </div>
  );
}

export default Loading;
