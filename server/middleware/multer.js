const multer = require('multer')
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      // set เป็น test ไปก่อน เดียวทำ database เสร็จก็จะย้ายไป uploads
      callback(null,'./static/images')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage })

module.exports =upload