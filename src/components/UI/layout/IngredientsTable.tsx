'use client';

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from '@/constants/select-options';
import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from '@heroui/react';

const IngredientsTable = () => {
	const { ingredients, removeIngredient, isLoading } = useIngredientStore();
	const { isAuth } = useAuthStore();

	const handleDelete = async (id: string) => {
		await removeIngredient(id);
	};

	const getLabel = (
		options: readonly Record<string, string>[],
		item: string,
	) => {
		const option = options.find(({ value }) => value === item);

		return option ? option.label : item;
	};

	if (!isAuth) {
		return (
			<p className="pt-4">
				Для просмотра списка ингредиентов необходимо авторизоваться
			</p>
		);
	}

	return !isLoading && isAuth ? (
		<Table
			aria-label="Список игредиентов"
			classNames={{
				wrapper: 'mt-4',
				table: 'w-full',
				th: 'text-black',
				td: 'text-black',
			}}
		>
			<TableHeader>
				<TableColumn>Название</TableColumn>
				<TableColumn>Категория</TableColumn>
				<TableColumn>Ед. изм.</TableColumn>
				<TableColumn>Цена за единицу</TableColumn>
				<TableColumn>Описание</TableColumn>
				<TableColumn>Действия</TableColumn>
			</TableHeader>
			<TableBody>
				{ingredients.map((ingredient) => (
					<TableRow key={ingredient.id}>
						<TableCell>{ingredient.name}</TableCell>
						<TableCell>
							{getLabel(CATEGORY_OPTIONS, ingredient.category)}
						</TableCell>
						<TableCell>
							{getLabel(UNIT_OPTIONS, ingredient.unit)}
						</TableCell>
						<TableCell>
							{ingredient.pricePerUnit !== null
								? `${ingredient.pricePerUnit} руб.`
								: '-'}
						</TableCell>
						<TableCell>{ingredient.description || '-'}</TableCell>
						<TableCell>
							<Button
								color="danger"
								size="sm"
								onPress={() => handleDelete(ingredient.id)}
							>
								Удалить
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	) : (
		<p className="mt-4">Загрузка...</p>
	);
};

export default IngredientsTable;
