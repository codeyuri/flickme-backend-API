// const UsersModel = require('../models/Users-models')

const users = [];

const addUser = ({ id, username, room }) => {
  const existingUser = users.find((user) => user.username === username);

  if (!username) return { error: "Username is required." };
  if (existingUser) {
    return {
      error: `${
        username[0].toUpperCase() + username.slice(1)
      } already exists. Please use another username.`,
    };
  }

  const user = { id, username, room };
  users.push(user);
  return {user}
};

const userLeft = async (id) => {
    const index = await users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getCurrentUser = (id) => users.find((user) => user.id === id);

// room-based chat
const getOnlineUsers = (room) => users.filter((user) => user.room === room);

// no-room-chatroom
// const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, userLeft, getCurrentUser, getOnlineUsers };
