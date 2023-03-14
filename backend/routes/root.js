import express from "express";

const router = express.Router();

router.get("/", (_request, response) => {
  const name = "jrob roberts";

  response.render("home", { title: "Jrob's Term Project", name });
});

export default router;
