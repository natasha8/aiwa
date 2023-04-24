import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatusCard from "@/components/StatusCard";
import fetchWeather from "@/graphql/queries/fetchWeather";

type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

async function HomePage({ params: { city, lat, long } }: Props) {
	const client = getClient();
	const { data } = await client.query({
		query: fetchWeather,
		variables: {
			current_weather: "true",
			longitude: long,
			latitude: lat,
			timezone: "GMT",
		},
	});

	const results: Root = data.myQuery;

	console.log(results);

	return (
		<div className="flex flex-col min-h-screen md:flex-row bg-clouds tracking-wider">
			<div className="flex-1 p-5 lg:p-10">
				<div className="p-5">
					<div className="pb-5">
						<h2 className="text-xl font-bold">Todays Overview</h2>
						<p className="text-sm text-gray-400">
							Last Updated at:{" "}
							{new Date(
								results.current_weather.time
							).toLocaleString()}{" "}
							({results.timezone})
						</p>
					</div>
					<div className="m-2">
						<CalloutCard message="content from chat GPT-4" />
					</div>
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
						<StatusCard
							title="Maximum Temperature"
							metric={`${results.daily.temperature_2m_max[0].toFixed(
								1
							)}°`}
							color="yellow"
						/>

						<StatusCard
							title="Minimum Temperature"
							metric={`${results.daily.temperature_2m_min[0].toFixed(
								1
							)}°`}
							color="green"
						/>

						<div>
							<StatusCard
								title="UV Index"
								metric={results.daily.uv_index_max[0].toFixed(
									1
								)}
								color="rose"
							/>
							{Number(results.daily.uv_index_max[0].toFixed(1)) >
								5 && (
								<CalloutCard
									message={
										"The UV is high today, be sure to wear SPF!"
									}
									warning
								/>
							)}
						</div>

						<div className="flex space-x-3">
							<StatusCard
								title="Wind Speed"
								metric={`${results.current_weather.windspeed.toFixed(
									1
								)}m/s`}
								color="cyan"
							/>

							<StatusCard
								title="Wind Direction"
								metric={`${results.current_weather.winddirection.toFixed(
									1
								)}°`}
								color="violet"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
