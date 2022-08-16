const express = require('express')
const app = express()
const Memcached = require('memcached')
const memcached = new Memcached('memcluster.lhvqbe.0001.usw2.cache.amazonaws.com:11211')
memcached.on('failure', function( details ){ sys.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
memcached.on('reconnecting', function( details ){ sys.debug( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});

const PORT = 3001
app.get('/set', (req, res, next) => {
  memcached.set('name', 'Rogmer', 30, function(err){
    if(err){
      console.log(err)
      return
    }
    res.end('Adding name to the memcached')
  })
})
apt.get('/get', (req, res, next) => {
  memcached.get('name', function(err, data) {
    if(err){
      console.log(err)
      return
    }
    console.log(data)
    res.end(data)
  })
})
app.listen(PORT, () => {
  console.log('App is running and listening on port',PORT)
})


