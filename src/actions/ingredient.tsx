'use server';

import { ingredientSchema } from '@/schema/zod';
import { prisma } from '@/utils/prisma';

export async function createIngredient(formData: FormData) {
	try {
		const data = {
			name: formData.get('name'),
			category: formData.get('category'),
			unit: formData.get('unit'),
			pricePerUnit: formData.get('pricePerUnit')
				? parseFloat(formData.get('pricePerUnit') as string)
				: null,
			description: formData.get('description'),
		};
		const validatedData = ingredientSchema.parse(data);
		const ingredient = await prisma.ingredient.create({
			data: {
				name: validatedData.name,
				category: validatedData.category,
				unit: validatedData.unit,
				pricePerUnit: validatedData.pricePerUnit,
				description: validatedData.description,
			},
		});

		return { success: true, ingredient };
	} catch (error) {
		console.error('Ошибка при создании ингредиента: ', error);
		return { error: 'Ошибка при создании ингредиента' };
	}
}

export async function getIngredients() {
	try {
		const ingredients = await prisma.ingredient.findMany();

		return { success: true, ingredients };
	} catch (error) {
		console.error('Ошибка при получении ингредиента: ', error);
		return { error: 'Ошибка при получении ингредиента' };
	}
}

export async function deleteIngredient(id: string) {
	try {
		const ingredient = await prisma.ingredient.delete({
			where: { id },
		});

		return { success: true, ingredient };
	} catch (error) {
		console.error('Ошибка при удалении ингредиента: ', error);
		return { error: 'Ошибка при удалении ингредиента' };
	}
}
