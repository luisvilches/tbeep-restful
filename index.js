var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var Schema = mongoose.Schema;
var ruta = "/api/puntos";

//////////////////////////////////////////////////////////////////////
/////////////// CONECCION A LA BASE DE DATOS /////////////////////////
//////////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://luisvilches:andres2230@ds023475.mlab.com:23475/tbeep', function(err,res){
	if (err) {
		console.log("problemas al conectar con la base de datos" + err)
	};
});

///////////////////////////////////////////////////////////////////////
////////////////// CONFIGURACIONES ////////////////////////////////////
///////////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(cors());


///////////////////////////////////////////////////////////////////////
/////////////////// SCHEMA DEL MODELO /////////////////////////////////
///////////////////////////////////////////////////////////////////////

var beep = new Schema({

	nombre: String,
	direccion: String,
	comuna: String,
	x: String,
	y: String

});
var beep = mongoose.model('beep',beep);

///////////////////////////////////////////////////////////////////////
/////////////////// RUTAS /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// GET
app.get(ruta, function(req,res,next){
	beep.find(function(err,data){
		if (err) {
			console.log(err);
		};
		res.status(200).json({records:data});
	});
});

//GET:ID
app.get(ruta+"/:id",function(req,res,next){

	var id = req.params.id

	beep.findOne({_id: id}, function(err,data){
		if (err) {
			console.log(err);
		};
		res.status(200).json(data);
	});
});

//POST
app.post(ruta,function(req,res,next){

	var data = new beep(req.body);
	data.save(function(err){
		if (err) {console.log(err)};
		res.status(200).json(data);
	});
});


//PUT

//DELETE

///////////////////////////////////////////////////////////////////////
////////////////// PUERTO DEL SERVIDOR ////////////////////////////////
///////////////////////////////////////////////////////////////////////

app.listen(app.get('port'), function () {
	console.log("App started at http://localhost:" + app.get('port'));
});
