const tegsCol = document.querySelector('.tegs-col')
const addTegBtn = document.querySelector('.add_teg_btn')

const appendTegsToCol = () => {
  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'Тег')
  input.setAttribute('class', 'teg-input teg')
  input.setAttribute('name', 'teg')

  tegsCol.append(input)
}
function removeOneTeg(elem) {
  elem.target.remove()
  this.removeEventListener('click', removeOneTeg)
}
const removeTeg = (tegInputEl) => {
  tegInputEl.forEach((el) => {
    const eventEl = el.addEventListener('dblclick', removeOneTeg)
  })
}
addTegBtn.addEventListener('click', () => {
  appendTegsToCol()
  removeTeg(document.querySelectorAll('.teg-input'))
})
