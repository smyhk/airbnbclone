'use server';

import { profileSchema } from './schemas';

export const createProfileAction = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: 'profile created' };
  } catch (error) {
    console.error(error);
    return { message: 'there was an error' };
  }
};
