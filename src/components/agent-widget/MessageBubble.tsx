'use client';

import React from 'react';
import AgentAvatar from './AgentAvatar';
import type { Agent } from '@/lib/agents';

export type MessageRole = 'agent' | 'user';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
};

type Props = {
  message: ChatMessage;
  agent: Agent;
};

export default function MessageBubble({ message, agent }: Props) {
  const isAgent = message.role === 'agent';
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: isAgent ? 'flex-start' : 'flex-end',
        gap: 7,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 27,
          height: 27,
          flexShrink: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #FFFFFF',
          boxShadow: '0 2px 5px rgba(27,54,102,0.14)',
          background: isAgent ? '#DBEAFE' : '#E5EDFF',
          order: isAgent ? 0 : 1,
        }}
      >
        {isAgent ? (
          <AgentAvatar agent={agent} size={23} />
        ) : (
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="#5578B9" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" fill="#5578B9" />
          </svg>
        )}
      </div>
      <div
        style={{
          maxWidth: '78%',
          padding: '10px 12px 7px',
          borderRadius: 17,
          fontSize: 12.5,
          lineHeight: 1.48,
          background: isAgent ? '#FFFFFF' : 'linear-gradient(145deg, #174CB7, #246BE3)',
          color: isAgent ? '#172B4D' : '#FFFFFF',
          border: isAgent ? '1px solid #E0E8F7' : '1px solid rgba(20,73,170,0.2)',
          borderBottomLeftRadius: isAgent ? 5 : 17,
          borderBottomRightRadius: isAgent ? 17 : 5,
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          boxShadow: isAgent
            ? '0 4px 12px rgba(26,54,112,0.07)'
            : '0 4px 11px rgba(30,86,190,0.17)',
          order: isAgent ? 1 : 0,
        }}
      >
        <div>{message.text}</div>
        <div
          style={{
            marginTop: 3,
            fontSize: 9,
            lineHeight: 1.2,
            textAlign: 'right',
            color: isAgent ? '#7888A4' : 'rgba(255,255,255,0.72)',
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}