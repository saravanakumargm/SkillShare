
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { SkillRequest } from '@/lib/types';
import { dummyRequests } from '@/lib/data';

interface RequestContextType {
  requests: SkillRequest[];
  addRequest: (request: SkillRequest) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<SkillRequest[]>(dummyRequests);

  const addRequest = (request: SkillRequest) => {
    setRequests(prevRequests => [request, ...prevRequests]);
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
}
