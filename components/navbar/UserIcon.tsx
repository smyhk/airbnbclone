import { LuUser } from 'react-icons/lu';

import { fetchProfileImageAction } from '@/utils/actions';

export default async function UserIcon() {
  const profileImage = await fetchProfileImageAction();
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="your profile image"
        className="w-6 h-6 rounded-full object-cover "
      />
    );
  }
  return <LuUser className="2-6 h-6 bg-primary rounded-full text-white" />;
}
