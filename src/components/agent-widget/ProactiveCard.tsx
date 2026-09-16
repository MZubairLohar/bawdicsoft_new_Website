'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PageCard } from '@/lib/tracking/pageMessages';

type Props = {
  card: PageCard;
  onViewMore: () => void;
  onDismiss: () => void;
};

export default function ProactiveCard({ card, onViewMore, onDismiss }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      style={{
        position: 'fixed',
        bottom: 170,
        right: 24,
        width: 300,
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
          background: '#1E3A5F',
          color: '#FFFFFF',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{card.emoji}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{card.title}</div>
            <div
              style={{
                fontSize: 10,
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22C55E',
                }}
              />
              BawdicSoft AI
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
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
      <div style={{ padding: '14px 16px' }}>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: '#374151',
            margin: 0,
            marginBottom: 14,
          }}
        >
          {card.message}
        </p>
        <button
          onClick={onViewMore}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: '#1E3A5F',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#2A4A75')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#1E3A5F')}
        >
          {card.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}