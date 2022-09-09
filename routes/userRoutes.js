const router = require ("express").Router();

router.get("/", async (res,req) =>{
res.send("Listening")
})


module.exports = router;