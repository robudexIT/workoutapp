const Memcached  = require('memcached-promise')
require('dotenv').config()
module.exports =  new Memcached(process.env.MEMCACHED_CLUSTER_ENDPOINT)


// username = {
//     refreshToken: [],
//     accessToken: []
// }

// rogmer: { resfreshToken: [], accessToken: []}