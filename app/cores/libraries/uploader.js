import s3 from 's3'
import {config} from 'app/cores/config'

let s3Client = s3.createClient({
  s3Options: {
    accessKeyId: config.s3.key,
    secretAccessKey: config.s3.secret,
    region: config.s3.region
  }
})

export function s3Upload (path, overideOptions) {
  let options = {
    localFile: path,
    s3Params: {
      Bucket: config.s3.bucket
    }
  }
  if (overideOptions) {
    for (let key in overideOptions) {
      options.s3Params[key] = overideOptions[key]
    }
  }

  return new Promise(function (resolve, reject) {
    let uploader = s3Client.uploadFile(options)
    uploader.on('error', reject)
    uploader.on('end', function () {
      resolve(s3.getPublicUrlHttp(options.s3Params.Bucket, options.s3Params.Key))
    })
  })
}
