var express = require("express"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io")(server, { cors: { origin: "*" }, allowEIO3: true }),
  port = 8889;
const  SerialPort  = require("serialPort");
const { MockBinding } = require("@serialport/binding-mock");
const { SerialPortStream } = require("@serialport/stream");
const Readline = require('@serialport/parser-readline')

var fs = require("fs");
var portName = process.argv[2];
const path = require("path");

app.use("/asset", express.static(path.join(__dirname, "asset")));

app.set("view engine", "ejs");

var colorOffset = 0;

app.get("/", function (req, res) {
  res.render("page.ejs", { colorOffset });
});

app.get("/greeting", function (req, res) {
  res.render("greeting.ejs");
});

server.listen(port, () => {
  console.log("Server is listening on port" + port);
});

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("UserConnected" + socket.id);
  const parser = portMap.pipe(new Readline({ delimiter: '\r\n' }))
  parser.on("data", (line) => {
    console.log(Number(line));
    var serialData = Number(line);
    if (serialData>0 && serialData <= 100) {
      socket.broadcast.emit("tamilNaduOffset", serialData );
      if (serialData == 100) {
        socket.broadcast.emit("dashboardVisible", { Box: "tamilNaduBox" });
      }
    }
    else if (serialData>100 && serialData <= 200) {
      socket.broadcast.emit("karnatakaOffset", serialData - 100 );
      if (serialData == 200) {
        socket.broadcast.emit("dashboardVisible", { Box: "KarnatakaBox" });
        socket.broadcast.emit("dashboardVisible", { Box: "KarnatakaBox2" });
      }
    } else if (serialData > 200 && serialData <= 300) {
      socket.broadcast.emit("telanganaOffset", (serialData - 200) );
      if (serialData == 300) {
        socket.broadcast.emit("dashboardVisible", { Box: "telanganaBox" });
      }
    } else if (serialData > 300 && serialData <= 400) {
      socket.broadcast.emit("andhraOffset", (serialData - 300) );
      if (serialData == 400) {
        socket.broadcast.emit("dashboardVisible", { Box: "andhraBox" });
        socket.broadcast.emit("dashboardVisible", { Box: "andhraBox2" });
      }
    } else if (serialData > 400 && serialData <= 500) {
      socket.broadcast.emit("goaOffset", (serialData - 400));
      if (serialData == 500) {
        socket.broadcast.emit("dashboardVisible", { Box: "GoaBox" });
      }

    } else if (serialData > 500 && serialData <= 600) {
      socket.broadcast.emit("maharashtraOffset", (serialData - 500) );
      if (serialData == 600) {
        socket.broadcast.emit("dashboardVisible", { Box: "MaharashtraBox" });
        socket.broadcast.emit("dashboardVisible", { Box: "MaharashtraBox2" });
      }
    } else if (serialData > 600 && serialData <= 700) {
      socket.broadcast.emit("madhyaPradeshOffset", (serialData - 600) );
      if (serialData == 700) {
        socket.broadcast.emit("dashboardVisible", { Box: "MadhyaPradeshBox" });
      }
    } else if (serialData > 700 && serialData <= 800) {
      socket.broadcast.emit("gujratOffset", (serialData - 700) );
      if (serialData == 800) {
        socket.broadcast.emit("dashboardVisible", { Box: "GujratBox" });
        socket.broadcast.emit("dashboardVisible", { Box: "GujratBox2" });
      }
    }  else if (serialData > 800 && serialData <= 900) {
      socket.broadcast.emit("biharOffset", (serialData - 800) );
      if (serialData == 900) {
        socket.broadcast.emit("dashboardVisible", { Box: "BiharBox" });
      }
    } else if (serialData > 900 && serialData <= 1000) {
      socket.broadcast.emit("westBengalOffset", (serialData - 900) );
      if (serialData == 1000) {
        socket.broadcast.emit("dashboardVisible", { Box: "WestBengalBox" });
      }
    }
    else if (serialData > 1000 && serialData <= 1100) {
      socket.broadcast.emit("odishaOffset", (serialData - 1000) );
      if (serialData == 1100) {
        socket.broadcast.emit("dashboardVisible", { Box: "odishaBox" });
      }
    }
    else if(serialData==1120) { 
      //colorOffset = 0;
      socket.broadcast.emit("clearOffset", 0);
    }
     else if(serialData==1500) {
      colorOffset = 0;
      socket.broadcast.emit("nextPage", "http://localhost:8889");
    }
  });
});

// MockBinding.createPort("/dev/ROBOT", { echo: true, record: true });

// SerialPort.list().then(x=>{
//   console.log(x);
// })

const portMap =  SerialPort('COM3',{
  baudRate: 9600,
});


portMap.on('data', function (data) {
  console.log('Data:', Number(data))
})


// portMap.on("open", () => {
//   setInterval(() => {
//     if (colorOffset < 100) {
//       colorOffset = colorOffset + 1;
//       portMap.port.emitData(colorOffset + "\n");
//     } else {
//       colorOffset = 0;
//     }
//   }, 100);
// });
