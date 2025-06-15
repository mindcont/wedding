import { AnimatePresence, motion } from "framer-motion";

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

export function ImageModal({ imageUrl, altText, onClose }: ImageModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-4xl w-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}