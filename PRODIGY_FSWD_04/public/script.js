const socket = io('http://localhost:3500');

const msgInput = document.querySelector('#message');
const nameInput = document.querySelector('#name');
const chatRoom = document.querySelector('#room');
const activity = document.querySelector('.activity');
const usersList = document.querySelector('.user-list');
const roomList = document.querySelector('.room-list');
const chatDisplay = document.querySelector('.chat-display');

function sendMessage(e) {
    e.preventDefault();
    if (nameInput.value && msgInput.value && chatRoom.value) {
        socket.emit('message', {
            name: nameInput.value,
            text: msgInput.value,
            time: new Date().toLocaleTimeString() // Add timestamp
        });
        msgInput.value = "";
    }
    msgInput.focus();
}

function enterRoom(e) {
    e.preventDefault();
    if (nameInput.value && chatRoom.value) {
        socket.emit('enterRoom', {
            name: nameInput.value,
            room: chatRoom.value
        });
        // Show user and room lists after entering the room
        usersList.style.display = 'block';
        roomList.style.display = 'block';
        activity.style.display = 'block';
    }
}

document.querySelector('.form-msg').addEventListener('submit', sendMessage);
document.querySelector('.form-join').addEventListener('submit', enterRoom);

msgInput.addEventListener('keypress', () => {
    socket.emit('activity', nameInput.value);
});

// Listen for messages 
socket.on("message", (data) => {
    activity.textContent = "";
    const { name, text, time } = data;
    const li = document.createElement('li');
    li.className = 'post';
    li.classList.add(name === nameInput.value ? 'post--left' : 'post--right');

    li.innerHTML = `
        <div class="post__header ${name === nameInput.value ? 'post__header--user' : 'post__header--reply'}">
            <span class="post__header--name">${name}</span> 
            <span class="post__header--time">${time}</span> 
        </div>
        <div class="post__text">${text}</div>`;

    chatDisplay.appendChild(li);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to the latest message
});

let activityTimer;
socket.on("activity", (name) => {
    activity.textContent = `${name} is typing...`;
    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
        activity.textContent = "";
    }, 3000);
});

socket.on('userList', ({ users }) => {
    showUsers(users);
});

socket.on('roomList', ({ rooms }) => {
    showRooms(rooms);
});

function showUsers(users) {
    usersList.textContent = '';
    if (users) {
        usersList.innerHTML = `<em>Users in ${chatRoom.value}:</em>`;
        users.forEach((user, i) => {
            usersList.textContent += ` ${user.name}`;
            if (users.length > 1 && i !== users.length - 1) {
                usersList.textContent += ",";
            }
        });
        // Show the user list if there are users
        usersList.style.display = users.length > 0 ? 'block' : 'none ';
    }
}

function showRooms(rooms) {
    roomList.textContent = '';
    if (rooms) {
        roomList.innerHTML = `<em>Available Rooms:</em>`;
        rooms.forEach((room, i) => {
            roomList.textContent += ` ${room}`;
            if (rooms.length > 1 && i !== rooms.length - 1) {
                roomList.textContent += ",";
            }
        });
        // Show the room list if there are rooms
        roomList.style.display = rooms.length > 0 ? 'block' : 'none';
    }
}