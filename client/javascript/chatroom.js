const nameInput = document.getElementById("name-input")
const form = document.getElementById("chat-form")

// var socket = io.connect("https://onlinewebsite.herokuapp.com");
var socket = io.connect("http://127.0.0.1:3000");

socket.on('connect', () => {
    // displayName('You connected with id: ' + socket.id)
})

form.addEventListener("submit", e => {
    e.preventDefault()

    const name = nameInput.value

    if(name === "") return
    //displayName(name)
    
    socket.emit('add-name', name)
    
    nameInput.value = ""
})

socket.on('receive-name', (name, data) => {
    displayName(name, data)
})

socket.on('update-name', (name, data) => {
    const div = document.getElementById(name)
    div.textContent = (name + "'s spirit animal is a " + data)
})

function displayName(name, data) {
    const div = document.createElement("div")
    div.classList.add('chatCell');
    div.textContent = (name + "'s spirit animal is a " + data)
    div.setAttribute('id',name);
    document.getElementById("chat-text").append(div)
}