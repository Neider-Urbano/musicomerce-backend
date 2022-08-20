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
    
        let instrumentoCalificado=await Instrument.findByPk(instrumentId)
        
        
        let creado= await Raiting.create({userName:usuario.userName,instrumentId,comment:comment,star,userId:user_id})
        // raiting=(sum_of_rating * 5)/sum_of_max_rating_of_user_count
        creado.setInstrument(instrumentoCalificado)
        await creado.save()
        // let reto=await Instrument.findByPk(instrumentId)
        // res.send(reto)
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