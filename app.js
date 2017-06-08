const app = {
    init(selectors) {
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addDino.bind(this)) 
    },

    addDino(ev) {
        ev.preventDefault()
        //const dinoName = ev.target.dinoName.value
        const dino = {//this creates an object with a name property, and id property
            id: this.max + 1,
            name: ev.target.dinoName.value,
        }
        //console.log(dino.name, dino.id)
        
        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)
        
        ++ this.max

    },

    renderListItem (dino) {
        const item = document.createElement('li')
        item.textContent = dino.name
        return item
    }
}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})