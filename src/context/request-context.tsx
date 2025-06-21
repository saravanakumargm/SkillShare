
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { SkillRequest } from '@/lib/types';
import { dummyRequests } from '@/lib/data';

interface RequestContextType {
  requests: SkillRequest[];
  addRequest: (request: SkillRequest) => void;
  updateRequestStatus: (requestId: string, status: 'accepted' | 'declined') => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<SkillRequest[]>(dummyRequests);

  const addRequest = (request: SkillRequest) => {
    setRequests(prevRequests => [request, ...prevRequests]);
  };

  const updateRequestStatus = (requestId: string, status: 'accepted' | 'declined') => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  return (
    <RequestContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
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
