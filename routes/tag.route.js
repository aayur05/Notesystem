const express = require("express");
const tagController = require("../controller/tag.controler");

const router = express.Router();

// Define routes
router.get("/tags", tagController.getAllTags);
router.get("/tags/:id", tagController.getTagById);
router.post("/tags/user", tagController.getTagByUserId);
router.post("/tags", tagController.createTag);
router.put("/tags/:id", tagController.updateTag);
router.delete("/tags/:id", tagController.deleteTag);

module.exports = router;
