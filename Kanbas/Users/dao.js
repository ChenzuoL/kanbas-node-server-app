import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export const createUser = async (user) => {
    try {
      // Assign a unique ID if _id is not provided
      if (!user._id) {
        user._id = uuidv4();
      }
      const newUser = await model.create(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  };
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };  
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });