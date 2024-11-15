type CardProps = {
	children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
	return (
		<div className="w-full max-w-xs p-4 bg-white rounded shadow-md">
			{children}
		</div>
	);
};

export default Card;
