'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import ProactiveCard from './ProactiveCard';
import { ChatMessage } from './MessageBubble';
import { useVisitorTracking } from '@/lib/tracking/useVisitorTracking';
import { getOpenerForPage } from '@/lib/tracking/contextualOpeners';
import { getCardForPage } from '@/lib/tracking/pageMessages';
import { INTENT_THRESHOLD_FIRE, isMaxIntent } from '@/lib/tracking/intentEngine';

const AUTO_OPEN_DELAY_MS = 1500;
const CARD_SHOW_DELAY_MS = 4000;
const INIT_LOADER_MS = 900;

function makeId() {
  return `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const { intent, signals, visitorId } = useVisitorTracking();

  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardDismissed, setCardDismissed] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const autoOpenFiredRef = useRef(false);
  const cardShownRef = useRef(false);
  const backendTriggerFiredRef = useRef(false);
  const initStartedRef = useRef(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset card on page change
  useEffect(() => {
    cardShownRef.current = false;
    setShowCard(false);
    setCardDismissed(false);
  }, [pathname]);

  // Listen for backend proactive trigger
  useEffect(() => {
    const handler = (e: Event) => {
      if (backendTriggerFiredRef.current) return;
      const customEvent = e as CustomEvent<{ message: string; page: string }>;
      const { message } = customEvent.detail || {};
      if (!message) return;

      backendTriggerFiredRef.current = true;
      initStartedRef.current = true;
      setShowCard(false);

      setIsOpen(true);
      setHasAutoOpened(true);
      setIsInitializing(true);

      setTimeout(() => {
        setMessages([
          {
            id: makeId(),
            role: 'agent',
            text: message,
            timestamp: Date.now(),
          },
        ]);
        setIsInitializing(false);
      }, INIT_LOADER_MS);
    };

    window.addEventListener('bawdic:proactive-trigger', handler);
    return () => window.removeEventListener('bawdic:proactive-trigger', handler);
  }, []);

  // Show proactive card after delay
  useEffect(() => {
    if (cardDismissed || isOpen || cardShownRef.current) return;
    if (isMobile) return;

    const timer = setTimeout(() => {
      if (!cardShownRef.current && !isOpen) {
        cardShownRef.current = true;
        setShowCard(true);
      }
    }, CARD_SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname, cardDismissed, isOpen, isMobile]);

  // Seed opener with loader — FIXED (no infinite loop)
  useEffect(() => {
    if (
      isOpen &&
      messages.length === 0 &&
      !backendTriggerFiredRef.current &&
      !initStartedRef.current
    ) {
      initStartedRef.current = true;
      setIsInitializing(true);

      const timer = setTimeout(() => {
        setMessages([
          {
            id: makeId(),
            role: 'agent',
            text: getOpenerForPage(pathname),
            timestamp: Date.now(),
          },
        ]);
        setIsInitializing(false);
      }, INIT_LOADER_MS);

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, pathname]);

  // Auto-open on Hot intent
  useEffect(() => {
    if (autoOpenFiredRef.current) return;
    if (backendTriggerFiredRef.current) return;
    if (intent.score >= INTENT_THRESHOLD_FIRE) {
      autoOpenFiredRef.current = true;
      setShowCard(false);
      setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, isMaxIntent(intent.score) ? 300 : AUTO_OPEN_DELAY_MS);
    }
  }, [intent.score]);

  // Toggle launcher
  const handleToggle = () => {
    setShowCard(false);
    setIsOpen((v) => {
      if (v) {
        // Closing — reset init flag
        initStartedRef.current = false;
        setIsInitializing(false);
      }
      return !v;
    });
  };

  // Card: View More → open chat with loader
  const handleCardViewMore = () => {
    setShowCard(false);
    initStartedRef.current = false;
    setIsInitializing(false);
    setIsOpen(true);
  };

  const handleCardDismiss = () => {
    setShowCard(false);
    setCardDismissed(true);
  };

  // Send handler
  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setIsTyping(true);

    try {
      const payload = history.map((m) => ({
        role: m.role === 'agent' ? 'assistant' : 'user',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payload,
          visitorId,
          intentScore: intent.score,
          page: pathname,
        }),
      });

      const data = await res.json();

      if (!data.ok || !data.reply) {
        throw new Error(data.error || 'Agent reply failed');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'agent',
          text: data.reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      const errMsg = err instanceof Error ? err.message : '';
      const isConfigIssue =
        errMsg.includes('API key') || errMsg.includes('401');

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'agent',
          text: isConfigIssue
            ? 'The agent is being set up. Please try again soon or email hello@bawdicsoft.com.'
            : "Sorry, I'm having a connection issue. Please try again in a moment.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const cardData = getCardForPage(pathname);

  return (
    <>
      <AnimatePresence>
        {showCard && !isOpen && (
          <ProactiveCard
            card={cardData}
            onViewMore={handleCardViewMore}
            onDismiss={handleCardDismiss}
          />
        )}
      </AnimatePresence>

      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSend={handleSend}
          onClose={() => {
            initStartedRef.current = false;
            setIsInitializing(false);
            setIsOpen(false);
          }}
          isMobile={isMobile}
          isInitializing={isInitializing}
        />
      )}

      {!isOpen && (
        <button
          onClick={handleToggle}
          aria-label="Chat with us"
          style={{
            position: 'fixed',
            bottom: 26,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#1E3A5F',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(30,58,95,0.35)',
            zIndex: 9998,
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'scale(1.06)')
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12C21 16.4183 16.9706 20 12 20C10.8029 20 9.66361 19.7768 8.62479 19.3679L3 21L4.52297 15.6572C4.18557 14.8577 4 13.9663 4 12C4 7.58172 8.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      )}

      <span style={{ display: 'none' }} data-visitor-id={visitorId}>
        intent:{intent.score}
      </span>
    </>
  );
}