import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export type ToastVariant = 'info' | 'success' | 'error';
export interface ToastMessage {
id: string;
variant: ToastVariant;
title: string;
message?: string;
duration?: number;
}
export interface ToastProps extends ToastMessage {
onDismiss: (id: string) => void;
}
const variantStyles: Record<ToastVariant, { icon: React.ReactNode; classes: string }> = {
info: {
icon: <Info className="w-5 h-5 text-sky-400" />,
classes: 'border-sky-400/20 bg-sky-500/10',
},
success: {
icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
classes: 'border-emerald-400/20 bg-emerald-500/10',
},
error: {
icon: <AlertCircle className="w-5 h-5 text-red-400" />,
classes: 'border-red-400/20 bg-red-500/10',
},
};
export function Toast({ id, variant, title, message, duration = 4000, onDismiss }: ToastProps) {
useEffect(() => {
const timer = setTimeout(() => onDismiss(id), duration);
return () => clearTimeout(timer);
}, [id, duration, onDismiss]);
const style = variantStyles[variant];
return (
<motion.div
layout
initial={{ opacity: 0, y: -20, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -10, scale: 0.95 }}
className={twMerge(
clsx(
'relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-glass-lg',
'max-w-sm w-full',
style.classes
)
)}
      <div className="shrink-0 mt-0.5">{style.icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200">{title}</p>
        {message && <p className="text-sm text-slate-400 mt-0.5">{message}</p>}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 text-zinc-500 hover:text-slate-300 transition-colors"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
export function ToastContainer({ toasts, onDismiss }: { toasts: ToastMessage[]; onDismiss: (id: string) => void }) {
return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast {...toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
export function useToast() {
const [toasts, setToasts] = useState<ToastMessage[]>([]);
const addToast = (toast: Omit<ToastMessage, 'id'>) => {
const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
setToasts((prev) => [...prev, { ...toast, id }]);
};
const dismissToast = (id: string) => {
setToasts((prev) => prev.filter((t) => t.id !== id));
};
const dismissAll = () => {
setToasts([]);
};
return { toasts, addToast, dismissToast, dismissAll };
}