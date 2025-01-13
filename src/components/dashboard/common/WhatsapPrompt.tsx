import React from "react";

const WhatsAppPromptModal = ({
  isOpen,
  onClose,
  onWhatsAppClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: () => void;
}) => {
  return (
    <div
      className={`inset-0 fixed flex items-center h-fullw-full justify-center bg-gray-300/40 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className=" text-center bg-white rounded-[24px] p-6">
        <div className="flex justify-end">
          <button onClick={onClose}>
          ✕
          </button>
        </div>
        <div className="p-6 text-center ] py-20">
          <p className="text-gray-700 mb-6">
            To proceed, please click the button below to send us a WhatsApp
            message.
          </p>
          <button
            onClick={onWhatsAppClick}
            className="px-4 py-2 bg-primary text-white rounded font-semibold hover:bg-primary-dark"
          >
            Send WhatsApp Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPromptModal;
