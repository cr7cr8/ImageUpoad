const express = require("express");
const router = express.Router();
const jimp = require("jimp");


const { PicUpload } = require("../db/gridfs");


router.post("/upload", PicUpload.upload.bind(PicUpload), PicUpload.uploadSmall.bind(PicUpload), PicUpload.update.bind(PicUpload))



router.get("/delete/:id", PicUpload.delete.bind(PicUpload))

router.get("/list", PicUpload.list.bind(PicUpload))
router.get("/downloadsmall/:id",PicUpload.downloadSmall.bind(PicUpload))


router.get("/download/:id", PicUpload.download.bind(PicUpload))

module.exports = router