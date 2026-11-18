'use client';

import React, { useState, KeyboardEvent } from 'react';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}: Props) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <style>{`
        .bs-input-shell { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .bs-input-shell:focus-within { border-color: #8FB0F3 !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.08), 0 5px 14px rgba(17,47,111,0.06) !important; }
        .bs-send-btn { transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease; }
        .bs-send-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 5px 12px rgba(37,99,235,0.3); }
      `}</style>
      <div style={{ padding: '8px 11px 6px', background: '#F6F8FF', flexShrink: 0 }}>
        <div
          className="bs-input-shell"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 5px 4px 14px',
            border: '1px solid #DCE5F5',
            borderRadius: 999,
            background: '#FFFFFF',
            boxShadow: '0 3px 10px rgba(23,58,125,0.055)',
          }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={placeholder}
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              fontSize: 12.5,
              padding: '7px 0',
              color: '#172B4D',
              background: 'transparent',
            }}
          />
          <button
            className="bs-send-btn"
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            style={{
              width: 34,
              height: 34,
              flexShrink: 0,
              borderRadius: '50%',
              border: 'none',
              background: value.trim() && !disabled ? 'linear-gradient(145deg, #1E59D8, #2875F2)' : '#B8C6DF',
              color: '#FFFFFF',
              cursor: value.trim() && !disabled ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: value.trim() && !disabled ? '0 3px 8px rgba(37,99,235,0.22)' : 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12L20 4L14 20L12 13L4 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}