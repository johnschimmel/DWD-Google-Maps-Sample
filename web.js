
/**
 * Module dependencies.
 */

// base dependencies for app
var express = require('express')
  , ejs = require('ejs')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views'); //store all templates inside /views
    app.set('view engine', 'ejs'); // ejs is our template engine
    app.set('view options',{layout:true}); // use /views/layout.html to manage your main header/footer wrapping template
    app.register('html',require('ejs')); //use .html files in /views instead .ejs extension
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
    
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(request, response){
    
    locations = [
    {
        title : 'Interactive Telecommunications Program',
        position : {
            lat : 40.729291,
            lng : -73.993671
        }
    },
    {
        title : 'Washington Sq Park',
        position : {
            lat : 40.73088,
            lng : -73.997327
        }
    }
    
    ];
    
    templateData = {
        customLocationsJSON : JSON.stringify(locations)
    }
    
    response.render('index.html', templateData);
});

// Make server turn on and listen at defined PORT (or port 3000 if is not defined)
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on ' + port);

});
