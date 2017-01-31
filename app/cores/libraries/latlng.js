let _deg2rad = function _deg2rad (deg) {
  return deg * (Math.PI / 180)
}

export function getDistanceFromTwoPoints (firstPoint, secondPoint) {
  let R = 6371
  let dLat = _deg2rad(secondPoint.lat - firstPoint.lat)
  let dLon = _deg2rad(secondPoint.lng - firstPoint.lng)
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(_deg2rad(firstPoint.lat)) * Math.cos(_deg2rad(secondPoint.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  return d
}

export function validateLatLng (lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}
