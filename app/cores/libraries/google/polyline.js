import polyline from 'polyline'

export class Polyline {
  static concat (encodedList) {
    let paths = []
    encodedList.forEach(function (endcoded) {
      paths = paths.concat(polyline.decode(endcoded))
    })
    return polyline.encode(paths)
  }
  static encode (paths) {
    return polyline.encode(paths)
  }
}
