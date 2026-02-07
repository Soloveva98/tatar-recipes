'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { signInWithCredentials } from '@/actions/sign-in';
import { useToastStore } from '@/store/toast.store';

interface LoginFormProps {
	onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { showToast } = useToastStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const result = await signInWithCredentials(
				formData.email,
				formData.password,
			);

			if (result.success) {
				onClose();
				showToast('Авторизация пройдена успешно.', 'success');
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				showToast(
					result.error || 'Ошибка при авторизации. Попробуйте снова.',
					'error',
				);
			}
		} catch (error) {
			showToast('Произошла ошибка. Попробуйте позже.', 'error');
			onClose();
		}
	};

	return (
		<Form className="w-full" onSubmit={handleSubmit}>
			<Input
				isRequired
				name="email"
				placeholder="Введите email"
				type="email"
				value={formData.email}
				onChange={(e) =>
					setFormData({ ...formData, email: e.target.value })
				}
				classNames={{
					inputWrapper: 'bg-default-100',
					input: 'text-sm focus:outline-none',
				}}
				validate={(value) => {
					if (!value) return 'Почта обязательна';
					return null;
				}}
			/>
			<Input
				isRequired
				name="password"
				placeholder="Введите пароль"
				type="password"
				value={formData.password}
				onChange={(e) =>
					setFormData({ ...formData, password: e.target.value })
				}
				classNames={{
					inputWrapper: 'bg-default-100',
					input: 'text-sm focus:outline-none',
				}}
				validate={(value) => {
					if (!value) return 'Пароль обязателен';
					return null;
				}}
			/>
			<div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>
				<Button type="submit" color="primary">
					Войти
				</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
