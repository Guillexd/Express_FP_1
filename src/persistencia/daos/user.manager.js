import { userModel } from "../models/user.model.js";

export default class UsersManager{
  async getUser({email, password}){
    try {
      const user = await userModel.find({email, password});
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(props){
    try {
      const user = await userModel.create(props);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}