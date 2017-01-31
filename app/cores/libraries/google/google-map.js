import {endpoint} from 'app/cores/libraries/google/endpoint'
import {BaseGoogle} from 'app/cores/libraries/google/base-google'

export class GoogleMap extends BaseGoogle {
  directions (params) {
    return this.caller(endpoint.DIRECTION, params)
  }
  geocode (params) {
    return this.caller(endpoint.GEOCODE, params)
  }
}
