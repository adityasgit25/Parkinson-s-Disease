// NeuralNetworkAnimation.js
import React from 'react';
import './NeuralNetworkAnimation.css'; // Importing the CSS for animation

const NeuralNetworkAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="network-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="network-node"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 20 + 10}px`, // Random width for nodes
              height: `${Math.random() * 20 + 10}px`, // Random height for nodes
              animationDelay: `${Math.random() * 5}s`, // Random delay for each node
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NeuralNetworkAnimation;
