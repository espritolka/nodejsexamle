const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    console.log(`Запрошенный адрес: ${request.url}`);
    if(request.url.startsWith("/public/")){
         
        // получаем путь после слеша
        var filePath = request.url.substr(1);
        fs.readFile(filePath,"utf8", function(error, data){
                 
            if(error){
                     
                response.statusCode = 404;
                response.end("<h1>Failllll!!!</h1>");
            }   
            else{
                response.setHeader("Content-Type", "text/html");

                let message = "Изучаем Node.js"; 
                let header = "Главная страница";
                data = data.replace("{header}", header).replace("{message}", message);

                response.end(data);
                // fs.readFile("public/index2.html", "utf8", function(error, data){
                 
                //     let message = "Изучаем Node.js"; 
                //     let header = "Главная страница";
                //     data = data.replace("{header}", header).replace("{message}", message);
                //     response.end(data);
                // })
            }
        })
    }
    else{
        if(request.url=="/some.doc"){
            response.writeHead(200, {"Content-Type" : "application/txt"});
            fs.createReadStream("some.txt").pipe(response);
        }
        else{
            response.end("hello world!");
        }
        // во всех остальных случаях отправляем строку hello world!

    }
    
}).listen(3000);