'use client';

import { Recipe } from '@/types/types';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { useRecipeStore } from '@/store/recipe.store';
import Link from 'next/link';
import { useTransition } from 'react';
import Image from 'next/image';
import { UNIT_ABBREVIATIONS } from '@/constants/select-options';
import { useAuthStore } from '@/store/auth.store';

interface RecipeCardProps {
	recipe: Recipe;
	fullCard?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	recipe,
	fullCard = false,
}) => {
	const { removeRecipe } = useRecipeStore();
	const { isAuth } = useAuthStore();
	const [isPending, startTransition] = useTransition();
	const imageHeight = fullCard ? 'h-90' : 'h-48';

	const handleDelete = () => {
		startTransition(async () => {
			try {
				await removeRecipe(recipe.id);

				if (window.location.pathname !== '/') {
					window.location.href = '/';
				}
			} catch (error) {
				console.error('Ошибка при удалении рецепта:', error);
			}
		});
	};

	const getUnitLabel = (unit: string) => {
		const unitOption = UNIT_ABBREVIATIONS.find(
			(option) => option.value === unit,
		);
		return unitOption ? unitOption.label : unit.toLowerCase();
	};

	return (
		<Card
			className={`w-full min-w-[254px] ${fullCard ? '' : 'h-[480px] max-w-md'} flex flex-col`}
		>
			<div className={`${imageHeight} overflow-hidden`}>
				{recipe.imageUrl ? (
					<div
						className={`relative ${imageHeight} group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg`}
					>
						<Image
							src={recipe.imageUrl}
							alt="Image for recipe"
							fill
							className="object-contain transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				) : (
					<div className="w-full h-full bg-gray-200 flex items-center justify-center">
						<span className="text-gray-500">Нет изображения</span>
					</div>
				)}
			</div>

			<CardHeader className="flex justify-between items-center text-black">
				<h2 className="text-xl font-bold">
					{fullCard ? (
						<span>{recipe.name}</span>
					) : (
						<Link href={`/recipes/recipe/${recipe.id}`}>
							{recipe.name}
						</Link>
					)}
				</h2>
			</CardHeader>

			<CardBody className="flex-1 text-black">
				<p className="text-gray-600 line-clamp-6 min-h-[46px]">
					{recipe.description || 'Без описания'}
				</p>
				<h3 className="mt-4 font-semibold">Ингредиенты:</h3>
				<ul
					className={`list-disc pl-5 overflow-y-auto ${fullCard ? '' : 'max-h-24'}`}
				>
					{recipe.ingredients.map((ing) => (
						<li key={ing.id}>
							{ing.ingredient.name}: {ing.quantity}{' '}
							{getUnitLabel(ing.ingredient.unit)}
						</li>
					))}
				</ul>
			</CardBody>

			{isAuth && (
				<div className="flex justify-end gap-2 p-4">
					<Link href={`/recipes/${recipe.id}`}>
						<Button color="primary" variant="light">
							Редактировать
						</Button>
					</Link>
					<Button
						color="danger"
						variant="light"
						onPress={handleDelete}
						isLoading={isPending}
					>
						Удалить
					</Button>
				</div>
			)}
		</Card>
	);
};

export default RecipeCard;
