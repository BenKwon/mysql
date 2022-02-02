const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const { user }= new PrismaClient()
router.get('/', async (req,res)=>{
    const users = await user.findMany({
        select: {
            username: true,
            post: true
        },
        // where:{
            // active: true
        // }
    });
    console.log(users);
    res.json(users);
});
router.post('/', async (req,res)=>{
    const { username } = req.body;
    const userExists = await user.findUnique({
        where:{
            username: username
        },
        select:{
            username: true
        }
    })
    if(userExists){
        res.status(400).json({
            msg : "user already exists"
        })
    }else{
        const newUser = await user.create({
            data: {
                username
            },
            select:{
                username: true
            }
        });
        res.json(newUser);
    }
})
module.exports = router;
// router.get('/',async    )