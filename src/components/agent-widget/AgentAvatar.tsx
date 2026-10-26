'use client';

import React, { useEffect, useState } from 'react';
import type { Agent } from '@/lib/agents';

type Props = {
  agent: Agent;
  size: number;
};

/** Round avatar: the agent's photo, or a coloured initial if the photo is missing. */
export default function AgentAvatar({ agent, size }: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [agent.id]);

  if (!failed) {
    return (
      <img
        src={agent.avatar}
        alt={agent.name}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          objectPosition: '35% 20%',
          borderRadius: '50%',
          display: 'block',
        }}
      />
    );
  }

  return (
    <div
      aria-label={agent.name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${agent.color}, ${agent.color}CC)`,
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: Math.round(size * 0.42),
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      {agent.firstName.charAt(0)}
    </div>
  );
}