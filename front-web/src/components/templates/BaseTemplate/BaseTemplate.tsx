const BaseTemplate = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col items-center justify-center h-full bg-white-100 px-4 sm:px-6 lg:px-8">
			{children}
		</div>
	);
};

export default BaseTemplate;
