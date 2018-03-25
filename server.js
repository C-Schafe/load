var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req,res){
	var pathObj = url.parse(req.url,true);
	console.log(pathObj.pathname)
	console.log(pathObj)
	
	if(pathObj.pathname === '/'){
			var filePath = path.join(__dirname,'/index.html')
			fs.readFile(filePath,'binary',function(err,fileContent){
			if(err){
				res.writeHead(404, 'Not found')
				res.write('<h1>Not Found</h1>')
				res.end()
			}else{
				res.writeHead(200, 'Success')
				res.write(fileContent, 'binary')
				res.end()
			}
		})
	}else if(/loadMore/.test(req.url)){
		var index = pathObj.query.index
		var length = pathObj.query.length
		var content = []
		console.log(index)
		console.log(length)
		for(i=1; i < parseInt(length) + 1; i++){
			content.push('内容' + ( parseInt(index) + i))
			//content[i] = '内容' + i;
		}
		console.log(content)
		res.write(JSON.stringify(content))
		setTimeout(function(){
			res.end()
		},0)
	}else{
		res.end()
	}
	
})
server.listen(8080);
