// frontend/src/App.js
import React, { useState } from "react";
import axios from "axios";

export default function AI() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    setResponse(""); // Clear previous response

    const res = await fetch("http://localhost:3002/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.body) {
      throw new Error("Response body is null");
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: true });

      // Parse SSE format: skip "data: " lines, ignore keepalives
      chunkValue.split("\n").forEach((line) => {
        if (line.startsWith("data: ")) {
          const text = line.replace("data: ", "");
          if (text !== "[DONE]") {
            setResponse((prev) => prev + text);
          }
        }
      });
    }
  };

  return (
    <div className="App">
      <h1>Ask AI</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question"
        className="w-ful h-32 p-2 border rounded bg-transparent"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <p>AI Response: {response || <i>(waiting for response)</i>}</p>
      </div>
    </div>
  );
}
