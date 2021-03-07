const express = require("express");
const router = express.Router();
const Phone = require("../../models/Phone");

router.post("/", async (req, res) => {
  const {
    brand,
    name,
    price,
    ram,
    memory,
    camera,
    url,
    screen,
    os,
    processor,
    sim,
  } = req.body;

  try {
    let phone = new Phone({
      brand,
      name,
      price,
      ram,
      memory,
      camera,
      url,
      screen,
      os,
      processor,
      sim,
    });

    await phone.save()
    res.json({phone})
  }
  catch (err){
      console.error(err.message)
      res.status(500).send("Server error(product)");
  }
});

router.get("/:id", async (req,res)=>{
    let id = req.params.id
    let phone = await Phone.findById(id)
    res.json({phone})
})



module.exports = router;

