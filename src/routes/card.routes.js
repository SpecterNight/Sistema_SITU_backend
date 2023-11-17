import { prisma } from "../db"
import { validateFormatRegisterCard } from "../logic/cardLogic";


//Crear una tarjeta para una persona por external_id persona
router.post('/card/registe/', async (req,res)=>{
    const {error} = validateFormatRegisterCard(req);
    if (error) {
        return res.status(400).json({msg:"Faltan campos en el formulario",error:error.details[0].message});
    }
    prisma.card.create({
        data:{
            code: req.body.code,
            person:{
                connect:{
                    id:req.body.external_id_person
                }
            }
        }
    }).then((data)=>{
        data = excluirCampos(data,['id'])
        res.json({msg:"OK",data:data});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({ msj: "Error al registrar tarjeta", error: error });
    })
})