import * as z from 'zod';

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z
    .string()
    .min(2, { error: 'First name must be at least two characters' }),
  lastName: z
    .string()
    .min(2, { error: 'Last name must be at least two characters' }),
  username: z
    .string()
    .min(2, { error: 'Username must be at least two characters' }),
});

export function validateWithZodSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(error => error.message);
    throw new Error(errors.join('. '));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine(file => {
      return !file || file.size <= maxUploadSize;
    }, 'File size must be less than 1MB')
    .refine(file => {
      return (
        !file || acceptedFileTypes.some(type => file.type.startsWith(type))
      );
    }, 'File must be an image');
}
