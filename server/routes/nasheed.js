const router = require('express').Router()

const nasheed = require("../models/nasheed");

router.post("/save", async (req, res) => {
    const newNasheed = nasheed({
      name: req.body.name,
      imageURL: req.body.imageURL,
      nasheedURL: req.body.nasheedURL,
      album: req.body.album,
      artist: req.body.artist,
      language: req.body.language,
      category: req.body.category,
    });

    try {
      const savedNasheed = await newNasheed.save();
      return res.status(200).send({ success: true, nasheed: savedNasheed });
    } catch (error) {
      return res.status(400).send({ success: false, msg: error });
    }
  });

  router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const data = await nasheed.findOne(filter);
  
    if (data) {
      return res.status(200).send({ success: true, nasheed: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not Found" });
    }
  });

  
router.get("/getAll", async (req, res) => {
    const options = {
      sort: {
        createdAt: 1,
      },
    };
    const data = await nasheed.find(options);
    if (data) {
      return res.status(200).send({ success: true, nasheed: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data not Found" });
    }
  });

  router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await nasheed.findOneAndUpdate(
        filter,
        {
            name: req.body.name,
            imageURL: req.body.imageURL,
            nasheedURL: req.body.nasheedURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category,
        },
        options
      );
      res.status(200).send({ nasheed: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  });

router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const result = await nasheed.deleteOne(filter);
  
    if (result) {
      return res
        .status(200)
        .send({ success: true, msg: "Data Deleted Successfully", data: result });
    } else {
      return res.status(400).send({ success: false, msg: "Data not Found" });
    }
  });

module.exports = router