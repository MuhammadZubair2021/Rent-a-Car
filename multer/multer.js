
//Uploading and saving image is follow...
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const fileFilter = (req,file , cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
};

const uploads = multer({
    storage:storage,
    limits:{
    fileSize:1024*1024*5 // Maximum 5 MB.
    },
    fileFilter:fileFilter
});