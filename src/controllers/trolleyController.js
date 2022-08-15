const { User, Trolley, Instrument, Category } = require("../db");
const { Op } = require("sequelize");
const { user } = require("pg/lib/defaults");


const post_trolley=async(req,res)=>{
    let user_id=req.user_id;
    let instrumentId=req.body.id;
    if(!instrumentId) return res.status(400).send("no se envio el id del insturmento por body")
    try {
        await Trolley.create({userId:user_id,instrumentId})
    
        res.send("Se agrego el instrumento al carrito")
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const get_trolley = async (req, res) => {
    let user_id = req.user_id;
    try {
        let carritos = await Instrument.findAll({
            include: { model: User },
        })
        let array = [];
        for (let i = 0; i < carritos.length; i++) {
            if (carritos[i].dataValues.users.length) {
                for (let j = 0; j < carritos[i].dataValues.users.length; j++) {
                    console.log(carritos[i].dataValues.users)
                    if (carritos[i].dataValues.users[j].Trolley.dataValues.userId == user_id) {
                        array.push({
                            id: carritos[i].dataValues.id,
                            name: carritos[i].dataValues.name,
                            brand: carritos[i].dataValues.brand,
                            price: carritos[i].dataValues.price,
                            img: carritos[i].dataValues.name,
                            description: carritos[i].dataValues.description,
                            stock: carritos[i].dataValues.stock,
                            status: carritos[i].dataValues.status,
                            categoryId: carritos[i].dataValues.categoryId,
                        })
                    }
    
    
                }
    
    
            }
        }
        res.send(array)
    } catch (error) {
        res.status(400).send(error)
    }
}

const delete_trolley=async(req,res)=>{
    let user_id = req.user_id;
    let instrumentId=req.body.id;
    if(!instrumentId) return res.status(400).send("no se envio el id del insturmento por body")
    try {
        await Trolley.destroy({
            where: {
              instrumentId,
              userId:user_id
            }
          });
        res.send("se borro la relacion")
        
    } catch (error) {
        res.status(400).send(error)
    }
}


    module.exports = {
        get_trolley,
        post_trolley,
        delete_trolley
    }
// [
//     {
//       "id": 1,
//       "name": "Violin 1/32 Genova 1433P",
//       "brand": "Genova",
//       "price": 255150,
//       "img": "https://lacolonial.com.co/pub/media/catalog/product/cache/fce05c1f7475c409d5310805c0d06f78/6/_/6_54.jpg",
//       "description": "Violin 1/16 marca Genova perfecto para personas que se encuentren en proceso de aprendizaje. Fabricado en pino y con un hermoso acabado lacado. Viene completo con el arco, puente, colofonia y estuche rígido con correas ajustables para su protección y transporte. Indicado para niños de 2 a 6 años, aunque puede variar en algunos casos según la estatura y longitud de extremidades superiores de la persona.",
//       "stock": 10,
//       "status": "New",
//       "adminId": null,
//       "categoryId": 1,
//       "users": [
//         {
//           "id": 4,
//           "dni": null,
//           "firstName": null,
//           "lastName": null,
//           "contactNumber": null,
//           "email": "ezequiel_soto_f4@hotmail.com",
//           "userName": "ezequiel",
//           "password": "$2b$10$qwN5mJrzYffTL1sMUFJ6FODbWCVDPyyxuLFr/LorMt2p9DGFSb/2i",
//           "buyerAddress": null,
//           "rol": "user",
//           "Trolley": {
//             "createdAt": "2022-08-15T00:37:35.445Z",
//             "updatedAt": "2022-08-15T00:37:35.445Z",
//             "userId": 4,
//             "instrumentId": 1
//           }
//         }
//       ]
//     },
//     {
//       "id": 20,
//       "name": "Saxofón Tenor New Orleans 6435L Dorado",
//       "brand": "New Orleans",
//       "price": 2138000,
//       "img": "https://lacolonial.com.co/pub/media/catalog/product/cache/fce05c1f7475c409d5310805c0d06f78/1/0/10_16.jpg",
//       "description": "Incluye estuche rígido y kit de limpieza",
//       "stock": 10,
//       "status": "New",
//       "adminId": null,
//       "categoryId": 2,
//       "users": []
//     }
// ]