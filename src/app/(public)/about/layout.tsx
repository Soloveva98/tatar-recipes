interface AboutLayoutProps {
	children: React.ReactNode;
}

const AboutLayout: React.FC<AboutLayoutProps> = ({ children }) => {
	return <section>{children}</section>;
};

export default AboutLayout;
