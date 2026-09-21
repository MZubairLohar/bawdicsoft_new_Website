'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble, { ChatMessage } from './MessageBubble';
import ChatInput from './ChatInput';
import AgentLoader, { AGENT_NAME } from './AgentLoader';

type Props = {
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  isMobile: boolean;
  isInitializing?: boolean;
};

export default function ChatWindow({
  messages,
  isTyping,
  onSend,
  onClose,
  isMobile,
  isInitializing = false,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isInitializing]);

  const containerStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
      }
    : {
        position: 'fixed',
        bottom: 90,
        right: 20,
        width: 360,
        height: 480,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 9999,
      };

  const showInitialLoader = isInitializing && messages.length === 0;

  return (
    <div style={containerStyle} role="dialog" aria-label="BawdicSoft AI Chat">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A75 100%)',
          color: '#FFFFFF',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2A4A75 0%, #1E3A5F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 700,
              border: '2px solid rgba(255,255,255,0.15)',
            }}
          >
            A
            <span
              style={{
                position: 'absolute',
                bottom: -1,
                right: -1,
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: '#22C55E',
                border: '2px solid #1E3A5F',
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{AGENT_NAME}</div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 6px rgba(34,197,94,0.7)',
                }}
              />
              Online · BawdicSoft
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.85,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 14px',
          background: '#FAFBFC',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showInitialLoader && <AgentLoader />}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isTyping && !showInitialLoader && <AgentLoader />}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping || isInitializing} />
    </div>
  );
}