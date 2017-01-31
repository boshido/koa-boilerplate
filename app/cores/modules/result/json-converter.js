import KoaJson from 'koa-json'
import KoaConvert from 'koa-convert'

export default new KoaConvert(new KoaJson())
