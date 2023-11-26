import { getDefaultBrowserConfig, ids } from '../analytics'
import { getUserIp } from '../services'

function defer() {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  
  return deferred
}

function debounce(fn, wait = 0) {
  let deferred
  let timer
  let pendingArgs = []

  function reset() {
    const thisDeferred = deferred
    clearTimeout(timer)

    Promise.resolve(fn.call(this, pendingArgs)).then(
      thisDeferred.resolve,
      thisDeferred.reject,
    )

    pendingArgs = []
    deferred = null
  }

  return async function debounced(...args) {
    const currentWait = wait
    const ip = await getUserIp()
    const browserConfig = getDefaultBrowserConfig({
      appId: ids.instId,
      sessionId: ids.sessionId,
      customer: `${process.env.contentCustomerId}`,
      brand: 'total',
      ip,
    })
    const data =  {
      ...browserConfig, ...args[0].data,
      event: args[0].category,
    }

    return fn.call(this, data)

    if (deferred) {
      clearTimeout(timer)
    } else {
      deferred = defer()
    }
    pendingArgs.push(payloadToSend)
    timer = setTimeout(reset.bind(this), currentWait)

    return deferred.promise
  }

}

export default debounce
