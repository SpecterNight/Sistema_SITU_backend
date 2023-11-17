import { Router } from "express";
import { prisma } from "../db";

const router = Router();

router.post('/rol/crete', async (req, res) => {
    prisma.rol.create({
        data: req.body
    }).then((data) => {
        res.json({ msg: "OK", data: data });
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ msj: "Error", error: error });
        })
})
export default router;