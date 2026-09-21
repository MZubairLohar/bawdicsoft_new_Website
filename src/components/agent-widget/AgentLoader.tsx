'use client';

import React from 'react';

export const AGENT_NAME = 'Aria';

type Props = {
  label?: string;
  compact?: boolean;
};

export default function AgentLoader({ label, compact = false }: Props) {
  return (
    <>
      <style jsx global>{`
        @keyframes bawdicDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes bawdicFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bawdicAvatarRing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bawdicOnlinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes bawdicSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: compact ? '8px 12px' : '10px 14px',
          background: '#F1F3F6',
          borderRadius: 16,
          borderTopLeftRadius: 4,
          maxWidth: '85%',
          animation: 'bawdicFadeIn 0.35s ease-out',
          alignSelf: 'flex-start',
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A75 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(30,58,95,0.25)',
            position: 'relative',
            animation: 'bawdicAvatarRing 1.6s ease-in-out infinite',
          }}
        >
          A
          <span
            style={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#22C55E',
              border: '2px solid #F1F3F6',
              animation: 'bawdicOnlinePulse 2s ease-out infinite',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span
            style={{
              fontSize: 12,
              color: '#4B5563',
              fontWeight: 500,
            }}
          >
            {label || `${AGENT_NAME} is typing`}
          </span>
          <div
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              height: 6,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#1E3A5F',
                  animation: 'bawdicDotBounce 1.2s infinite',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function ButtonSpinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'bawdicSpin 0.8s linear infinite' }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="40 60"
        fill="none"
      />
    </svg>
  );
}