const quoteEl = document.querySelector('.box-quote')
const quoteText = quoteEl.textContent

function quoteAnim() {
  quoteEl.textContent = ''
  let count = 0
  const interquote = setInterval(() => {
    count++
    if (count === quoteText.length) return clearInterval(interquote)
    quoteEl.textContent += quoteText[count]
  }, 100)
  quoteEl.textContent
}
quoteAnim()
