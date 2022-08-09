const { User } = require('../db');
const { users } = require("../users.json");
const { Op } = require("sequelize");


const getUsers=async(req,res)=>{
    try {
        let userName = req.query.userName;
        if (userName) {
          let users = await User.findAll({
            where: { userName: { [Op.iLike]: `%${userName}%` }}
          });
          if (users.length) return res.status(200).send(users);
          else return res.status(400).send("Users " + userName + " not found");
        } else {
          let users = await User.findAll();
          if (users.length) return res.status(200).send(users);
          else return res.status(400).send("No Users to show");
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const getUserId=async(req,res)=>{
    try {
        let id = req.params.id;
        if (id) {
            let userExist = await User.findByPk(id);
            if(!userExist){
                throw new TypeError("Error, User not found with this Id")
            }
            return res.status(200).send(userExist);
        }
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const postUser=async(req,res)=>{
    const {userName, email, password}= req.body;
    try {
        if(userName && email && password){
            await User.create(req.body)
            res.status(200).send("User created")
        }else{
            throw new TypeError("Error, User information invalid")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const postUsersAll=async(req,res)=>{
    try {
        let users = await User.findAll()
        if(!users){
            await User.bulkCreate(users)
        }   
        return res.send("Users created")   
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const putUser=async(req, res)=>{
    const {id}=req.params;
    const {userName, email, password}= req.body;
    try {
        if(id && (userName && email && password)){
            let putUser = await User.findByPk(id);
            if(!putUser){
                throw new TypeError("Error, User Id not found")
            }
            await User.update(req.body, {where: {id: id}})
            res.status(200).send("User updated")
        }else{
            throw new TypeError("Error, User information invalid")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const deleteUser=async(req, res)=>{
    const {id}=req.params;
    try {
        if(id){
            const deleteUser=await User.destroy({ 
                where: {id: id}
            })
            if(!deleteUser){
                throw new TypeError("Error, User Id not found")
            }
            res.status(200).send("User deleted")
        }else{
            throw new TypeError("Error, User Id invalid")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

module.exports = {
    postUser,
    postUsersAll,
    getUsers,
    getUserId,
    deleteUser,
    putUser
};
  