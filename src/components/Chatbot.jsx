import React, { useEffect, useState } from "react";
import openaiservice from "../services/openai.js";
import { Loader } from "./Loader/styles";
import { stepLabelClasses } from "@mui/material";
const Chatbot = ({
  fetchPlaces,
  setLimited,
  limited,
  loading,
  chatMessage,
  setPlaces,
}) => {
  const [messages, setMessages] = useState([]); // Example { role: "system", content: "Hola, ¿qué lugares turisticos de Encarnación te gustaria visitar?" }, { role: "user", content: "Recomiendame lugares bailables." }, { role: "system", content: "Claro, estos son los..." }
  const [message, setMessage] = useState("");

  const handleRequest = async (message) => {
    setPlaces([]);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);
    setMessage("");
    // Call OpenAI API
    await fetchPlaces(message);
  };

  useEffect(() => {
    if (chatMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: chatMessage },
      ]);
    }
  }, [chatMessage]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full h-full bg-white p-6 rounded-lg border border-[#e5e7eb] overflow-hidden shadow-md">
        <div className="justify-between">
          <div>
            <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">
              Powered by Mendable and Vercel
            </p>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={limited}
                onChange={(e) => setLimited(e.target.checked)}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Limited</span>
            </label>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex gap-3 my-4 text-gray-600 text-sm flex-1"
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div className="rounded-full bg-gray-100 border p-1">
                  <svg
                    stroke="none"
                    fill="black"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {msg.role === "system" ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    ) : (
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                    )}
                  </svg>
                </div>
              </span>
              <p className="leading-relaxed">
                <span className="block font-bold text-gray-700">
                  {msg.role === "system" ? "AI" : "You"}
                </span>
                {msg.content}
              </p>
            </div>
          ))}
          {loading && (
            <div style={{ height: "2rem" }}>
              {" "}
              <Loader />{" "}
            </div>
          )}
        </div>
        <div className="w-full flex items-center border-t py-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-none p-2 text-gray-700 focus:outline-none"
          />
          <button
            onClick={() => handleRequest(message)}
            className="bg-black text-white px-4 py-2 rounded-full ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
