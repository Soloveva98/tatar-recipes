import IngredientsTable from '@/components/UI/layout/IngredientsTable';
import IngredientForm from '@/forms/IngredientForm';

const IngredientsPage = () => {
	return (
		<div>
			<IngredientForm />
			<IngredientsTable />
		</div>
	);
};

export default IngredientsPage;
