const {Raiting,User,Instrument}=require("../db")

// {
//     "instrumentId":3,
//     "comment":"asdasdad",
//     "star":5
//   }
async function add_raiting(req,res) {
    try {
        let user_id=req.user_id;
        let {instrumentId,comment,star}=req.body
        if(!instrumentId||!comment||!star) return res.status(400).send("datos missins")
        let usuario= await User.findByPk(user_id)
    
        let instrumentoCalificado=await Instrument.findByPk(instrumentId,{
            include:{model:Raiting}
        })
        for (let i = 0; i < instrumentoCalificado.dataValues.Raitings.length; i++) { 
            if (instrumentoCalificado.dataValues.Raitings[i].dataValues.userId == user_id) {
                return res.status(400).send("You already rated this purchase")
            }
            
        }
        // res.send("instrumento calificado")
        
        let creado= await Raiting.create({userName:usuario.userName,instrumentId,comment:comment,star,userId:user_id});
        creado.setInstrument(instrumentoCalificado)
        await creado.save()
        
        res.send("instrument qualified") 
    } catch (error) {
        res.status(400).send(error)
    }
}


async function get_raiting(req,res){
    let rating=await Raiting.findAll({
        include:{model:Instrument}
    })

    res.send(rating)
}



module.exports = {
    add_raiting,
    get_raiting
}