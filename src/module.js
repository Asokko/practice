console.log('module.js')

async function start() {
   return await Promise.resolve('async work')
}

start().then(console.log)