const articles = [...document.querySelectorAll("article")]

let canChange = true,
    wheelStress = 0,
    prevX,
    prevY

const changeArticle = (idx, direction) => {
  
  if(direction === 1){
    idx < 4 && (articles[idx].style.setProperty('--translation', '125vmax'),
                articles[idx].style.setProperty('--rotation', '30deg'))
  }
  else{
    idx > 0 && (articles[idx - 1].style.setProperty('--translation', '0'),
                articles[idx - 1].style.setProperty('--rotation', '0'))
  }
    
  setTimeout(() => canChange = true, 250)
  
  canChange = false
}

articles.forEach( (article, idx) => {
  
  //animation with wheel
  article.addEventListener('wheel', e => {
    if(canChange){
      const direction = Math.sign(e.deltaY)
      wheelStress += direction
      
      Math.abs(wheelStress) > 5 && 
      (changeArticle(idx, direction), wheelStress = 0)
    }
  })
                           
  //animation with touches
  article.addEventListener('touchstart', e => {
    e.preventDefault()
    
    prevX = e.touches[0].clientX
    prevY = e.touches[0].clientY
  })
  
  article.addEventListener('touchmove', e => {
    e.preventDefault()
    
    if(canChange){
      let direction
      let newX = e.touches[0].clientX
      let newY = e.touches[0].clientY
      let deltaX = Math.abs(newX - prevX)
      let deltaY = Math.abs(newY - prevY)
      if(deltaX > 10 || deltaY > 10){
        deltaX > deltaY ? ( direction = Math.sign(newX - prevX),
        prevX = newX)
        : (direction = Math.sign(newY - prevY),
        prevY = newY)
        
        changeArticle(idx, direction)
      }
    }
  })
})