export function toggleHidden (type) {
    let active = document.querySelector('.active')
    if(active !== null) {
      active.classList.add('hidden')
      active.classList.remove('active')
    }
    let el = document.getElementsByClassName(`${type}`)[0]
    el.classList.remove('hidden')
    el.classList.add('active')
  }
