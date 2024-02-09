const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { ServerConfig } = require("./config/index");
const apiRoutes = require("./routes");
const { ConnectDB } = require("./config/index");

const app = express();

//This is used to get JSON or URLEncoded body from Request for all type of req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       "https://ecommerce-mern-frontend-rho.vercel.app/",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//     optionSuccessStatus: 200,
//     methods: "*",
//     preflightContinue: true,
//   })
// );

// Set middleware of CORS
console.log("Request has Reached at Cors Policy");
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ecommerce-mern-frontend-rho.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
console.log("Request has Reached at Preflight");
app.options("*", (req, res, next) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://ecommerce-mern-frontend-rho.vercel.app" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    next();
  } else {
    console.log("fail");
  }
});
console.log("Request has Reached");
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  await ConnectDB.connectDatabase();
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
