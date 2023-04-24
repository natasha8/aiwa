type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

const HomePage = ({ params: { city, lat, long } }: Props) => {
	return (
		<div className="w-screen h-screen bg-clouds flex flex-col justify-center items-center text-6xl">
			WEATHER APP {city}
			{lat}
			{long}
		</div>
	);
};

export default HomePage;
