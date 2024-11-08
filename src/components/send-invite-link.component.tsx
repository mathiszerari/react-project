import { Share } from 'lucide-react';
import { useUserStore } from '../stores/user.store';
import Button from './buttons/button';

const ShareButton = ({ title = 'Wii chat friend request', text = 'Hey I want to be your friend on Wii chat' }) => {
  const user = useUserStore();

  const handleShare = async () => {

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: 'invite-link/' + user.id
        });
      } catch (err) {

      }
    } else {
      alert('Web Share API is not supported in your browser');
    }
  };

  return (
    <Button
      className="relative right-2 z-10"
      variant="primary"
      label="Share link"
      onClick={handleShare}
    />
  );
};

export default ShareButton;