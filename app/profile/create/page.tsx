import FormInput from '@/components/form/FormInput';
import SubmitButton from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';

const createProfileAction = async (prevState: unknown, formData: FormData) => {
  'use server';

  const firstName = formData.get('firstName') as string;
  console.log(firstName);
  return { message: 'Profile created!' };
};

export default function CreateProfilePage() {
  return (
    <section className="text-2xl font-semibold mb-8 capitalize">
      <h1>new user</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput type="text" name="firstName" label="First Name" />
            <FormInput type="text" name="lastName" label="Last Name" />
            <FormInput type="text" name="userName" label="Userame" />
          </div>
          <SubmitButton text="Create Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
