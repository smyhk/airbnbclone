'use client';

import { useState } from 'react';

import Image from 'next/image';
import { SubmitButton } from './Buttons';
import { Button } from '../ui/button';
import ImageInput from './ImageInput';
import { LuUser } from 'react-icons/lu';
import FormContainer from './FormContainer';
import { type actionFunction } from '@/utils/types';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

export default function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props;
  const [isIpdateFormVisible, setUpdateFormVisible] = useState(false);

  const userIcon = (
    <LuUser className="w-24 h-24 bg-primary rouded text-white mb-4" />
  );

  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded object-cover mb-4 w-24 h-24"
        />
      ) : (
        userIcon
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setUpdateFormVisible(prev => !prev)}
      >
        {text}
      </Button>
      {isIpdateFormVisible && (
        <div className="max-w-lg mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" />
          </FormContainer>
        </div>
      )}
    </div>
  );
}
