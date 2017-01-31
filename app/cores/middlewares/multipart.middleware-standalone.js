import KoaConvert from 'koa-convert'
import KoaBody from 'koa-body'
import {config} from 'app/cores/config'
import fs from 'fs'

if (!fs.existsSync(config.s3.temporaryDir)) {
  fs.mkdirSync(config.s3.temporaryDir)
}

const multipart = new KoaConvert(new KoaBody({
  multipart: true,
  formidable: {
    uploadDir: config.s3.temporaryDir
  }
}))

export default multipart
