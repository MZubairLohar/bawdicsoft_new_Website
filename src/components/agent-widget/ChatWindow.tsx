'use client';

import React, { useEffect, useRef } from 'react';
import MessageBubble, { ChatMessage } from './MessageBubble';
import ChatInput from './ChatInput';

type Props = {
  messages: ChatMessage[];
  isTyping: boolean;
  onSend: (text: string) => void;
  onClose: () => void;
  isMobile: boolean;
};

export default function ChatWindow({
  messages,
  isTyping,
  onSend,
  onClose,
  isMobile,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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

  return (
    <div style={containerStyle} role="dialog" aria-label="BawdicSoft AI Chat">
      {/* Header */}
      <div
        style={{
          background: '#1E3A5F',
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
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#22C55E',
              boxShadow: '0 0 0 3px rgba(34,197,94,0.25)',
            }}
          />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>BawdicSoft AI</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Typically replies instantly</div>
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
        }}
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isTyping && (
          <div style={{ display: 'flex', marginBottom: 10 }}>
            <div
              style={{
                background: '#F1F3F6',
                padding: '10px 14px',
                borderRadius: 16,
                borderTopLeftRadius: 4,
                fontSize: 14,
                color: '#6B7280',
              }}
            >
              typing…
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}