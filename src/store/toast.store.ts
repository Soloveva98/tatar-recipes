import { ToastType } from '@/types/types';
import { create } from 'zustand';

interface ToastState {
	message: string;
	type: ToastType;
	isVisible: boolean;
	showToast: (message: string, type: ToastType) => void;
	hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
	message: '',
	type: 'info',
	isVisible: false,
	showToast: (message, type) => set({ message, type, isVisible: true }),
	hideToast: () => set({ isVisible: false }),
}));
