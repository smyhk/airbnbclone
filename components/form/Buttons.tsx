'use client';

import { useFormStatus } from 'react-dom';
import { Spinner } from '../ui/spinner';
import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  className?: string;
  text?: string;
};

import React from 'react';

export default function Buttons({
  className = '',
  text = 'submit',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
      size="lg"
    >
      {pending ? (
        <>
          <Spinner />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
