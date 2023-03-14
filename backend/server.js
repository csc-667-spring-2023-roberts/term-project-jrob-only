import express from "express";
import rootRoutes from "./routes/root.js";
import createHttpError from "http-errors";
import path from "path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(".", "backend", "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

const PORT = process.env.PORT || 3000;

app.set("views", path.join(".", "backend", "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(".", "backend", "static")));

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createHttpError(404));
});
