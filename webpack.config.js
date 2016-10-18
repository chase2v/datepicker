module.exports = {
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_module/, loader: 'babel'},
			{ test: /\.(scss|css)/, loader: 'style!css!sass' },
			{ test: /\.(eot|svg|ttf|woff)/, loader: 'file' }
		]
	},
	entry: './index.js',
	output: {
		path: __dirname,
		filename: './assets/bundle.js'
	}
}