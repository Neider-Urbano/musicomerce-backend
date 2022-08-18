const { User, Instrument,Trolley } = require("../db")





const purchase_user = async (req, res) => {
    let user_id = req.user_id;
    try {
        let carritos = await Instrument.findAll({
            include: { model: User },
        })
        let array = [];
        for (let i = 0; i < carritos.length; i++) {
            if (carritos[i].dataValues.users.length) {
                for (let j = 0; j < carritos[i].dataValues.users.length; j++) {
                    if (carritos[i].dataValues.users[j].Trolley.dataValues.userId == user_id) {
                        array.push({
                            userStock: carritos[i].dataValues.users[j].Trolley.dataValues.userStock,
                            id: carritos[i].dataValues.id,
                            name: carritos[i].dataValues.name,
                            brand: carritos[i].dataValues.brand,
                            price: carritos[i].dataValues.price,
                            img: carritos[i].dataValues.img,
                            description: carritos[i].dataValues.description,
                            status: carritos[i].dataValues.status,
                            categoryId: carritos[i].dataValues.categoryId,
                        })
                    }


                }


            }
        }
        //vaciar el stock de los intrumentos
        let user = await User.findByPk(user_id)
        user.set({ history: array });
        await user.save();

        for (let i = 0; i < array.length; i++) {
            let instrumentos=await Instrument.findByPk(array[i].id)
            let newStock=instrumentos.dataValues.stock - array[i].userStock
            console.log(newStock)
            instrumentos.set({stock:newStock})
            await instrumentos.save()
            
        }
        //borrar carrito del usuario

        await Trolley.destroy({
            where:{userId:user_id}
        })
        return res.send("se agrego al historial del usuario, se borro su carrito y se bajo el stock de los instrumentos correspondientes a su compra")

    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    purchase_user,
}