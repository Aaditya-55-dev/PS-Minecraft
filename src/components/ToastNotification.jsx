import { useEffect } from 'react';

function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-9 bg-[#D28F47] border-[3px] border-[#3F2312] shadow-[inset_3px_3px_0px_#F5BD7D,inset_-3px_-3px_0px_#8C5224,0_8px_16px_rgba(0,0,0,0.7)] text-[#FFFF55] [text-shadow:2px_2px_0px_#2A170A] text-[11px] md:text-[13px] leading-[1.6] py-3.5 px-[18px] md:py-[18px] md:px-7 text-center z-[9999] pointer-events-none max-w-[90vw] transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]"
    >
      {message}
    </div>
  );
}

export default ToastNotification;
