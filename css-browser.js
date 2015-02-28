var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var htmlparser = require("htmlparser2");

var HTTP_PREFIX = 'http://';

function dump(obj) {
    return JSON.stringify(obj, undefined, 4);
}

function normalizeUrl(url) {
    if (url && url.indexOf('http') !== 0) {
        return HTTP_PREFIX + url;
    }
    return url;
}

// HTML Parsing
// var parser = new htmlparser.Parser({
//     onopentag: function(name, attribs){
//         if(name === "link" /*&& attribs.type === "text/javascript"*/){
//             console.log(attribs);
//         }
//     },
//     ontext: function(text){
//         console.log("-->", text);
//     },
//     onclosetag: function(tagname){
//         if(tagname === "link"){
//             console.log("That's it?!");
//         }
//     }
// });
// parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
// parser.end();


app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/extract', function (req, res) {
    if (req.query && req.query.url) {
        console.log('QUERY: ' + dump(req.query.url));
     
        request.get(normalizeUrl(req.query.url), function (err, resp, body) {
            if (err) {
                console.error('ERROR: ' + err)
                res.sendStatus(404);
                return;
            }
            //console.log('RESPONSE: ' + dump(resp));
            //console.log('BODY: ' + body);
            var reply = [];
            // parse html!!!
            var parser = new htmlparser.Parser({
                onopentag: function(name, attrs){
                    if(name === "link" && 
                            (attrs.rel === 'stylesheet' || attrs.type === 'text/css')) {
                        reply.push(attrs.href);
                        console.log('Adding: ' + attrs.href);
                    }
                },
                onclosetag: function(tagname) {
                    if (tagname === 'body') {
                        console.log('DONE!');
                        res.json({css: reply});
                    }
                }
            });
            parser.write(body);
            parser.end();
        });
        return;
    }
    res.sendStatus(404);
});

app.get('/retrieve', function (req, res) {
    if (req.query && req.query.css) {
        console.log('QUERY: ' + dump(req.query.css));
        request.get(normalizeUrl(req.query.css), function (err, resp, body) {
            if (err) {
                res.sendStatus(404);
                return;
            }

            res.json({data: body});
        });
        return;
    }
    res.sendStatus(404);
});

app.listen(process.argv[2] || 9000);