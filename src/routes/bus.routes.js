import { Router } from "express";
import { prisma } from "../db";
import { validateBusForm } from "../logic/busLogic";

const router = Router();

router.post('/bus/register',async(req,res)=>{
    const {error} = validateBusForm(req);

    if (error) {
        return res.status(400).json({msg:"Faltan campos en el formulario",error:error.details[0].message});
    }
    prisma.bus.create({
        data:req.body
    }).then((data)=>{
        res.json({msg:"OK",data:data})
    })
    .catch((error)=>{
        res.json({msg:"Error",error:error})
    })
})

/*router.put('/bus/addPassenger',async(req,res)=>{
    const {external_id_bus} = req.body;
    prisma.bus.update({

    })
})*/

export default router;