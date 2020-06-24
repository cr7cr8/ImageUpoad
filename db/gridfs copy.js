const multer = require("multer");
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const { connDB, connDB2 } = require("./db")
const Jimp = require('jimp');
const images = require("images");
const collectionName = "file_uploads";
const fs = require("fs");
const axios = require("axios");
const FormData = require('form-data');
const concat = require("concat-stream");

function createFileModel({ connDB, collectionName }) {
    const fileSchema = new mongoose.Schema({
        obj: { type: Object }

    }, { timestamps: false, collection: collectionName })
    fileSchema.methods = {
        upload: function (req, res, next) {
            //    return multerUpload(this).fields([{ name: 'file', maxCount: 1 },{name:'dodo',maxCount:1}])(req, res, next)
            //    req.files["dodo"] return the array of dodo files after upload

            return multerUpload(this).fields([{ name: 'file', maxCount: 1 }])(req, res, next)
        },
    };
    fileSchema.statics = {
        fetch: function (req, res) {
            return gridFsFetch.call(this, req, res)
        },

        download: function (req, res) {
            return gridFsDownload.call(this, req, res)
        },
        delete: function (req, res, next) {
            // return console.log("start delete", req.params.id);
            return gridFsDelete.call(this, req, res, next)
        },

        upload: function (req, res, next) {
            return upload.call(this/*, collectionName*/).fields([{ name: 'file', maxCount: 10 }])(req, res, next)
        },

        update: function (req, res, next) {
            return collectionUpdate.call(this, req, res, next)
        },
        list: function (req, res, next) {
            return gridFsFind.call(this, req, res, next)

        },
        getDocIDs: function (req, res, next) {

            if (req.files['file']) {
                req.files['file'].forEach(file => {
                    console.log(file.id)

                })
            }
        }


    };
    return connDB.model(collectionName, fileSchema)
}


function upload(/*collectionName*/) {

    const storage = new GridFsStorage({

        db: this.db.db,

        file: (req, file) => {
            console.log("------- mongoDB_storage start-------", file.originalname);

            return new Promise((resolve, reject) => {

                resolve({
                    filename: file.originalname,
                    bucketName: this.schema.options.collection // collectionName,     //match the collection name
                    //  metadata: metadata||{},
                });
            })
            // cannot use then, otherwise file will not be uploaded into pic_file collection, file name will not be correct

        }
    });
    return multer({ storage: storage });
}



function multerUpload(model) {

    const storage = new GridFsStorage({

        db: model.db,
        client: model.db.client,
        file: (req, file) => {
            console.log("------- mongoDB_storage start-------", file.originalname);

            return new Promise((resolve, reject) => {

                resolve({
                    filename: file.originalname,
                    bucketName: model.schema.options.collection,     //match the collection name
                    metadata: model.obj,
                });
            })
            // cannot use then, otherwise file will not be uploaded into pic_file collection, file name will not be correct

        }
    });
    return multer({ storage: storage });
}


function gridFsFetch(req, res, next) {
    const self = this;
    var gfs = new mongoose.mongo.GridFSBucket(this.db.db, {
        chunkSizeBytes: 255 * 1024,
        bucketName: this.schema.options.collection,
    });

    console.log("file id is ", req.files["file"][0].id);


    const cursor = gfs.find({ '_id': mongoose.Types.ObjectId(req.files["file"][0].id), }, { limit: 1 })
    cursor.hasNext().then(result => {
        if (result) {
            cursor.forEach(pic => {
                let gfsrs = gfs.openDownloadStream(pic._id);
                //   let writeStream = fs.createWriteStream(pic.filename);


                const arr = [];

                gfsrs.on("data", function (data) {
                    arr.push(data);

                    //  writeStream.write(data)


                    //console.log(data)
                    // Jimp.read(data).then(function (image) {
                    //     image
                    //         .resize(100, Jimp.AUTO) // resize
                    //         .quality(60)
                    //         //image.scale(0.2)
                    //         .write("small" + pic.filename);
                    // }).catch(function (err) {
                    //     console.log(err);
                    // }).then(function () { console.log("all done") });






                })
                gfsrs.on("close", function () {

                    const buf = Buffer.concat(arr);

                    // console.log(arr.length)
                    //  writeStream.end();

                    // writeStream.on("close",function(){

                    Jimp.read(buf).then(function (image) {
                        image
                            .resize(100, Jimp.AUTO) // resize
                            .quality(60)
                            //image.scale(0.2)
                            //.write("small" + pic.filename,function(){console.log("done"),res.send("done")});
                            //.getBase64Async(Jimp.MIME_JPEG)
                             .getBufferAsync(Jimp.MIME_JPEG)
                            //.writeAsync("aaa.png")
                            .then(function (imgBuffer) {


                                res.send(imgBuffer);
                            
                            const rs = imgBuffer;
                              //  const rs = fs.createReadStream(imgBuffer);
                               // const rs = fs.createReadStream("./aaa.png");
                             //   rs.on("end", function () {

                                    const form_data = new FormData();
                                    form_data.append("file", rs);

                                    axios.post("/api/picture/upload3", form_data,
                                        {

                                            headers: { 'content-type': `multipart/form-data; boundary=^^^` }
                                            // header:data.getHeaders(),
                                        }
                                    ).then(data => {
                                        console.log(data)
                                    })


                            //    })




                                //  data.append('file', fs.createReadStream("./aaa.png"),
                                //   data.append("file",imgBuffer);
                                // {
                                //     filename: "small_" + pic.filename
                                // }


                            })

                    }).catch(function (err) {
                        console.log(err);
                    })



                    //.then(function(){console.log("all done")});

                    // })


                })


            })



        }
    })
}


function gridFsDownload(req, res, next, /*collectionName*/) {
    // console.log(this.schema.options.collection)

    console.log(`------downloading ${req.params.id} start ----`);

    var gfs = new mongoose.mongo.GridFSBucket(this.db.db, {
        chunkSizeBytes: 255 * 1024,
        bucketName: this.schema.options.collection,//collectionName//this.schema.options.collection,
    });

    // const cursor = gfs.find({ 'metadata.id': Number(req.params.id), "metadata.owner": req.user.username }, { limit: 1 })

    const cursor = gfs.find({ '_id': mongoose.Types.ObjectId(req.params.id), /* "metadata.owner": req.user.username */ }, { limit: 1 })

    cursor.hasNext().then(result => {
        console.log(result)
        if (result) {

            cursor.forEach(pic => {

                let gfsrs = gfs.openDownloadStream(pic._id);

                res.header('content-type', pic.contentType);
                res.header("access-control-expose-headers", "content-type")
                res.header("file-name", encodeURIComponent(pic.filename))
                res.header("access-control-expose-headers", "file-name")

                res.header("content-length", pic.length)
                //         res.header("access-control-expose-headers", "content-length")

                // gfsrs.pipe(res)
                gfsrs.on("data", function (data) {
                    console.log(data);
                    res.write(data);
                })
                gfsrs.on("close", function () {
                    res.end("");
                    console.log(`------downloading ${pic.filename} Done !----`);
                })
            })
        }
        else {
            res.status(400).json("no file found")
        }

    })

}

function gridFsDelete(req, res) {

    console.log("gridfFs Deleting")

    var gfs = new mongoose.mongo.GridFSBucket(this.db.db, {
        chunkSizeBytes: 255 * 1024,
        bucketName: this.schema.options.collection,
    });

    // return gfs.find({ 'metadata.id': Number(req.params.id), "metadata.owner": req.user.username }, { limit: 1 }).forEach(pic => {

    const cursor = gfs.find({ '_id': mongoose.Types.ObjectId(req.params.id), }, { limit: 1 });


    cursor.hasNext().then(function (result) {
        if (result) {
            cursor.forEach(pic => {

                gfs.delete(mongoose.Types.ObjectId(pic._id), function (err) {

                    if (err) { console.log(err); res.status(500).json(err) }
                    else {
                        console.log("file deleted");

                        // res.send(pic._id)
                    }

                })
            }).then(function () { res.json(req.params.id + " is deleted"); })

        }
        else {
            return res.send(req.params.id + " is not in database")
        }


    });


}

function gridFsFind(req, res, next) {
    var gfs = new mongoose.mongo.GridFSBucket(this.db.db, {
        chunkSizeBytes: 255 * 1024,
        bucketName: this.schema.options.collection,
    });

    const arr = [];

    const cursor = gfs.find();


    cursor.hasNext().then(function (result) {

        if (result) {

            cursor.forEach(pic => {
                arr.push({ fileId: pic._id, fileName: pic.filename });

            }).then(function () {
                res.json({ fileList: arr })

            })


            //    console.log(result)

        }
        else {
            res.status(400).json("no picture has been uploaded")
        }



    })





    // if (arr.length === 0){return res.json("pic not in database")}
    // else {
    //     res.json(arr)

    // }



}




function collectionUpdate(req, res, next, /*collectionName*/) {

    if (req.files['file']) {
        const arr = [];

        req.files['file'].forEach(file => {
            this.db.db.collection(this.schema.options.collection + ".files").update(
                { _id: file.id },
                { $set: { "metadata": { ...JSON.parse(req.body.obj), /*"owner": req.user.username*/ } } },
                (err, result) => {

                    if (err) {
                        return res.status(500).json(" cannot add metadata to the file")
                    }
                    else {
                        const myobj = JSON.parse(req.body.obj);
                        arr.push({ fileId: file.id, fileName: myobj.filename })
                        if (arr.length === req.files["file"].length) {
                            res.json({ fileList: arr })
                        }

                        //  console.log(this.schema.options.collection)
                        //  next()
                    }
                }
            )
        })
    }
    else {
        next()
    }
}

function getDocIDs_(req, res, next) {
    if (req.files['file']) {
        req.files['file'].forEach(file => {
            console.log(file)

        })
    }


}






module.exports = {
    FileUpload: createFileModel({ connDB, collectionName }),
    PicUpload: createFileModel({ connDB: connDB, collectionName: "pic_uploads" }),
    ResizeUpload: createFileModel({ connDB: connDB, collectionName: "resize_uploads" }),
    SmallUpload: createFileModel({ connDB: connDB, collectionName: "small_uploads" }),
}
