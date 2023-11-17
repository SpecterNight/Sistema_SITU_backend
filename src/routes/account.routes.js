import { prisma } from "../db";
import { validateRegistrationForm } from "../logic/accountLogic"
import bcryp from "bcrypt"
import jwt from "jsonwebtoken"
import { excluirCampos } from "../logic/exclusionLogic";

router.post("/account/signUp", async (req, res)=>{
    const {error} = validateRegistrationForm(req);
    const passwordHashed = await bcryp.hash(req.body.password,10)

    if (error) {
        return res.status(400).json({msg:"Faltan campos en el formulario",error:error.details[0].message});
    }
    prisma.person.create({
        data:{
            name:req.body.name,
            last_name: req.body.last_name,
            identification: req.body.identification,
            phone: req.body.phone,
            account: {
                create:{
                    username: req.body.username,
                    password: passwordHashed,
                    rol:{
                        connect:{
                            id: req.body.rol
                        }
                    }
                }
            }

        }
    }).then((data)=>{
       data = excluirCampos(data,['id','account.id','account.password'])
       res.json({msj:"Cuenta creada",data:data}) 
    })
})

router.post('/account/login', async (req,res)=>{
    const {username,password}=req.body;
    prisma.account.findUnique({
        where:{
            username:username
        },
        include:{
            rol:true,
            person:true
        }
    }).then(async(user)=>{
        const correctPassword = !user ? false:await bcryp.compare(password, user.password)
        if(!(user && correctPassword)) return res.status(401).json({error:'Credenciales incorrectas'});
        
        user = excluirCampos(user,['id','password','rol.id','person.id'])

        console.log("Despues de excluir",user)

        const tokenParams = {
            user:user,
        }
        const token = jwt.sign(tokenParams, process.env.SECRET_KEY,{
            expiresIn: 60 * 60 * 24
        })

        return res.json({msg:"OK", usuario:user,token:'Bearer'+token})
    })
})

router.get('/account/:external_id',(req,res)=>{
    prisma.account.findUnique({
        where:{
            externalID: req.params.external_id
        },
        include:{
            rol:true,
            person:true
        }
    }).then((data)=>{
        if(!data) return res.status(400).json({msj:"Error al obtener la cuenta", error:"Cuenta no encontrada"});
        data = excluirCampos(user,['id','password','rol.id','person.id']);
        res.json({msg:"OK",data:data});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({ msj: "Error al registrar la cuenta", error: error });
    })
})