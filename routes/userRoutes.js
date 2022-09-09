const router = require ("express").Router();

router.get("/test", async (res,req) =>{
 res.send("Test")
})

router.post("/post",(req,res) =>{
  const username = req.body.username;
  console.log(username);
})

module.exports = router;