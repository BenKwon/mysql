const router= require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

router.get('/',async (req,res)=>{
    const posts = await prisma.post.findMany({
        select:{
            title:true,
            post:true,
            created_at:true,
            update_at:true
        }
    });
    return res.json(posts);
})

router.get('/:userId', async (req,res)=>{
    const userId= parseInt(req.params.userId);
    const userExists = await prisma.user.findFirst(
        {
            where:{
                id: userId
            }
        }
    )
    if(!userExists){
        return res.status(400).json({
            msg: "user does not exist"
        })
    }
    const posts = await prisma.post.findMany({
        select:{
            title: true,
            post: true,
            created_at: true,
            updated_at: true
        },
        where:{
            user_id: userId
        }
    });
    res.json(posts);
});

// upload post
router.post('/', async (req,res)=>{
    const {title , post, user_id}= req.body;
    const userExists = await prisma.user.findFirst(
        {
            where:{
                id: user_id
            }
        }
    );
    if(!userExists){
        return res.status(400).json({
            msg: "user does not exist"
        })
    }
    const newPost = await prisma.post.create({
        data :{
            user_id,
            title,
            post
        },
        select:{
            title: true,
            post : true,
            created_at: true,
            update_at: true
        }
    });
    res.send(newPost);
}
);
module.exports = router;

