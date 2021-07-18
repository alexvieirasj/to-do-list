const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addToDo = (inputValue, event) => {
    if(inputValue.length){
        todosContainer.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="form-check">
                <input class="form-check-input checkbox-selected" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckDefault">
                    ${inputValue}
                </label>
            </div>
            <i class="far fa-trash-alt delete"></i>
       </li>
       `
       event.target.reset()
    }
}

const deleteToDo = clickedElement => {
    if(Array.from(clickedElement.classList).includes('delete')){
        clickedElement.parentNode.remove()
    }
}

const checkedToDo = clickedElement => {
    if(Array.from(clickedElement.classList).includes('checkbox-selected')){
        Array.from(clickedElement.parentNode.children)
            .filter(todo => todo.textContent)
            .forEach(todo => {
                todo.classList.toggle('task-done')
            })
   }
}

const showSearchResults = (inputValue, class1, class2, match) => {
    Array.from(todosContainer.children)
        .filter(todo => {
            if(!match){
                return todo => !todo.textContent.toLowerCase().includes(inputValue)
            }
            return todo.textContent.toLowerCase().includes(inputValue)                
        })
        .forEach(todo => {
            todo.classList.remove(class1)
            todo.classList.add(class2)
        })
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.add.value.trim()
    addToDo(inputValue, event)    
})

todosContainer.addEventListener('click', event => {
   const clickedElement = event.target
   
   deleteToDo(clickedElement)
   checkedToDo(clickedElement)
})

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()

    showSearchResults(inputValue, 'd-flex', 'hidden', false)
    showSearchResults(inputValue, 'hidden', 'd-flex', true)
})