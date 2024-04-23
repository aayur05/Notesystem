// const express = require(`express`);
const pool = require(`../utils/conn`);

const getAllNotesDb = async () => {
  try {
    const query = `
      SELECT
    note.id AS note_id,
    note.title,
    note.content,
    tags.tag_name,
    tags.color,
	users.username
FROM
    note
JOIN
    tags ON note.tag = tags.id
JOIN
    users ON note.users = users.id
    `;
    const { rows: notes } = await pool.query(query);
    return notes;
  } catch (error) {
    console.error("Error fetching all notes:", error);
    throw error;
  }
};

const getAllNotesUserIdDb = async (id) => {
  try {
    const query = `
      SELECT
    note.id AS note_id,
    note.title,
    note.content,
    note.created_at,
    note.tag,
    note.remind,
    tags.tag_name,
    tags.color
    
FROM
    note
JOIN
    tags ON note.tag = tags.id
WHERE
    note.users = ${id};
    `;
    const { rows: notes } = await pool.query(query);
    return notes;
  } catch (error) {
    console.log("tag not found");
  }
};

const getNoteByIdDb = async (id) => {
  const { rows: note } = await pool.query(
    `SELECT
    note.id,
    note.title,
    note.content,
    note.tag,
    note.remind,
    tags.tag_name,
    tags.color
FROM
    note
JOIN
    tags ON note.tag = tags.id
WHERE
    note.id =  ${id}`
  );
  return note;
};

const createNoteDb = async ({ title, content, users }) => {
  const { rows: note } = await pool.query(
    `
    INSERT INTO note(title,content,users) 
    VALUES ('${title}','${content}','${users}')
  returning title,content,user`
  );
  return note[0];
};

const updateNoteByID = async (id, title, content,remind) => {
  const { rows: note } = await pool.query(
    `UPDATE note SET title='${title}', content='${content}',remind=${remind} WHERE id =${id}`
  );
  return note[0];
};

const updateNoteTagByID = async (id, tag) => {
  console.log("db" + id + tag);

  const { rows: note } = await pool.query(
    `UPDATE note SET tag=${tag} WHERE id =${id}`
  );
  return note[0];
};

const deleteNoteByID = async (id) => {
  const { rows: note } = await pool.query(
    `DELETE FROM note where id = $1 returning *`,
    [id]
  );
  return note[0];
};

module.exports = {
  getAllNotesDb,
  getNoteByIdDb,
  getAllNotesUserIdDb,
  createNoteDb,
  updateNoteByID,
  updateNoteTagByID,
  deleteNoteByID,
};
