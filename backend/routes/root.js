import express from "express";
const router = express.Router();

router.get("/", (request, response) => {
  response.send("Hello from a route");
});

export default router;
