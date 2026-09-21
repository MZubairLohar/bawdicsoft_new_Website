'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageCard } from '@/lib/tracking/pageMessages';
import { ButtonSpinner, AGENT_NAME } from './AgentLoader';

type Props = {
  card: PageCard;
  onViewMore: () => void;
  onDismiss: () => void;
};

const CARD_LOADING_MS = 900;

export default function ProactiveCard({ card, onViewMore, onDismiss }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleViewMore = () => {
    if (isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      onViewMore();
      setIsOpening(false);
    }, CARD_LOADING_MS);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes bawdicOnlinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes bawdicSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bawdicTypingDots {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        style={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          width: 320,
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          zIndex: 9997,
          fontFamily: 'inherit',
        }}
      >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                position: 'relative',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2A4A75 0%, #1E3A5F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.15)',
                flexShrink: 0,
              }}
            >
              A
              <span
                style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#22C55E',
                  border: '2px solid #1E3A5F',
                  animation: 'bawdicOnlinePulse 2s ease-out infinite',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2 }}>
                {AGENT_NAME}
              </div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 2,
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
            onClick={onDismiss}
            aria-label="Dismiss"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              opacity: 0.7,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px' }}>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: '#374151',
              margin: 0,
              marginBottom: 16,
            }}
          >
            {card.message}
          </p>

          <button
            onClick={handleViewMore}
            disabled={isOpening}
            style={{
              width: '100%',
              padding: '11px 18px',
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2A4A75 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: isOpening ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(30,58,95,0.25)',
              opacity: isOpening ? 0.9 : 1,
            }}
            onMouseEnter={(e) => {
              if (isOpening) return;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(30,58,95,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(30,58,95,0.25)';
            }}
          >
            {isOpening ? (
              <>
                <ButtonSpinner />
                {AGENT_NAME} is joining…
              </>
            ) : (
              <>
                {card.cta || `Chat with ${AGENT_NAME}`}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>

          {isOpening && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: 12,
              }}
            >
              <span style={{ fontSize: 11, color: '#6B7280' }}>
                {AGENT_NAME} is preparing your chat
              </span>
              <span style={{ display: 'flex', gap: 3 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#1E3A5F',
                      animation: 'bawdicTypingDots 1.2s infinite',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}