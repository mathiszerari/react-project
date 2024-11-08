import { Share } from 'lucide-react';

const ShareButton = ({ title = 'Check this out!', text = 'Interesting content to share', url = window.location.href }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (err) {
        
      }
    } else {
      alert('Web Share API is not supported in your browser');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
    >
      <Share size={20} />
      <span>Share</span>
    </button>
  );
};

export default ShareButton;