export function pub () {
  if (navigator.userAgent.indexOf('Chrome') !== -1) {
    alert('是chrome浏览器')
  } else {
    alert('不是')
  }
}
export default {
  pub
}
