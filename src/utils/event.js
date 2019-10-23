const list = {}

export function on(name, func) {
  if (list[name]) {
    list[name].push(func)
  } else {
    list[name] = [func]
  }
  console.log(list)
}

export function off(name, func) {
  if (!list[name]) return
  if (func) {
    list[name] = list[name].filter(o => o !== func)
  } else {
    list[name] = []
  }
}

export function emit(name, ...args) {
  if (!list[name]) return
  list[name].forEach(o => o(...args))
}
