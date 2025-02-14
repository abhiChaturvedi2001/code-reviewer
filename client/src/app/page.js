"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setloading] = useState(false)

  const handleInput = (e) => {
    setCode(e.currentTarget.textContent);
  };

  const reviewCode = async () => {
    try {
      setloading(true)
      const response = await axios.post(`https://ai-server-liard.vercel.app/review-code`, { code }, { withCredentials: true });
      setResult(response?.data);
    } catch (error) {
      throw new Error(error)
    } finally {
      setloading(false)
    }
  };

  return (
    <div className="h-screen flex">
      <div className="relative w-1/2 h-full p-4 bg-gray-900 text-white border-r border-gray-700 overflow-auto">
        <div
          className="w-full h-[calc(100%-60px)] outline-none"
          contentEditable
          spellCheck="false"
          onInput={handleInput}
          style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
        >
          Paste your code here...
        </div>


        <div className="fixed bottom-4 left-2/4 transform -translate-x-1/2">
          {
            !loading ? <Button
              variant="secondary"
              onClick={reviewCode}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Review Code
            </Button> : <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          }
        </div>
      </div>

      <div className="w-1/2 h-full p-4">
        <div className="w-full h-full p-4 overflow-y-scroll border rounded-lg shadow-md">
          <Markdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {result}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
