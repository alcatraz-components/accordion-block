const path = require("path");

module.exports = {
	context: __dirname,
	entry: {
		block: ["@alcatraz-component/accordion", "./index.js"],
		component: "@alcatraz-component/accordion"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "alcatraz-blocks-accordion-[name].js"
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader"
			}
		]
	}
};
