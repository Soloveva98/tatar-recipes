'use client';

import React from 'react';
import CustomModal from '@/components/common/Modal';
import RegistrationForm from '@/forms/RegistrationForm';

interface RegistrationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<CustomModal
			isOpen={isOpen}
			onClose={onClose}
			title="Регистрация"
		>
			<RegistrationForm onClose={onClose} />
		</CustomModal>
	);
};

export default RegistrationModal;
