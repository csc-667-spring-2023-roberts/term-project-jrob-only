import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_request, response) => {
  response.send("Hello wordfgdfgsdfgsdld!");
});

app.get("/anything", (_request, response) => {
  response.send("You have reached anything");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
