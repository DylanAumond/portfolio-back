const sharp = require('sharp')
const fs = require('fs')

// delete the uncompressed file
function deleteImage(filename) {
    const file = './public/upload/' + filename
    try {
        //remove uploaded file
        fs.unlinkSync(file)
    } catch (err) {
        console.error(err)
    }
  }

module.exports.compressImage = (width,height) => {
    return (req,res,next) => {
        if(req.file != null){
            sharp('public/upload/' + req.file.filename)
            .resize(width, height,{fit: 'contain',background: 'transparent' })
            .webp()
            .toFile('public/images/' + req.file.filename)
            .then(()=>deleteImage(req.file.filename))
            .catch(function(err) {
                console.log(err)
            })
        }

        if(req.files != null){
            req.files.forEach(file => {
                sharp('public/upload/' + file.filename)
                .resize(width, height,{fit: 'contain',background: 'transparent' })
                .webp()
                .toFile('public/images/' + file.filename)
                .then(()=>deleteImage(file.filename))
                .catch(function(err) {
                    console.log(err)
                })
            });
        }

        return next()
    }
}