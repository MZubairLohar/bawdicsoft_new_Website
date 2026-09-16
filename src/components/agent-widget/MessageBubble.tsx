'use client';

import React from 'react';

export type MessageRole = 'agent' | 'user';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
};

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  const isAgent = message.role === 'agent';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isAgent ? 'flex-start' : 'flex-end',
        marginBottom: 10,
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: 16,
          fontSize: 14,
          lineHeight: 1.45,
          background: isAgent ? '#F1F3F6' : '#1E3A5F',
          color: isAgent ? '#1F2937' : '#FFFFFF',
          borderTopLeftRadius: isAgent ? 4 : 16,
          borderTopRightRadius: isAgent ? 16 : 4,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.text}
      </div>
    </div>
  );
}