const {
  getAllTagsDb,
  getTagByIdDb,
  getTagByUserIdDb,
  createTagDb,
  updateTagByID,
  deleteTagByID,
} = require("../db/tag.db");

// Get all tags
const getAllTags = async () => {
  try {
    const tags = await getAllTagsDb();
    return tags;
  } catch (error) {
    throw new Error("Error fetching tags:", error);
  }
};

// Get tag by ID
const getTagById = async (id) => {
  try {
    const tag = await getTagByIdDb(id);
    if (tag.length === 0) {
      throw new Error("Tag not found");
    }
    return tag[0];
  } catch (error) {
    console.log("Note Not Found");
  }
};

const getTagByUserId = async (id) => {
  try {
    const tag = await getTagByUserIdDb(id);
    if (tag.length === 0) {
      throw new Error("Tag not found");
    }
    return tag;
  } catch (error) {
    throw new Error("Error fetching tag by ID:", error);
  }
};

// Create a new tag
const createTag = async ({ tag_name, users, color }) => {
  try {
    const newTag = await createTagDb({ tag_name, users, color });
    return newTag;
  } catch (error) {
    throw new Error("Error creating tag:", error);
  }
};

// Update tag by ID
const updateTag = async (id, tag_name, color) => {
  try {
    const updatedTag = await updateTagByID({ id, tag_name, color });
    return updatedTag;
  } catch (error) {
    throw new Error("Error updating tag:", error);
  }
};

// Delete tag by ID
const deleteTag = async (id) => {
  try {
    const deletedTag = await deleteTagByID(id);
    return deletedTag;
  } catch (error) {
    throw new Error("Error deleting tag:", error);
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
