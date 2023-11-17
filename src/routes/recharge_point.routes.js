import { prisma } from "../db"
const router = Router();

roouter.post('/recharge_point/create',async(req,res)=>{
    prisma.recharge_point.create({
        data:req.body
    }).then((data)=>{
        data = excluirCampos(data,['id'])
        res.json({msg:"OK",data:data});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({ msj: "Error", error: error });
    })
})

export default router;