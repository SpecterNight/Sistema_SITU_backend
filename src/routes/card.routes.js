import { Router } from "express";
import { prisma } from "../db"
import { validateFormatRegisterCard } from "../logic/cardLogic";
const router = Router();

//Crear una tarjeta para una persona por external_id persona
router.post('/card/registe/', async (req, res) => {
    const { error } = validateFormatRegisterCard(req);
    if (error) {
        return res.status(400).json({ msg: "Faltan campos en el formulario", error: error.details[0].message });
    }
    prisma.card.create({
        data: {
            code: req.body.code,
            person: {
                connect: {
                    id: req.body.external_id_person
                }
            }
        }
    }).then((data) => {
        data = excluirCampos(data, ['id'])
        res.json({ msg: "OK", data: data });
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ msj: "Error al registrar tarjeta", error: error });
        })
})

router.put('/card/deduct/', async (req, res) => {
    const { external_id_card, external_id_rp, amount } = req.body
    awaitprisma.card.update({
        where: {
            externalID: external_id_card
        },
        data: {
            balance: {
                decrement: amount
            }
        }
    }).then((data) => {
        if (!data) return res.status(400).json({ msj: "Error", error: "No se desconto" });
        prisma.transaction.create({
            data: {
                amount: amount,
                type: 'Descuento',
                balance: data.balance,
                recharge_point: {
                    connect: {
                        id: external_id_rp
                    }
                }
            }
        })
        res.json({ msg: "OK", data: data });
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ msj: "Error al descontar", error: error });
        })
})

router.put('/card/recharge/', async (req, res) => {
    const { external_id_card, external_id_rp, amount } = req.body
    prisma.card.update({
        where: {
            externalID: external_id_card
        },
        data: {
            balance: {
                increment: amount
            }
        }
    }).then((data) => {
        if (!data) return res.status(400).json({ msj: "Error", error: "No se recargo" });
        prisma.transaction.create({
            data: {
                date: { getDate },
                amount: amount,
                type: 'Recarga',
                balance: data.balance,
                recharge_point: {
                    connect: {
                        id: external_id_rp
                    }
                }
            }
        })
        res.json({ msg: "OK", data: data });
    })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ msj: "Error al recargar", error: error });
        })
})

export default router;