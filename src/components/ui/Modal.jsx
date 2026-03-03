import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-xiwat-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl relative shadow-2xl animate-in zoom-in-95 duration-500">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-xiwat-gray hover:text-xiwat-black transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-10">
                    {title && (
                        <h2 className="text-2xl font-display font-bold mb-8 border-b border-xiwat-lightgray pb-4">
                            {title}
                        </h2>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
