'use server';

import prisma from './db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

import { imageSchema, profileSchema, validateWithZodSchema } from './schemas';

// Helper function to validate current user
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error('You must be logged in to access this page');

  // Redirect user to profile creation if first login or new user
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error has occurred',
  };
};

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });

    // Adds metadata to the current clerk user
    const client = await clerkClient();
    client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect('/profile/create');
  return profile;
};

export const updateProfileAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await prisma.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });

    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: unknown,
  formData: FormData
): Promise<{ message: string }> => {
  const image = formData.get('image') as File;
  const validatedFields = validateWithZodSchema(imageSchema, { image });
  return { message: 'Profile image update succcessfully' };
};
