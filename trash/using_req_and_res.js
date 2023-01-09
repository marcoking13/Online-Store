// const http = require("http");
// const fs = require("fs");
//
// const InitServer = (req,res) => {
//   const url = req.url;
//
//   var html = `<div>
//     <form method="POST"  action = "/messages">
//       <input placeholder="Enter Data" name="message" />
//     </form>
//   </div>`
//
//   if(url == "/"){
//     res.write(html);
//   }
//   else if (url === "/messages"){
//     res.setHeader("Location","/");
//     res.statusCode = 302;
//     const body = [];
//     req.on("data",(chunk)=>{
//       console.log(chunk);
//       body.push(chunk)
//     });
//     req.on("end",(chunk)=>{
//       var new_body = Buffer.concat(body).toString();
//       console.log(new_body.slice("="));
//     })
//     fs.writeFileSync("message.txt","DUMMY");
//   }
// }
//
//
//
// const server = http.createServer((req,res)=>{
//   res.setHeader("Content-Type","text/html");
//   InitServer(req,res)
// })
//
//
// server.listen(3000);
