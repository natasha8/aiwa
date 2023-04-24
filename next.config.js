/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ["@tremor/react"],
	},
	images: {
		domains: ["www.weatherbit.io", "https://i.ibb.co/"],
	},
};

module.exports = nextConfig;
