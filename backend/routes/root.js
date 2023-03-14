import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send("Hello from the root route");
});

export default router;
