'use client';

import React from 'react';
import CustomModal from '@/components/common/Modal';
import LoginForm from '@/forms/LoginForm';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			title="Авторизация"
		>
			<LoginForm onClose={onClose} />
		</CustomModal>
	);
};

export default LoginModal;
