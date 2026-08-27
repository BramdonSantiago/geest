import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  onClose: () => void;
};

const Toast = ({ message, onClose }: ToastProps) => {
  const toastRoot = document.getElementById("toast-root");

  if (!toastRoot) {
    return null;
  }

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-lg border border-[#E5EAF0] bg-white px-4 py-3 shadow-[0_8px_30px_rgba(23,32,51,0.08)]"
    >
      <span class="material-symbols-outlined">check</span>
      <span className="text-sm font-medium text-[#172033]">
        {message}
      </span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="flex h-6 w-6 items-center justify-center rounded-md text-[#667085] transition-colors hover:bg-[#F4F7FA] hover:text-[#172033]"
      >
        ×
      </button>
    </div>,
    toastRoot
  );
};

export default Toast;