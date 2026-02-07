'use client';

import { useToastStore } from '@/store/toast.store';
import Toast from './Toast';

const ToastContainer = () => {
	const { message, type, isVisible, hideToast } = useToastStore();

	return (
		<Toast
			message={message}
			type={type}
			isVisible={isVisible}
			onClose={hideToast}
		/>
	);
};

export default ToastContainer;
