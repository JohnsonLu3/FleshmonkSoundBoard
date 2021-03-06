const express =require('express');
const app = express();
const morgan = require('morgan');

const getWordListRoute = require('./api/routes/getWordList');
const generateRoute = require('./api/routes/generate');

//CORS headers
app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	
	if(req.method === "OPTIONS"){
		res.header('Access-Control-Allow-Methods', 'POST,GET');
		return res.status(200).json({});
	}
	
	next();
});

app.use(morgan('dev'));
app.use("/getWordList", getWordListRoute);
app.use("/generate", generateRoute);

app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error: {
			code: error.status,
			message: error.message
		}
	})
});

module.exports = app;