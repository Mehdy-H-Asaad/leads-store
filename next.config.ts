import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "reelvee.s3.amazonaws.com",
			},
		],
	},

	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_REWRITE_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
