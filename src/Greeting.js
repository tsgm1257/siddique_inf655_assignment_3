import React, { useState } from "react";

const Greeting = ({ username }) => {
  const paragraphStyle = { color: "blue", fontSize: "18px" };
  const [currentGreeting, setCurrentGreeting] = useState(`Hello, ${username}!`);

  const handleChangeGreeting = () => {
    setCurrentGreeting("Greetings from React!");
  };

  return (
    <div>
      <h1>{currentGreeting}</h1>
      <p style={paragraphStyle}>
        Today's date: {new Date().toLocaleDateString()}
      </p>
      <button onClick={handleChangeGreeting}>Change Greeting</button>
    </div>
  );
};

export default Greeting;
