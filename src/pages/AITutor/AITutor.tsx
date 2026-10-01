import React, { useState } from "react";
import {
  Send,
  Sparkles,
  BookOpen,
  Code2,
  Brain,
  Lightbulb,
  Copy,
  RotateCcw,
  User,
} from "lucide-react";
import "./AITutor.css";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const quickPrompts = [
  {
    icon: BookOpen,
    title: "Explain a concept",
    prompt:
      "Explain DBMS normalization in simple terms with an example.",
  },
  {
    icon: Code2,
    title: "Help with coding",
    prompt:
      "Explain binary search in Java with a simple example.",
  },
  {
    icon: Brain,
    title: "Prepare for interview",
    prompt:
      "Give me 5 Java interview questions with answers.",
  },
  {
    icon: Lightbulb,
    title: "Give me an example",
    prompt:
      "Explain how APIs work with a real-world example.",
  },
];

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text:
        "Hi! I'm your AI Tutor 👋\n\nAsk me anything about programming, engineering subjects, DSA, web development, AI/ML, interviews, or your projects. I'll explain things step-by-step and keep them easy to understand.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ============================================================
  // SEND MESSAGE TO GEMINI THROUGH FASTAPI
  // ============================================================

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://engineeros-api.onrender.com/ai-tutor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Failed to generate AI response"
        );
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          data.answer ||
          "Sorry, I received an empty response from the AI.",
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI Tutor error:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text:
          "Sorry, I couldn't connect to the AI Tutor right now. Please make sure the FastAPI server is running.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ============================================================
  // QUICK PROMPT
  // ============================================================

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  // ============================================================
  // CLEAR CHAT
  // ============================================================

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text:
          "Chat cleared. What would you like to learn today? 🚀",
      },
    ]);
  };

  // ============================================================
  // COPY MESSAGE
  // ============================================================

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      console.log("Copy failed");
    }
  };

  // ============================================================
  // FORMAT AI RESPONSE
  // ============================================================

  const formatMessage = (text: string) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      // Markdown heading
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="ai-heading">
            {line.replace("### ", "")}
          </h3>
        );
      }

      // Bold line
      if (
        line.startsWith("**") &&
        line.endsWith("**")
      ) {
        return (
          <strong
            key={index}
            className="ai-strong"
          >
            {line.replace(/\*\*/g, "")}
          </strong>
        );
      }

      // Bullet
      if (line.startsWith("• ")) {
        return (
          <div
            key={index}
            className="ai-bullet"
          >
            <span>•</span>
            {line.substring(2)}
          </div>
        );
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        return (
          <div
            key={index}
            className="ai-number"
          >
            {line}
          </div>
        );
      }

      return (
        <div
          key={index}
          className="ai-line"
        >
          {line || "\u00A0"}
        </div>
      );
    });
  };

  return (
    <div className="ai-tutor-page">
      <div className="ai-tutor-container">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="ai-tutor-header">
          <div className="ai-tutor-title">

            <div className="ai-tutor-icon">
              <Sparkles size={22} />
            </div>

            <div>
              <div className="ai-tutor-eyebrow">
                ENGINEEROS AI
              </div>

              <h1>AI Tutor</h1>

              <p>
                Learn concepts, solve problems and
                prepare smarter.
              </p>
            </div>

          </div>

          <button
            className="clear-chat-btn"
            onClick={clearChat}
            title="Clear chat"
          >
            <RotateCcw size={17} />
            Clear
          </button>
        </header>

        {/* =====================================================
            QUICK PROMPTS
        ====================================================== */}

        {messages.length <= 1 && (
          <section className="quick-prompts-section">

            <div className="quick-prompts-heading">
              <Sparkles size={16} />
              <span>
                What do you want to learn?
              </span>
            </div>

            <div className="quick-prompts">

              {quickPrompts.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.title}
                    className="quick-prompt-card"
                    onClick={() =>
                      handleQuickPrompt(item.prompt)
                    }
                  >

                    <div className="quick-prompt-icon">
                      <Icon size={19} />
                    </div>

                    <div>
                      <strong>
                        {item.title}
                      </strong>

                      <span>
                        {item.prompt}
                      </span>
                    </div>

                  </button>
                );
              })}

            </div>
          </section>
        )}

        {/* =====================================================
            CHAT
        ====================================================== */}

        <main className="ai-chat-card">

          <div className="messages-container">

            {messages.map((message) => (

              <div
                key={message.id}
                className={`message-row ${
                  message.role === "user"
                    ? "message-user"
                    : "message-assistant"
                }`}
              >

                <div
                  className={`message-avatar ${
                    message.role === "user"
                      ? "user-avatar"
                      : "assistant-avatar"
                  }`}
                >

                  {message.role === "user" ? (
                    <User size={17} />
                  ) : (
                    <Sparkles size={17} />
                  )}

                </div>

                <div className="message-content">

                  <div className="message-name">
                    {message.role === "user"
                      ? "You"
                      : "EngineerOS AI"}
                  </div>

                  <div className="message-bubble">

                    {formatMessage(message.text)}

                    {message.role === "assistant" && (
                      <button
                        className="copy-message-btn"
                        onClick={() =>
                          copyMessage(message.text)
                        }
                        title="Copy"
                      >
                        <Copy size={14} />
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))}

            {/* =================================================
                TYPING INDICATOR
            ================================================== */}

            {isTyping && (
              <div className="message-row message-assistant">

                <div className="message-avatar assistant-avatar">
                  <Sparkles size={17} />
                </div>

                <div className="message-content">

                  <div className="message-name">
                    EngineerOS AI
                  </div>

                  <div className="typing-bubble">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ===================================================
              INPUT
          ==================================================== */}

          <div className="chat-input-area">

            <div className="chat-input-wrapper">

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }

                }}
                placeholder="Ask your AI Tutor anything..."
                rows={1}
              />

              <button
                className="send-btn"
                onClick={sendMessage}
                disabled={
                  !input.trim() || isTyping
                }
                title="Send message"
              >
                <Send size={18} />
              </button>

            </div>

            <div className="input-hint">
              Press Enter to send · Shift + Enter
              for a new line
            </div>

          </div>

        </main>

        {/* =====================================================
            DISCLAIMER
        ====================================================== */}

        <div className="ai-disclaimer">
          <Sparkles size={13} />
          AI-generated explanations may need
          verification. Use your course material for
          final academic answers.
        </div>

      </div>
    </div>
  );
};

export default AITutor;