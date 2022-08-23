const {Raiting,User,Instrument}=require("../db")

async function PromedioRaiting(instrumentId,star) {
    try {
        let instrumento = await Instrument.findByPk(instrumentId,{
            include:{model:Raiting}
        })
        let SumaCalificaciones=0;
        
        if (instrumento.dataValues.Raitings.length) {
            for (let i = 0; i < instrumento.dataValues.Raitings.length; i++) {
                SumaCalificaciones=SumaCalificaciones+instrumento.dataValues.Raitings[i].star
            }
            let final=parseInt(SumaCalificaciones/instrumento.dataValues.Raitings.length)
            instrumento.set({raiting:final})
            await instrumento.save() 
        }else{
                instrumento.set({raiting:star})
                await instrumento.save()
                console.log("The instrument rating was: "+star)
        }
        
    } catch (error) {
        console.log("Failed to create average rating")
    }
}






async function add_raiting(req,res) {
    try {
        let user_id=req.user_id;
        let {instrumentId,comment,star}=req.body
        if(!instrumentId||!comment||!star) return res.status(400).send("Some data is missing")
        let usuario= await User.findByPk(user_id)
    
        let instrumentoCalificado=await Instrument.findByPk(instrumentId,{
            include:{model:Raiting}
        })
        for (let i = 0; i < instrumentoCalificado.dataValues.Raitings.length; i++) { 
            if (instrumentoCalificado.dataValues.Raitings[i].dataValues.userId == user_id) {
                return res.status(400).send("You already rated this instrument")
            }
            
        }
       
        
        let creado= await Raiting.create({userName:usuario.userName,instrumentId,comment:comment,star,userId:user_id});
        creado.setInstrument(instrumentoCalificado)
        await creado.save()

         await PromedioRaiting(instrumentId,star)

        
        res.send("Instrument rated") 
    } catch (error) {
        res.status(400).send(error)
    }
}


async function get_raiting(req,res){
    try {
        let user_id=req.user_id;
        let rating=await Raiting.findAll({
            where:{userId:user_id}
        })
    
        res.send(rating)
        
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    add_raiting,
    get_raiting
}