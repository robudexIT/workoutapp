const Memcached  = require('memcached')
require('dotenv').config()
module.exports =  new Memcached(process.env.MEMCACHED_CLUSTER_ENDPOINT)


// username = {
//     refreshToken: [],
//     accessToken: []
// }