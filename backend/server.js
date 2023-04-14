const express = require("express");
const createHttpError = require("http-errors");
const path = require("path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const db = require("./db/connection.js");
const requireAuthentication = require("./middleware/require-authentication.js");

const homeRoutes = require("./routes/static/home.js");
const gamesRoutes = require("./routes/static/games.js");
const lobbyRoutes = require("./routes/static/lobby.js");
const authenticationRoutes = require("./routes/static/authentication.js");
const testRoutes = require("./routes/static/test.js");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new pgSession({ pgPromise: db }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "static")));

app.use("/", homeRoutes);
app.use("/games", requireAuthentication, gamesRoutes);
app.use("/lobby", requireAuthentication, lobbyRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createHttpError(404));
});
