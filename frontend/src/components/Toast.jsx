import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isInfo = toast.type === 'info';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-none shadow-elora-float border backdrop-blur-md ${
                isError
                  ? 'bg-red-950/90 text-white border-red-700/60'
                  : isInfo
                  ? 'bg-elora-dark/95 text-elora-bg border-elora-taupe/40'
                  : 'bg-elora-dark text-white border-elora-brown/50'
              }`}
            >
              <div className="flex items-center space-x-3 pr-3">
                {isError ? (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                ) : isInfo ? (
                  <Info className="w-5 h-5 text-elora-taupe shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-elora-taupe shrink-0" />
                )}
                <span className="text-xs uppercase tracking-wider font-medium leading-relaxed">
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-white transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
