const { Router } = require('express');
const router = Router();
const {Op}= require("sequelize");
const {Instrument,Category}=require("../db")



router.get("/",async(req,res)=>{
    try {
        let name=req.query.name
        if(name){
            let instrumentos=await Instrument.findAll({
                where:{name:{[Op.like]:`%${name}%`}},
                include:{model:Category}
            })
            if(instrumentos.length) return res.status(200).send(instrumentos)
            else return res.status(400).send("no existe un instrumento con  el nombre "+name)
        }else{
            let instrumentos=await Instrument.findAll({
                include:{model:Category}
               }) 
            if(instrumentos.length) return res.status(200).send(instrumentos)
            else return res.status(400).send("no existen instrumentos")
        }
    } catch (error) {
        res.send(error.message)
    }
});

module.exports=router

