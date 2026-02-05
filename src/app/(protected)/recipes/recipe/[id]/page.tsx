import { getRecipe } from '@/actions/recipe';
import RecipeCard from '@/components/common/RecipeCard';
import { Recipe } from '@/types/types';
import Link from 'next/link';

interface RecipePageProps {
	params: Promise<{ id: string }>;
}

const RecipePage: React.FC<RecipePageProps> = async ({ params }) => {
	const { id } = await params;
	const result = await getRecipe(id);

	return (
		<div className="py-3">
			<div className="mb-6 flex justify-start">
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white  text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
					title="Вернуться назад"
				>
					<span className="group-hover:-translate-x-1 transition-transform">
						←
					</span>
					<span className="text-sm font-medium">
						Назад к рецептам
					</span>
				</Link>
			</div>

			{!result.success ? (
				<p className="text-red-500">{result.error}</p>
			) : (
				<RecipeCard recipe={result.recipe as Recipe} fullCard />
			)}
		</div>
	);
};

export default RecipePage;
