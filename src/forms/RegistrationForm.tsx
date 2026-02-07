'use client';

import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { registerUser } from '@/actions/register';
import { useToastStore } from '@/store/toast.store';

interface RegistrationFormProps {
	onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { showToast } = useToastStore();

	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const result = await registerUser(formData);

			if (result.success) {
				showToast(
					'Регистрация пройдена успешно. Пройдите авторизацию.',
					'success',
				);
				onClose();
			} else {
				showToast(
					result.error || 'Ошибка при регистрации. Попробуйте снова.',
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
					if (!validateEmail(value)) return 'Некорректный email';
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
					if (value.length < 6) {
						return 'Пароль должен быть не менее 6 символов';
					}
					return null;
				}}
			/>
			<Input
				isRequired
				name="confirmPassword"
				placeholder="Подтвердите пароль"
				type="password"
				value={formData.confirmPassword}
				onChange={(e) =>
					setFormData({
						...formData,
						confirmPassword: e.target.value,
					})
				}
				classNames={{
					inputWrapper: 'bg-default-100',
					input: 'text-sm focus:outline-none',
				}}
				validate={(value) => {
					if (!value) return 'Пароль для подтверждения обязателен';
					if (value !== formData.password) {
						return 'Пароли не совпадают';
					}
					return null;
				}}
			/>
			<div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
				<Button variant="light" onPress={onClose}>
					Отмена
				</Button>
				<Button type="submit" color="primary">
					Зарегистрироваться
				</Button>
			</div>
		</Form>
	);
};

export default RegistrationForm;
