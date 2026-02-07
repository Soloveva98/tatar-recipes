'use client';

import { ToastType } from '@/types/types';
import { useEffect } from 'react';

interface ToastProps {
	message: string;
	type: ToastType;
	isVisible: boolean;
	onClose: () => void;
	duration?: number;
}

const TYPE_STYLES = {
	success: 'bg-green-100 border-green-300 text-green-800',
	error: 'bg-red-100 border-red-300 text-red-800',
	info: 'bg-blue-100 border-blue-300 text-blue-800',
	warning: 'bg-yellow-100 border-yellow-300 text-yellow-800',
};

const Toast: React.FC<ToastProps> = ({
	message,
	type,
	isVisible,
	onClose,
	duration = 5000,
}) => {
	useEffect(() => {
		if (isVisible && duration > 0) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-4 left-4 z-50 max-w-md p-4 rounded-lg shadow-lg animate-fade-in-up">
			<div className={`${TYPE_STYLES[type]} p-4 rounded-md`}>
				<div className="flex justify-between items-start">
					<p className="text-sm font-medium">{message}</p>
					<button
						onClick={onClose}
						className="ml-4 text-gray-500 hover:text-gray-700"
					>
						×
					</button>
				</div>
			</div>
		</div>
	);
};

export default Toast;
