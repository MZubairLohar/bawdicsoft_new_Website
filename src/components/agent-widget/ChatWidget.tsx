// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { AnimatePresence } from 'framer-motion';
// import ChatWindow from './ChatWindow';
// import ProactiveCard from './ProactiveCard';
// import { ChatMessage } from './MessageBubble';
// import { useVisitorTracking } from '@/lib/tracking/useVisitorTracking';
// import { getOpenerForPage } from '@/lib/tracking/contextualOpeners';
// import { getCardForPage } from '@/lib/tracking/pageMessages';
// import { INTENT_THRESHOLD_FIRE, isMaxIntent } from '@/lib/tracking/intentEngine';

// const AUTO_OPEN_DELAY_MS = 1500;
// const CARD_SHOW_DELAY_MS = 4000;

// function makeId() {
//   return `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
// }

// export default function ChatWidget() {
//   const pathname = usePathname();
//   const { intent, visitorId } = useVisitorTracking();

//   const [isOpen, setIsOpen] = useState(false);
//   const [showCard, setShowCard] = useState(false);
//   const [cardDismissed, setCardDismissed] = useState(false);
//   const [hasAutoOpened, setHasAutoOpened] = useState(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const autoOpenFiredRef = useRef(false);
//   const cardShownRef = useRef(false);
//   const backendTriggerFiredRef = useRef(false);

//   // Detect mobile
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 640);
//     check();
//     window.addEventListener('resize', check);
//     return () => window.removeEventListener('resize', check);
//   }, []);

//   // Reset card on page change
//   useEffect(() => {
//     cardShownRef.current = false;
//     setShowCard(false);
//     setCardDismissed(false);
//   }, [pathname]);

//   // Listen for backend proactive trigger
//   useEffect(() => {
//     const handler = (e: Event) => {
//       if (backendTriggerFiredRef.current) return;

//       const customEvent = e as CustomEvent<{
//         message: string;
//         page: string;
//       }>;

//       const { message } = customEvent.detail || {};
//       if (!message) return;

//       backendTriggerFiredRef.current = true;
//       setShowCard(false);
//       setIsOpen(true);
//       setHasAutoOpened(true);

//       setMessages([
//         {
//           id: makeId(),
//           role: 'agent',
//           text: message,
//           timestamp: Date.now(),
//         },
//       ]);
//     };

//     window.addEventListener('bawdic:proactive-trigger', handler);
//     return () => window.removeEventListener('bawdic:proactive-trigger', handler);
//   }, []);

//   // Show proactive card after delay
//   useEffect(() => {
//     if (cardDismissed || isOpen || cardShownRef.current) return;
//     if (isMobile) return;

//     const timer = setTimeout(() => {
//       if (!cardShownRef.current && !isOpen) {
//         cardShownRef.current = true;
//         setShowCard(true);
//       }
//     }, CARD_SHOW_DELAY_MS);

//     return () => clearTimeout(timer);
//   }, [pathname, cardDismissed, isOpen, isMobile]);

//   // Seed contextual opener on open
//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       setMessages([
//         {
//           id: makeId(),
//           role: 'agent',
//           text: getOpenerForPage(pathname),
//           timestamp: Date.now(),
//         },
//       ]);
//     }
//   }, [isOpen, messages.length, pathname]);

//   // Auto-open on Hot intent
//   useEffect(() => {
//     if (autoOpenFiredRef.current) return;
//     if (backendTriggerFiredRef.current) return;

//     if (intent.score >= INTENT_THRESHOLD_FIRE) {
//       autoOpenFiredRef.current = true;
//       setShowCard(false);

//       setTimeout(() => {
//         setIsOpen(true);
//         setHasAutoOpened(true);
//       }, isMaxIntent(intent.score) ? 300 : AUTO_OPEN_DELAY_MS);
//     }
//   }, [intent.score]);

//   // User clicks launcher
//   const handleToggle = () => {
//     setShowCard(false);
//     setIsOpen((v) => !v);
//   };

//   // Card actions
//   const handleCardViewMore = () => {
//     setShowCard(false);
//     setIsOpen(true);
//   };

//   const handleCardDismiss = () => {
//     setShowCard(false);
//     setCardDismissed(true);
//   };

//   // Send handler
//   const handleSend = async (text: string) => {
//     const userMsg: ChatMessage = {
//       id: makeId(),
//       role: 'user',
//       text,
//       timestamp: Date.now(),
//     };

//     const history = [...messages, userMsg];
//     setMessages(history);
//     setIsTyping(true);

//     try {
//       const payload = history.map((m) => ({
//         role: m.role === 'agent' ? 'assistant' : 'user',
//         content: m.text,
//       }));

//       const res = await fetch('/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           messages: payload,
//           visitorId,
//           intentScore: intent.score,
//           page: pathname,
//         }),
//       });

//       const data = await res.json();

//       if (!data.ok || !data.reply) {
//         throw new Error(data.error || 'Agent reply failed');
//       }

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: makeId(),
//           role: 'agent',
//           text: data.reply,
//           timestamp: Date.now(),
//         },
//       ]);
//     } catch (err) {
//       console.error('Chat error:', err);

//       const errMsg = err instanceof Error ? err.message : '';
//       const isConfigIssue =
//         errMsg.includes('API key') || errMsg.includes('401');

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: makeId(),
//           role: 'agent',
//           text: isConfigIssue
//             ? 'The agent is being set up. Please try again soon or email hello@bawdicsoft.com.'
//             : "Sorry, I'm having a connection issue. Please try again in a moment.",
//           timestamp: Date.now(),
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const cardData = getCardForPage(pathname);

//   return (
//     <>
//       {/* Floating and pulse animations */}
//       <style>{`
//         @keyframes bawdic-float {
//           0%, 100% { transform: translateY(0); }
//           50%      { transform: translateY(-22px); }
//         }
//         @keyframes bawdic-pulse {
//           0%   { transform: scale(1);   opacity: 0.7; }
//           100% { transform: scale(1.5); opacity: 0; }
//         }
//         .bawdic-launcher { animation: bawdic-float 3s ease-in-out infinite; }
//         .bawdic-launcher:hover { animation-play-state: paused; }
//         @media (prefers-reduced-motion: reduce) {
//           .bawdic-launcher { animation: none; }
//         }
//       `}</style>

//       {/* Proactive Card */}
//       <AnimatePresence>
//         {showCard && !isOpen && (
//           <ProactiveCard
//             card={cardData}
//             onViewMore={handleCardViewMore}
//             onDismiss={handleCardDismiss}
//           />
//         )}
//       </AnimatePresence>

//       {/* Chat Window */}
//       {isOpen && (
//         <ChatWindow
//           messages={messages}
//           isTyping={isTyping}
//           onSend={handleSend}
//           onClose={() => setIsOpen(false)}
//           isMobile={isMobile}
//         />
//       )}

//       {/* Launcher: label + avatar, floats together */}
//       {!isOpen && (
//         <div
//           className="bawdic-launcher"
//           style={{
//             position: 'fixed',
//             bottom: 90,
//             right: 24,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 10,
//             zIndex: 9998,
//           }}
//         >
//           {/* "Chat with Sophia" label (desktop only, hides when proactive card shows) */}
//           {!isMobile && !showCard && (
//             <span
//               onClick={handleToggle}
//               style={{
//                 background: '#FFFFFF',
//                 color: '#1E3A8A',
//                 fontSize: 13,
//                 fontWeight: 600,
//                 padding: '8px 14px',
//                 borderRadius: 999,
//                 boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
//                 cursor: 'pointer',
//                 whiteSpace: 'nowrap',
//               }}
//             >
//               Chat with Sophia 👋
//             </span>
//           )}

//           <button
//             onClick={handleToggle}
//             aria-label="Chat with Sophia"
//             style={{
//               position: 'relative',
//               width: 64,
//               height: 64,
//               padding: 0,
//               borderRadius: '50%',
//               border: '3px solid #FFFFFF',
//               background: '#DBEAFE',
//               cursor: 'pointer',
//               boxShadow: '0 10px 28px rgba(30,58,138,0.45)',
//               transition: 'scale 0.2s ease',
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.scale = '1.08')}
//             onMouseLeave={(e) => (e.currentTarget.style.scale = '1')}
//           >
//             {/* Sophia Avatar */}
//             <img
//               src="/sophia.jpg"
//               alt="Sophia"
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 objectPosition: '35% 20%',
//                 borderRadius: '50%',
//                 display: 'block',
//               }}
//             />

//             {/* Online dot */}
//             <span
//               style={{
//                 position: 'absolute',
//                 bottom: 2,
//                 right: 2,
//                 width: 14,
//                 height: 14,
//                 borderRadius: '50%',
//                 background: '#22C55E',
//                 border: '2.5px solid #FFFFFF',
//               }}
//             />

//             {/* Pulse Ring */}
//             {!hasAutoOpened && (
//               <span
//                 style={{
//                   position: 'absolute',
//                   inset: -3,
//                   borderRadius: '50%',
//                   border: '2px solid rgba(59,130,246,0.8)',
//                   animation: 'bawdic-pulse 2s ease-out infinite',
//                   pointerEvents: 'none',
//                 }}
//               />
//             )}
//           </button>
//         </div>
//       )}

//       {/* Debug meta */}
//       <span style={{ display: 'none' }} data-visitor-id={visitorId}>
//         intent:{intent.score}
//       </span>
//     </>
//   );
// }