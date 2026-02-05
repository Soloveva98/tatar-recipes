interface IngredientsLayoutProps {
	children: React.ReactNode;
}

const IngredientsLayout: React.FC<IngredientsLayoutProps> = ({ children }) => {
	return <section>{children}</section>;
};

export default IngredientsLayout;
