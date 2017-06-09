const app = {
    init(selectors) {
        this.dinos = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addDinoFromForm.bind(this))

        this.load() 
    },

    addDino(dino) {
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstElementChild)
        this.dinos.unshift(dino)
        this.save()

        ++ this.max
    },

    addDinoFromForm(ev) {
        ev.preventDefault()
        const dino = {//this creates an object with a name property, and id property
            id: this.max + 1,
            name: ev.target.dinoName.value,
        }

        this.addDino(dino)
        ev.target.reset()
    },

    load() {
        const dinoJSON = localStorage.getItem('dinos')
        const dinoArray = JSON.parse(dinoJSON)
        if (dinoArray) {
            dinoArray.reverse().map(this.addDino.bind(this))
        }
    },

    save() {
        localStorage.setItem('dinos', JSON.stringify(this.dinos))
    },

    renderListItem (dino) {
        const item = document.createElement('li')
        
        //item.textContent = dino.name
        //item.setAttribute('id', `${item.textContent}`)

        const buttonDiv = document.createElement('div')
        buttonDiv.setAttribute('class', 'button-group')

        const up = document.createElement('a')
        up.setAttribute('class', 'secondary button')
        up.textContent = 'Up'

        const down = document.createElement('a')
        down.setAttribute('class', 'primary button')
        down.textContent = 'Down'

        const promote = document.createElement('a')
        promote.setAttribute('class', 'success button')
        promote.textContent = 'Promote'

        const deleteButton = document.createElement('a')
        deleteButton.setAttribute('class', 'alert button')
        deleteButton.textContent = 'Delete'

        buttonDiv.appendChild(up)
        buttonDiv.appendChild(down)
        buttonDiv.appendChild(promote)
        buttonDiv.appendChild(deleteButton)

        const span = document.createElement('span')
        span.setAttribute('contentediable', '')
        item.appendChild(span)
        span.addEventListener('mouseout', this.refreshID.bind(this))
        span.addEventListener('click', this.refreshID.bind(this))
        span.addEventListener('mouseover', this.refreshID.bind(this))
        
        span.textContent = dino.name
        item.setAttribute ('id', `${span.innerText}`)

        item.appendChild(buttonDiv)

        up.addEventListener('click', this.moveUp.bind(this))
        down.addEventListener('click', this.moveDown.bind(this))
        promote.addEventListener('click', this.addFavorite.bind(this))
        deleteButton.addEventListener('click', this.deleteItem.bind(this))

        return item
    },
      addFavorite(ev) {
        ev.preventDefault()
        const listHTML = ev.target.parentElement.parentElement

        if(listHTML.style.backgroundColor === 'lightblue') {
            listHTML.style.backgroundColor = 'whitesmoke'
        } else {
            listHTML.style.backgroundColor = 'lightblue'
        }
  },
  
  deleteItem(ev) {
      ev.preventDefault()
      const listHTML = ev.target.parentElement.parentElement
      
      for(let i = 0; i < this.dinos.length; i++) {
        if(`${this.dinos[i].name}` === `${listHTML.getAttribute('id')}`) {
             this.dinos.splice(i, 1);
             break
        }
      }
      this.save()
      listHTML.remove()
  },

  buttonGroup () {
    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'button-group')

    const up = document.createElement('a')
    up.setAttribute('class', 'secondary button')
    up.textContent = 'Up'

    const down = document.createElement('a')
    down.setAttribute('class', 'primary button')
    down.textContent = 'Down'

    const promote = document.createElement('a')
    promote.setAttribute('class', 'success button')
    promote.textContent = 'Promote'

    const deleteButton = document.createElement('a')
    deleteButton.setAttribute('class', 'alert button')
    deleteButton.textContent = 'Delete'

    buttonDiv.appendChild(up)
    buttonDiv.appendChild(down)
    buttonDiv.appendChild(promote)
    buttonDiv.appendChild(deleteButton)

    up.addEventListener('click', this.moveUp.bind(this))
    down.addEventListener('click', this.moveDown.bind(this))
    promote.addEventListener('click', this.addFavorite.bind(this))
    deleteButton.addEventListener('click', this.deleteItem.bind(this))

    return buttonDiv
  },

  moveUp(ev) {
    ev.preventDefault()
    const listHTML = ev.target.parentElement.parentElement
    const upper = listHTML.previousSibling
    
    listHTML.innerText = upper.getAttribute('id')
    upper.innerText = listHTML.getAttribute('id')
    const listHTMLColor = listHTML.style.backgroundColor
    const upperHTMLColor = upper.style.backgroundColor

    const next = upper.nextSibling

    listHTML.setAttribute('id', `${upper.innerText}`)
    upper.setAttribute('id', `${upper.innerText}`)
    next.setAttribute('id', `${next.innerText}`)

    const firstButtonGroup = this.buttonGroup()
    listHTML.appendChild(firstButtonGroup)

    const secondButtonGroup = this.buttonGroup()
    upper.appendChild(secondButtonGroup)

    if(listHTMLColor === 'lightblue' && upperHTMLColor === 'lightblue') {
        next.style.backgroundColor = 'lightblue'
        upper.style.backgroundColor = 'lightblue'
    } else if (listHTMLColor === 'lightblue') {
        upper.style.backgroundColor = 'lightblue'
        next.style.backgroundColor = 'magenta'
    } else if (upperHTMLColor === 'lightblue') {
        upper.style.backgroundColor = 'magenta'
        next.style.backgroundColor = 'lightblue'
    } else {
        upper.style.backgroundColor = 'magenta'
        next.style.backgroundColor = 'magenta'
    }
    const newNext = next.previousSibling
    for(let i = 0; i < this.dinos.length; i++) {
      if (this.dinos[i].name === newNext.getAttribute('id')) {
        this.dinos[i].name = `${listHTML.getAttribute('id')}`
        this.dinos[i-1].name = `${newNext.getAttribute('id')}`
      }
    }
    this.save()
},
    moveDown(ev) {
        ev.preventDefault()
        const listHTML = ev.target.parentElement.parentElement
        const lower = listHTML.nextSibling

        listHTML.innerText = lower.getAttribute('id')
        lower.innerText = listHTML.getAttribute('id')
        const listHTMLColor = listHTML.style.backgroundColor
        const lowerHTMLColor = lower.style.backgroundColor

        const upper = lower.previousSibling

        listHTML.setAttribute('id', `${lower.innerText}`)
        lower.setAttribute('id', `${upper.innerText}`)
        upper.setAttribute('id', `${upper.innerText}`)

        const firstButtonGroup = this.buttonGroup()
        listHTML.appendChild(firstButtonGroup)

        const secondButtonGroup = this.buttonGroup()
        lower.appendChild(secondButtonGroup)

    if(listHTMLColor === 'lightblue' && lowerHTMLColor === 'lightblue') {
        upper.style.backgroundColor = 'lightblue'
        lower.style.backgroundColor = 'lightblue'
    } else if (listHTMLColor === 'lightblue') {
        lower.style.backgroundColor = 'lightblue'
        upper.style.backgroundColor = 'magenta'
    } else if (lowerHTMLColor === 'lightblue') {
        lower.style.backgroundColor = 'magenta'
        upper.style.backgroundColor = 'lightblue'
    } else {
        lower.style.backgroundColor = 'magenta'
        upper.style.backgroundColor = 'magenta'
    }

    for(let i = 0; i < this.dinos.length; i++) {
      if (this.dinos[i].name === listHTML.getAttribute('id')) {
        this.dinos[i].name = `${lower.getAttribute('id')}`
        this.dinos[i-1].name = `${listHTML.getAttribute('id')}`
      }
    }
    this.save()

},

   refreshID(ev) {
       ev.preventDefault()
       const listHTML = ev.target.parentElement
       const lower = listHTML.childNodes[0]

       for(let i=0; i < this.dinos.length; i++) {
           if (this.dinos[i].name == listHTML.getAttribute('id')) {
            this.dinos[i].name = lower.innerText
           }
       }
       listHTML.setAttribute('id', `${lower.innerText}`)
       this.save()
   } 

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})