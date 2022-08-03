
const { Category } = require('../db');

const controllerGet=async(req, res)=>{
    try {
        let categorys = await Category.findAll();
        return res.status(200).send(categorys);
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerGetId=async(req, res)=>{
    try {
        if(req.params.id){
            let category = await Category.findByPk(req.params.id);
            if(!category){
                throw new TypeError("Error no existe una categoria con este Id")
            }
            return res.status(200).send(category);
        }else{
            throw new TypeError("Error al validar el Id de la categoria")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerPost=async(req, res)=>{
    const name= new String(req.body.name);
    try {
        if(req.body.hasOwnProperty("name") && name.length>2){
            let categorys = await Category.findAll();
            const newCategory=[];
            if(categorys[0]){
                newCategory.push(req.body)
            }else{
                newCategory.push({"name": "stringed"})
                newCategory.push({"name": "wind"})
                newCategory.push({"name": "percussion"})

            }
            await Category.bulkCreate(newCategory)
            res.status(200).send("Categoria creada con exito")
        }else{
            throw new TypeError("Error al validar el name de la categoria")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerPut=async(req, res)=>{
    const {id}=req.params;
    const name= new String(req.body.name);
    try {
        if(id && (req.body.hasOwnProperty("name") && name.length>2)){
            let category = await Category.findByPk(id);
            if(!category){
                throw new TypeError("Error no existe una categoria con este Id")
            }
            await category.update(req.body)
            res.status(200).send("categoria actualizada")
        }else{
            throw new TypeError("Error al validar el Id de la categoria")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerDelete=async(req, res)=>{
    const {id}=req.params;
    try {
        if(id){
            const deleteCategory=await Category.destroy({
                where: {id: id}
            })
            if(!deleteCategory){
                throw new TypeError("Error no se encontro una categoria con este Id")
            }
            res.status(200).send("categoria eliminada")
        }else{
            throw new TypeError("Error al validar el Id de la categoria")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}


module.exports = {controllerGet, controllerPost, controllerGetId, controllerDelete, controllerPut}