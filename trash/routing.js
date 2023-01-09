const fs = require("fs");


const Routing = (req,res)=>{
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><form action='/message' method='POST'> <input name='message'  type ='text'>  <button type='submit'>Enter</button>  </form>   </body>");
    res.write("</html>");
    return res.end();
  }
  if(url === "/message" && method === "POST"){
    const body = [];
    req.on("data", (chunk)=>{
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end",()=>{
      const parsedBody = Buffer.concat(body).toString();
      const data = parsedBody.split("=")[1];
      console.log(body);
        fs.writeFileSync("message.txt",data);
    });

    res.statusCode = 302;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Location', '/');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');

    return res.end();

  }

}

exports.handle = Routing;
