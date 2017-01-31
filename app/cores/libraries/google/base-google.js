import crypto from 'crypto'
import qs from 'querystring'
import request from 'request'

export class BaseGoogle {
  // see if this limit needs to be bound to the specific API call, Ex.: distance has a limit of 2000
  REQUEST_MAX_LENGTH = 2048
  constructor (config) {
    this._config = config
  }

  setConfig (config) {
    this._config = config
  }

  _buildUrl (params, path) {
    if (this._config.google_client_id && this._config.google_private_key) {
      params.client = this._config.google_client_id

      // TODO
      // is this the best way to clean the query string?
      // why does request break the signature with ' character if the signature is generated before request?
      // signature = signature.replace(/\+/g,'-').replace(/\//g,'_');
      let query = qs.stringify(params).split('')
      for (let i = 0; i < query.length; ++i) {
        // request will escape these which breaks the signature
        if (query[i] === '\'') {
          query[i] = escape(query[i])
        }
      }
      query = query.join('')

      path = path + '?' + query

      // Create signer object passing in the key, telling it the key is in base64 format
      let signer = crypto.createHmac('sha1', this._config.google_private_key)

      // Get the signature, telling it to return the signature in base64 format
      let signature = signer.update(path).digest('base64')
      signature = signature.replace(/\+/g, '-').replace(/\//g, '_')
      path += '&signature=' + signature
      return path
    } else {
      return path + '?' + qs.stringify(params)
    }
  }

  /**
   * Makes the request to Google Maps API.
   */
  caller (path, params, encoding) {
    let secure = this._config.secure

    if (this._config.key != null) {
      // google requires https when including an apiKey
      secure = true
      params.key = this._config.key
    }

    path = this._buildUrl(params, path)

    return new Promise((resolve, reject) => {
      if (path.length > this.REQUEST_MAX_LENGTH) {
        let error = new Error('Request too long for google to handle (' + this.REQUEST_MAX_LENGTH + ' characters).')
        reject(error)
      }

      let options = {
        uri: (secure ? 'https' : 'http') + '://' + path
      }

      if (encoding) options.encoding = encoding
      if (this._config.proxy) options.proxy = this._config.proxy
      request(options, function (error, res, data) {
        if (error) {
          return reject(error)
        }
        if (res.statusCode === 200) {
          return resolve(JSON.parse(data))
        }

        error = new Error(data)
        error.code = res.statusCode
        return reject(error)
      })
    })
  }
}
