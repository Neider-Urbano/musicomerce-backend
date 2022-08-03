const {Instrument, Category} = require("../db.js");
const {Op} = require('sequelize');



const postInstrument = async (req, res, next) => {
    const {name, brand, price, img, description, stock, status, category} = req.body;
    try {
        let newInstrument  = await Instrument.create({
            name, 
            brand, 
            price, 
            img, 
            description, 
            stock, 
            status
        })

        let newInstrumentCategory = await Category.findOne({
            where:{
                name: category
            }
        })
        await newInstrument.setCategory(newInstrumentCategory);

        return res.status(200).json({message: "Activity succesfully added"});

    } catch (error) {
        next(error);
    }
}


const getInstrument = async (req, res, next) => {
    let name=req.query.name
    if(name){
        let instrumentos=await Instrument.findAll({
            where:{name:{[Op.like]:`%${name}%`}},
            include:{model:Category}
        })
        if(instrumentos.length) return res.status(200).send(instrumentos)
        else return res.status(400).send("no existe ese instrumento:"+name)
    }else{
        let instrumentos=await Instrument.findAll({
            include:{model:Category}
           }) 
        if(instrumentos.length) return res.status(200).send(instrumentos)
        else return res.status(400).send("no existen instrumentos")
    }
}



module.exports = {
    postInstrument,
    getInstrument
}