const { User, Instrument } = require("../db")





const create_history = async (req, res) => {
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
        let user = await User.findByPk(user_id)
        console.log(array)
        if (user.history === null) {
            user.set({
                history: array
            });
            await user.save();
            return res.send("se agrego al historial del usuario")
        } else {
            user.set({
                history:array
            })
            await user.save()
            return res.send("se pusheo al array de historial")
        }
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    create_history,
}