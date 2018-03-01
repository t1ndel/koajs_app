const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Uglify = require("uglifyjs-webpack-plugin");


let pos = process.cwd().lastIndexOf(path.sep);

const PATHS = {
	source: path.join(process.cwd()),
	build: path.join(process.cwd().slice(0, pos),'static','build')
}

module.exports = {
	entry: {
		index: path.join(PATHS.source, 'app', 'app.js')
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	devtool: false,	
	plugins: [
		new Uglify()
	],	
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				]
			},
			{
				test: /\.pug$/, 
				loader: 'pug-loader'
			},
            {
                test: /\.js/,
				exclude:'/node_modules/',				
                loader: 'babel-loader'
            },
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}            
		]
	}
}


