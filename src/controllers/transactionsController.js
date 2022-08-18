const {Transactions,User}=require("../db")


const get_transactions=async(req,res)=>{
    try {
        let usersr=await Transactions.findAll({
            include:{model:User}
        })
            console.log(usersr)
            res.send(usersr)
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
    get_transactions
}