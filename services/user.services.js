const {
  getAllUsersDb,
  getUserByIdDb,
  getUserByEmail,
  getDetailbyId,
  createUserWithRoleDb,
  createUserDb,
  updateUserByID,
  updateUserActiveID,
  deleteUserByID,
  changeUserPasswordDB,
} = require("../db/user.db.js");

class UserService {
  getAllUser = async () => {
    try {
      return await getAllUsersDb();
    } catch (error) {
      console.log(error);
    }
  };
  createUser = async (user) => {
    try {
      return await createUserDb(user);
    } catch (error) {
      console.log(error);
    }
  };
  createUserWithRole = async ({ username, email, password, role }) => {
    try {
      return await createUserWithRoleDb({
        username,
        email,
        password,
        role,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getUserById = async (email) => {
    try {
      const user = await getUserByIdDb(email);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  getUserByEmail = async (id) => {
    try {
      const user = await getUserByEmail(id);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  getDetailbyId = async (id) => {
    try {
      const user = await getDetailbyId(id);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  updateUserByID = async (id, username, email) => {
    try {
      console.log(id, username, email);

      const user = await updateUserByID(id, username, email);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  updateUserActiveID = async ({ id, active }) => {
    try {
      const user = await updateUserActiveID({ id, active });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  deleteUserByID = async (ID) => {
    try {
      const user = await deleteUserByID(ID);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  changeUserPassword = async (id) => {
    try {
      const user = await changeUserPasswordDB(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new UserService();
