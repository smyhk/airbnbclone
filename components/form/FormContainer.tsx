'use client';

import { useActionState } from 'react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { actionFunction } from '@/utils/types';

const initialState = {
  message: '',
};

export default function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  useEffect(() => {
    if (state.message) {
      toast('', { description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
