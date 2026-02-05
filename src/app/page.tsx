'use client';

import RecipeCard from '@/components/common/RecipeCard';
import { useAuthStore } from '@/store/auth.store';
import { useRecipeStore } from '@/store/recipe.store';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function Home() {
	const { recipes, isLoading, error } = useRecipeStore();
	const { isAuth } = useAuthStore();

	return (
		<>
			<div className="flex w-full justify-center items-center mb-6">
				{isAuth ? (
					<Link href="/recipes/new">
						<Button color="danger" variant="ghost" size="lg">
							Добавить рецепт
						</Button>
					</Link>
				) : (
					<div className="flex flex-col items-center gap-4">
						<Button
							color="danger"
							variant="ghost"
							size="lg"
							isDisabled
						>
							Добавить рецепт
						</Button>
						<p className="text-danger font-bold">
							Добавление рецептов доступно только для
							авторизованных пользователей
						</p>
					</div>
				)}
			</div>

			{error && <p className="text-red-500 mb-4">{error}</p>}

			{isLoading && <p>Загрузка</p>}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</>
	);
}
