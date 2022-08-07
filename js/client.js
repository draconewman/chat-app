const socket = io('http://localhost:4000')

// get DOM elements in JS variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// const imgInput = document.getElementById('imagefile')

// audio variable
var audio = new Audio('Spirit.mp3')

// a fucntion that appends event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position) 
    messageContainer.append(messageElement)
    //messageContainer.append('<img src=" ' + base64Image + ' "/>')
    if(position=='left'){
        audio.play()
    }
}

// get the new user's name and let the server know
const myname = prompt("Enter your name to join the chat")
console.log(myname)
socket.emit('new-user-joined', myname)

// if any new user joins, append the info to the container
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left')
})

// receive message from server
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('imgreceive', data => {
  append(`${data.name}: ${data}`, 'left')
})

// if any user leaves, append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})

// if the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value
    append(`Me: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = '' //after sending text-area gets cleared
})

// Receiving and displaying the image on the frontend
socket.on('user image', leftimage);
function leftimage (from, base64Image) {
    console.log(from)
     $('.container').append($('<div class="limagediv">').append($('<b>').text(from), '<img src="' + base64Image + '" width="400" height="200"/>'));
  }
  function rightimage (from, base64Image) {
    console.log(from)
     $('.container').append($('<div class="rimagediv">').append($('<b>').text(from), '<img src="' + base64Image + '" width="400" height="200"/>'));
  }

// Bind the change event for the file input
$('#imagefile').bind('change', function(e){
  var data = e.originalEvent.target.files[0]
  var reader = new FileReader()
  reader.onload = function(evt){
    rightimage('Me', evt.target.result)
    socket.emit('user image', evt.target.result)
  }
  reader.readAsDataURL(data)    
})




  


