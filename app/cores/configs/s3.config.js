export default {
  temporaryDir: '.tmp/',
  key: process.env.AWS_KEY,
  secret: process.env.AWS_SECRET,
  bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION,
  type: {
    dataEntry: {dirname: 'data-entry'},
    signature: {dirname: 'signature'},
    depositedCashBill: {dirname: 'deposited-cash-bill'}
  }
}
