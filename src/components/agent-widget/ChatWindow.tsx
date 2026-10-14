// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import MessageBubble, { ChatMessage } from './MessageBubble';
// import ChatInput from './ChatInput';

// type Props = {
//   messages: ChatMessage[];
//   isTyping: boolean;
//   onSend: (text: string) => void;
//   onClose: () => void;
//   isMobile: boolean;
// };

// // 👇 Yahan naam aur picture change kar sakti hain
// const AGENT_NAME = 'Sophia Carter';
// const AGENT_AVATAR = '/sophia.jpg'; // apni photo public/sophia.jpg mein rakhein (optional)
// const BODY_BG = '#F8FAFF';

// // 👇 Quick reply buttons (text badal sakti hain)
// const QUICK_REPLIES = [
//   '💼 Get a Free Quote',
//   '🤖 AI Solutions',
//   '⛓️ Blockchain Development',
//   '📞 Book a Strategy Call',
// ];

// /* Illustrated AI girl avatar (photo na ho to ye dikhega) */
// function AgentAvatarSvg({ size }: { size: number }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
//       <defs>
//         <linearGradient id="bs-av-bg" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0%" stopColor="#DBEAFE" />
//           <stop offset="100%" stopColor="#BFDBFE" />
//         </linearGradient>
//       </defs>
//       <rect width="100" height="100" fill="url(#bs-av-bg)" />
//       {/* hair back */}
//       <path d="M20 50 C18 18 40 8 52 9 C70 10 84 24 80 52 C80 70 76 82 70 86 L30 86 C24 80 20 66 20 50 Z" fill="#5B3A29" />
//       {/* shoulders */}
//       <path d="M10 100 C12 78 30 70 50 70 C70 70 88 78 90 100 Z" fill="#2563EB" />
//       <path d="M40 70 L50 84 L60 70 Z" fill="#F8D5B8" />
//       {/* neck */}
//       <rect x="43" y="58" width="14" height="16" rx="5" fill="#F2C7A5" />
//       {/* face */}
//       <ellipse cx="50" cy="46" rx="21" ry="24" fill="#F8D5B8" />
//       {/* bangs */}
//       <path d="M28 44 C26 22 40 14 52 15 C66 16 74 28 72 44 C66 34 56 30 46 28 C38 32 32 36 28 44 Z" fill="#5B3A29" />
//       {/* eyebrows */}
//       <path d="M36 41 Q42 38 47 41" stroke="#3B2417" strokeWidth="1.6" fill="none" strokeLinecap="round" />
//       <path d="M53 41 Q58 38 64 41" stroke="#3B2417" strokeWidth="1.6" fill="none" strokeLinecap="round" />
//       {/* eyes */}
//       <ellipse cx="42" cy="48" rx="2.6" ry="3.2" fill="#2B1B12" />
//       <ellipse cx="58" cy="48" rx="2.6" ry="3.2" fill="#2B1B12" />
//       <circle cx="43" cy="46.8" r="0.9" fill="#fff" />
//       <circle cx="59" cy="46.8" r="0.9" fill="#fff" />
//       {/* cheeks */}
//       <circle cx="36" cy="56" r="4" fill="#F4A6A0" opacity="0.45" />
//       <circle cx="64" cy="56" r="4" fill="#F4A6A0" opacity="0.45" />
//       {/* smile */}
//       <path d="M43 58 Q50 65 57 58" stroke="#C0504D" strokeWidth="2" fill="none" strokeLinecap="round" />
//       {/* headset */}
//       <path d="M26 46 C26 18 74 18 74 46" stroke="#1E3A8A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
//       <rect x="22" y="43" width="7" height="14" rx="3.5" fill="#1E3A8A" />
//       <rect x="71" y="43" width="7" height="14" rx="3.5" fill="#1E3A8A" />
//       <path d="M25 56 Q27 68 42 67" stroke="#1E3A8A" strokeWidth="2" fill="none" strokeLinecap="round" />
//       <circle cx="43" cy="67" r="2.6" fill="#3B82F6" />
//     </svg>
//   );
// }

// export default function ChatWindow({
//   messages,
//   isTyping,
//   onSend,
//   onClose,
//   isMobile,
// }: Props) {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [imgError, setImgError] = useState(false);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, isTyping]);

//   // Quick replies sirf shuru mein dikhengi (jab sirf welcome message ho)
//   const showQuickReplies = messages.length === 1 && !isTyping;

//   const containerStyle: React.CSSProperties = isMobile
//     ? {
//         position: 'fixed',
//         inset: 0,
//         width: '100%',
//         height: '100%',
//         background: '#FFFFFF',
//         display: 'flex',
//         flexDirection: 'column',
//         zIndex: 9999,
//       }
//     : {
//         position: 'fixed',
//         bottom: 110,
//         right: 24,
//         width: 380,
//         height: 540,
//         maxHeight: 'calc(100vh - 130px)',
//         background: '#FFFFFF',
//         borderRadius: 22,
//         boxShadow:
//           '0 20px 60px rgba(15, 40, 100, 0.32), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(59,130,246,0.18), 0 0 28px rgba(59,130,246,0.18)',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//         zIndex: 9999,
//         animation: 'bs-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
//       };

//   return (
//     <div style={containerStyle} role="dialog" aria-label="BawdicSoft AI Chat">
//       <style>{`
//         @keyframes bs-slide-up {
//           from { opacity: 0; transform: translateY(24px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes bs-dot {
//           0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
//           40% { transform: translateY(-4px); opacity: 1; }
//         }
//         @keyframes bs-pulse-ring {
//           0%   { transform: scale(1);   opacity: 0.6; }
//           100% { transform: scale(1.35); opacity: 0; }
//         }
//         @keyframes bs-blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.4; }
//         }
//         @keyframes bs-msg-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .bs-msg-in { animation: bs-msg-in 0.3s ease-out; }

//         .bs-close-btn { transition: background 0.2s ease, transform 0.2s ease; }
//         .bs-close-btn:hover { background: rgba(255,255,255,0.3) !important; transform: rotate(90deg); }

//         .bs-chip {
//           background: #FFFFFF;
//           color: #1D4ED8;
//           border: 1.5px solid #BFDBFE;
//           border-radius: 999px;
//           padding: 8px 14px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           animation: bs-msg-in 0.4s ease-out both;
//         }
//         .bs-chip:hover {
//           background: linear-gradient(135deg, #1D4ED8, #3B82F6);
//           color: #FFFFFF;
//           border-color: transparent;
//           transform: translateY(-2px);
//           box-shadow: 0 6px 14px rgba(37,99,235,0.35);
//         }

//         .bs-scroll::-webkit-scrollbar { width: 6px; }
//         .bs-scroll::-webkit-scrollbar-track { background: transparent; }
//         .bs-scroll::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 999px; }
//         .bs-scroll::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
//       `}</style>

//       {/* Header */}
//       <div
//         style={{
//           position: 'relative',
//           background: 'linear-gradient(135deg, #172554 0%, #1D4ED8 55%, #3B82F6 100%)',
//           color: '#FFFFFF',
//           padding: '20px 18px 40px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexShrink: 0,
//           overflow: 'hidden',
//         }}
//       >
//         {/* decorative glass circles */}
//         <span
//           style={{
//             position: 'absolute',
//             top: -40,
//             right: -30,
//             width: 140,
//             height: 140,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.08)',
//           }}
//         />
//         <span
//           style={{
//             position: 'absolute',
//             bottom: -30,
//             left: 60,
//             width: 90,
//             height: 90,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.06)',
//           }}
//         />

//         <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
//           {/* Avatar */}
//           <div style={{ position: 'relative', width: 58, height: 58, flexShrink: 0 }}>
//             {/* pulse ring */}
//             <span
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 borderRadius: '50%',
//                 border: '2px solid rgba(255,255,255,0.7)',
//                 animation: 'bs-pulse-ring 2s ease-out infinite',
//               }}
//             />
//             <div
//               style={{
//                 width: 58,
//                 height: 58,
//                 borderRadius: '50%',
//                 overflow: 'hidden',
//                 border: '3px solid #FFFFFF',
//                 boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
//                 background: '#DBEAFE',
//                 position: 'relative',
//               }}
//             >
//               {!imgError ? (
//                 <img
//                   src={AGENT_AVATAR}
//                   alt={AGENT_NAME}
//                   onError={() => setImgError(true)}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     objectPosition: '35% 20%',
//                     display: 'block',
//                   }}
//                 />
//               ) : (
//                 <AgentAvatarSvg size={52} />
//               )}
//             </div>
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
//           </div>

//           {/* Name + status */}
//           <div>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 8,
//                 fontSize: 12,
//                 opacity: 0.95,
//                 lineHeight: 1.2,
//                 letterSpacing: 0.3,
//               }}
//             >
//               <span style={{ opacity: 0.85 }}>Chat with</span>
//               <span
//                 style={{
//                   background: 'rgba(255,255,255,0.18)',
//                   border: '1px solid rgba(255,255,255,0.3)',
//                   borderRadius: 999,
//                   padding: '1px 8px',
//                   fontSize: 10,
//                   fontWeight: 600,
//                 }}
//               >
//                 ✦ AI Assistant
//               </span>
//             </div>
//             <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.25 }}>{AGENT_NAME}</div>
//             <div
//               style={{
//                 fontSize: 11.5,
//                 opacity: 0.9,
//                 marginTop: 3,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 6,
//               }}
//             >
//               <span
//                 style={{
//                   width: 7,
//                   height: 7,
//                   borderRadius: '50%',
//                   background: '#4ADE80',
//                   display: 'inline-block',
//                   animation: 'bs-blink 1.8s infinite',
//                 }}
//               />
//               Online now · Replies instantly
//             </div>
//           </div>
//         </div>

//         <button
//           className="bs-close-btn"
//           onClick={onClose}
//           aria-label="Close chat"
//           style={{
//             position: 'relative',
//             background: 'rgba(255,255,255,0.16)',
//             border: 'none',
//             borderRadius: '50%',
//             width: 34,
//             height: 34,
//             color: '#FFFFFF',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignSelf: 'flex-start',
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </button>

//         {/* Wave */}
//         <svg
//           viewBox="0 0 360 24"
//           preserveAspectRatio="none"
//           style={{
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             bottom: -1,
//             width: '100%',
//             height: 24,
//             display: 'block',
//           }}
//         >
//           <path
//             d="M0 24 L0 12 C70 30 130 -6 210 8 C280 20 330 4 360 12 L360 24 Z"
//             fill={BODY_BG}
//           />
//         </svg>
//       </div>

//       {/* Messages */}
//       <div
//         ref={scrollRef}
//         className="bs-scroll"
//         style={{
//           flex: 1,
//           overflowY: 'auto',
//           padding: '6px 14px 16px',
//           backgroundColor: BODY_BG,
//           backgroundImage: 'radial-gradient(rgba(37,99,235,0.07) 1px, transparent 1px)',
//           backgroundSize: '16px 16px',
//           scrollBehavior: 'smooth',
//         }}
//       >
//         {/* Today divider */}
//         <div style={{ textAlign: 'center', margin: '4px 0 12px' }}>
//           <span
//             style={{
//               background: '#E8EEFB',
//               color: '#64748B',
//               fontSize: 10.5,
//               fontWeight: 600,
//               padding: '3px 12px',
//               borderRadius: 999,
//               letterSpacing: 0.4,
//             }}
//           >
//             Today
//           </span>
//         </div>

//         {messages.map((m) => (
//           <div key={m.id} className="bs-msg-in">
//             <MessageBubble message={m} />
//           </div>
//         ))}

//         {/* Quick replies */}
//         {showQuickReplies && (
//           <div
//             style={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: 8,
//               marginTop: 6,
//               marginBottom: 10,
//             }}
//           >
//             {QUICK_REPLIES.map((q, i) => (
//               <button
//                 key={q}
//                 className="bs-chip"
//                 style={{ animationDelay: `${0.15 + i * 0.08}s` }}
//                 onClick={() => onSend(q)}
//               >
//                 {q}
//               </button>
//             ))}
//           </div>
//         )}

//         {isTyping && (
//           <div
//             className="bs-msg-in"
//             style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}
//           >
//             <div
//               style={{
//                 width: 28,
//                 height: 28,
//                 borderRadius: '50%',
//                 overflow: 'hidden',
//                 flexShrink: 0,
//                 border: '2px solid #FFFFFF',
//                 boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
//               }}
//             >
//               {!imgError ? (
//                 <img
//                   src={AGENT_AVATAR}
//                   alt=""
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     objectPosition: '35% 20%',
//                     display: 'block',
//                   }}
//                 />
//               ) : (
//                 <AgentAvatarSvg size={24} />
//               )}
//             </div>
//             <div
//               style={{
//                 background: '#EEF2FF',
//                 padding: '12px 16px',
//                 borderRadius: 16,
//                 borderBottomLeftRadius: 4,
//                 display: 'flex',
//                 gap: 5,
//                 alignItems: 'center',
//               }}
//             >
//               {[0, 1, 2].map((i) => (
//                 <span
//                   key={i}
//                   style={{
//                     width: 7,
//                     height: 7,
//                     borderRadius: '50%',
//                     background: '#2563EB',
//                     display: 'inline-block',
//                     animation: `bs-dot 1.2s infinite ${i * 0.15}s`,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input */}
//       <ChatInput onSend={onSend} disabled={isTyping} />

//       {/* Footer */}
//       <div
//         style={{
//           textAlign: 'center',
//           fontSize: 10.5,
//           color: '#94A3B8',
//           padding: '6px 0 8px',
//           background: '#FFFFFF',
//           borderTop: '1px solid #F1F5F9',
//           flexShrink: 0,
//         }}
//       >
//         Powered by <strong style={{ color: '#2563EB' }}>BawdicSoft AI</strong>
//         <div style={{ fontSize: 9, color: '#CBD5E1', marginTop: 2 }}>
//           Photo by Grigory Alekhin on Vecteezy
//         </div>
//       </div>
//     </div>
//   );
// }