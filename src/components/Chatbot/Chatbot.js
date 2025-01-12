import React, { useState } from "react";
import "./Chatbot.css"; // Create this file for additional styling.

const Chatbot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const handleOpenChatbot = () => {
    setChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setChatbotOpen(false);
  };

  return (
    <div>
      <button id="open-chatbot-btn" onClick={handleOpenChatbot}>
        Chat with aras.ai
      </button>

      {isChatbotOpen && (
        <div id="chatbot-ui" className="chatbot-ui">
          <div className="chatbot-header">
            <span>aras.ai</span>
            <button id="close-chatbot-btn" onClick={handleCloseChatbot}>
              &times;
            </button>
          </div>
          <iframe
            id="chatbot-iframe"
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/11/06/20250111061823-LPK0PQRT.json"
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
