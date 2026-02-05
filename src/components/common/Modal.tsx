'use client';

import React from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';

interface CustomModalProps {
	isOpen: boolean;
	title: string;
	children: React.ReactNode;
	onClose: () => void;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	title,
	children,
	onClose,
	size,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={size}>
			<ModalContent>
				<ModalHeader className="border-b">
					<h3 className="text-xl text-background font-semibold">
						{title}
					</h3>
				</ModalHeader>
				<ModalBody className="space-y-4 py-6">{children}</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CustomModal;
