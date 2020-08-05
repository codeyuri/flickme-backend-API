const UsersModel = require('../models/Users-models')

const users = [];

const addUser = async ({ socketId, id, username, room, isOnline }) => {

  //get user if exist
  let user_id = new UsersModel(username)
  const existingUser = user_id.isUserExist()

  //get userId then update to isOnline to true
  let userUpdateOnline = new UsersModel(id , {isOnline:true})
  let dataTempUpdate = await userUpdateOnline.userUpdateById()
  //debuf only for now
  if(dataTempUpdate.success)
  {
      // console.log(dataTempUpdate.success)
  }else{
      // console.log(dataTempUpdate.success)
  }

  //get the user recently updated
  let getUserInfo = new UsersModel(id)
  const dataTempId = await getUserInfo.getUserById()

  if (!username) return { error: "Username is required." };
  if (!existingUser) {
    return {
      error: `${
        username[0].toUpperCase() + username.slice(1)
      } already exists. Please use another username.`,
    };
  }

  const user = { socketId, id, username, room, isOnline };
  users.push(user);
  return {user:dataTempId.data}
};

const userLeft = async (id) => {
    // Find user in temporary 'users' array to fetch the userId and
    // update the isOnline status in the database
    const userTest = await users.filter((user) => user.socketId === id);

    if ( userTest.length > 0 ) {
      let getALLuserOnline = new UsersModel(userTest[0].id , {isOnline:false})
      const OnlineUser = await getALLuserOnline.userUpdateById()

      console.log(OnlineUser.message)
      console.log(OnlineUser.message)

      const index = await users.findIndex(user => user.socketId === id);

      if(index !== -1) {
          return users.splice(index, 1)[0]
      }
    } else {
      console.log('Way sulod')
    }
}

// old way with temporary array of sockets
// const getCurrentUser = (id) => users.find((user) => user.id === id);.
const getCurrentUser = async (id) => {
  const userTest = await users.filter((user) => user.socketId === id);

  if ( userTest.length > 0 ) {
    let getAllUserById = new UsersModel(userTest[0].id)
    const userInfo = await getAllUserById.getUserById()
    return userInfo.data
  } else { 
    console.log('walay sulod')
  }
  
} 

// room-based chat
// const gestOnlineUsers = (room) => users.filter((user) => user.room === room);
const getOnlineUsers = async (room) => {
  let getALLuserOnline = new UsersModel(data = null)
  const OnlineUser = await getALLuserOnline.getAllUserByFilter(true , room)
  return OnlineUser.data
}

// const getOnlineUsers = (room) => users.filter(user => user.room === room)

// no-room-chatroom
// const getOnlineUsers = () => users.filter((user) => user);

module.exports = { addUser, userLeft, getCurrentUser, getOnlineUsers };
