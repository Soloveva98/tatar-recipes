export type FormData = {
	email: string;
	password: string;
	confirmPassword: string;
};

export type Ingredient = {
	id: string;
	name: string;
	category: string;
	unit: string;
	pricePerUnit: number | null;
	description: string | null;
	createdAt?: Date;
	updatedAt?: Date;
};

export type RecipeIngredient = {
	id: string;
	ingredientId: string;
	quantity: number;
	ingredient: Ingredient;
};

export type Recipe = {
	id: string;
	name: string;
	description: string;
	imageUrl?: string | null;
	ingredients: RecipeIngredient[];
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';
