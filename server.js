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

app.use(
  cors({
    origin: [
      "https://ecommerce-mern-frontend-rho.vercel.app/",
      "http://localhost:3000",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  await ConnectDB.connectDatabase();
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
