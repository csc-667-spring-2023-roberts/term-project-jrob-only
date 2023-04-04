import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  response.render("lobby", { title: "Jrob's Term Project" });
});

export default router;
