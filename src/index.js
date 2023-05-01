import './assets/style.css'

let element, shiftX, shiftY, currentDiv

const main = document.querySelector('.main')
const html = document.querySelector('html')

const tempDel = () => {
  main.querySelector('.temp-div') && main.querySelector('.temp-div').remove()
}

const addTask = (e) => {
  let div = document.createElement('div')
  let delElement = document.createElement('div')
  let textElement = document.createElement('div')

  delElement.classList.add('delete')
  textElement.classList.add('text')
  div.classList.add('task')
  div.classList.add('grab')
  delElement.innerHTML = '&#215;'
  textElement.textContent = 'New task!'

  div.insertBefore(delElement, null)
  div.insertBefore(textElement, null)
  console.log(e.previousElementSibling)
  e.previousElementSibling.insertBefore(div, null)
}

const deleteTask = (e) => {
  e.parentElement.remove()
}

const onMouseMove = (e) => {
  currentDiv = e.target.id

  element.style.top = e.clientY - shiftY + 'px'
  element.style.left = e.clientX - shiftX + 'px'

  if (e.target.classList.contains('task')) {
    if (currentDiv !== e.target.id)
      return

    tempDel()

    let tempDiv = document.createElement('div')
    tempDiv.classList.add('temp-div')
    tempDiv.style.height = element.offsetHeight - 30 + 'px'

    if (e.clientY <= e.target.offsetTop + e.target.offsetHeight / 2)
      e.target.parentElement.insertBefore(tempDiv, e.target)
    else e.target.parentElement.insertBefore(tempDiv, e.target.nextSibling)
  }
}

const onMouseUp = (e) => {
  if (e.target.parentElement.classList.contains('card-body'))
    if (e.clientY <= e.target.offsetTop + e.target.offsetHeight / 2)
      e.target.parentElement.insertBefore(element, e.target)
    else e.target.parentElement.insertBefore(element, e.target.nextSibling)

  element.classList.remove('task-dragged')
  element.style.cssText = ''
  element = undefined

  document.documentElement.removeEventListener('mouseup', onMouseUp)
  document.documentElement.removeEventListener('mousemove', onMouseMove)
  html.classList.remove('grabbing')

  tempDel()
}

main.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('task')){
    e.preventDefault()

    element = e.target
    console.log(e)
    element.classList.add('task-dragged')

    html.classList.add('grabbing')

    shiftX = Math.round(e.clientX - element.getBoundingClientRect().left) + 15;
    shiftY = Math.round(e.clientY - element.getBoundingClientRect().top) + 15;

    document.documentElement.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mousemove', onMouseMove)
  }
  else if (e.target.classList.contains('delete')) {
    deleteTask(e.target)
  }
  else if (e.target.classList.contains('add-task')) {
    addTask(e.target)
  }
})


