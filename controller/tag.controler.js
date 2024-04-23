const tagService = require("../services/tag.services");

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get tag by ID
const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await tagService.getTagById(id);
    res.json(tag);
  } catch (error) {
    console.log("Note Not Found");
  }
};

const getTagByUserId = async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  try {
    const tag = await tagService.getTagByUserId(id);
    res.json(tag);
  } catch (error) {
    console.error("Error fetching tag by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new tag
const createTag = async (req, res) => {
  const { tag_name, users, color } = req.body;
  try {
    const newTag = await tagService.createTag({ tag_name, users, color });
    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update tag by ID
const updateTag = async (req, res) => {
  const { id } = req.params;
  const { tag_name, color } = req.body;
  try {
    const updatedTag = await tagService.updateTag(id, tag_name, color);
    res.json(updatedTag);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete tag by ID
const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await tagService.deleteTag(id);
    res.json(deletedTag);
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  getTagByUserId,
  createTag,
  updateTag,
  deleteTag,
};
