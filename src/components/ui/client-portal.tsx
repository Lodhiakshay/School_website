'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ClientPortalProps {
  children: React.ReactNode;
  selector?: string;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ children, selector }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  const container = selector ? document.querySelector(selector) : document.body;
  if (!container) return null;

  return createPortal(children, container);
};

