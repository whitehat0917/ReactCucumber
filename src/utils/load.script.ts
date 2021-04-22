export function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
