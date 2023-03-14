import express from "express";
import rootRoutes from "./routes/root.js";
import createHttpError from "http-errors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createHttpError(404));
});
