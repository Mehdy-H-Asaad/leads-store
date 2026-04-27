import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3002",
		"http://localhost:3003",
		"http://localhost:3004",
		"http://localhost:3005",
		"http://localhost:3006",
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "reelvee.s3.amazonaws.com",
			},
		],
	},
};

export default nextConfig;
