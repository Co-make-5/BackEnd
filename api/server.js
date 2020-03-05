const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const restricted = require("../auth/restricted-middleware.js");
const authrouter = require("../auth/auth-router.js");
const issuesrouter = require("../issues/issues-router.js");
const usersrouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authrouter);
server.use('/api/issues', restricted, issuesrouter);
server.use('/api/users', restricted, usersrouter);

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

server.post('/api/upload', (req, res, next) => {
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.send(err)
      }
      console.log('file uploaded to server')
      console.log(req.file)
  
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: 'invincible64',
        api_key: '144123923829178',
        api_secret: 'M-L6PwtoseqqMyIO_gjjdsQyrA8'
      })
      
      const path = req.file.path
      const uniqueFilename = new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` },
        function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')

          const fs = require('fs')
          fs.unlinkSync(path)

          res.json(image)
        }
      )
    })
  })

module.exports = server;