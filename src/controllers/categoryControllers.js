
const { Category } = require('../db');

const controllerGet=async(req, res)=>{
    try {
        let categories = await Category.findAll();
        return res.status(200).send(categories);
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerGetId=async(req, res)=>{
    try {
        if(req.params.id){
            let category = await Category.findByPk(req.params.id);
            if(!category){
                throw new TypeError("Error, category not found with this Id")
            }
            return res.status(200).send(category);
        }else{
            throw new TypeError("Error, The Id entered is not valid")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}

const controllerGetName=async(req, res)=>{
    try {
        if(req.query.name){
            let category = await Category.findOne({where:{name:req.query.name}});
            if(!category){
                throw new TypeError("Error, Category name not found")
            }
            return res.status(200).send(category);
        }else{
            throw new TypeError("Error, Category name invalid")
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
            res.status(200).send("Category created")
        }else{
            throw new TypeError("Error, Category name invalid")
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
                throw new TypeError("Error, Category Id not found")
            }
            await category.update(req.body)
            res.status(200).send("category updated")
        }else{
            throw new TypeError("Error, Category Id invalid")
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
                throw new TypeError("Error, category Id not found")
            }
            res.status(200).send("category deleted")
        }else{
            throw new TypeError("Error, Category Id invalid")
        }
    } catch (e) {
        return res.status(400).send(e.message);
    }
}


module.exports = {controllerGet, controllerPost, controllerGetId, controllerDelete, controllerPut,controllerGetName}