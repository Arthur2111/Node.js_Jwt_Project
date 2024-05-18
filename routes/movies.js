const express = require("express");

const router = express.Router();

const movieController = require("../app/api/controllers/movies");

router.get("/allmovies", movieController.getAll);
router.get("/:movieId", movieController.getById);
router.put("/:movieId", movieController.updateById);
router.post("/", movieController.create);
router.delete("/:movieId", movieController.deleteById);

module.exports = router;
