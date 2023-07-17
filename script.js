const url = "https://mushroom-lgyq.onrender.com";
const test = 'http://localhost:3000';

const colors = ["orange"];

const main = document.getElementById('main');
const inputMsg = document.getElementById('inputMsg');
const navbar = document.getElementById('navbar');

showIncomingMsg("🕊️", "");
showLocalMsg("🕊️", "");
showIncomingMsg("🕊️", "");

let user = prompt("Enter your name: ");


let socket = io.connect(url);
socket.on('connect', () => {
  socket.emit('new-user', {name: user});
});

socket.on('new-user', (data) => {
  alert(`${data.name} is connected!`);
})
//socket.emit('test', "Hii")

function showIncomingMsg(msg, name) {
  let nameSpan = document.createElement('span');
  nameSpan.innerText = name + ": ";
  nameSpan.style.color = colors[0];
  if(name == "") nameSpan.innerText = "";
  
  let remoteMsg = document.createElement('div');
  let br = document.createElement('br');
  remoteMsg.classList.add("msgRemote");
 
  main.append(remoteMsg);
  
  remoteMsg.append(nameSpan);
  remoteMsg.append(msg);
  
  main.append(br);
  remoteMsg.scrollIntoView();
}

function showLocalMsg(msg) {
  // local msg must be wrapped by a div
  // that contais 'wrap' as one of it's class
 // inside wrap the div should have class
 // 'msgLcal' 
 // and then it should be appended to main 
 // element with a <br> tag followed by the wrap 
 // clas

 let wrap = document.createElement('div');
 wrap.classList.add('wrap')
 let localMsg = document.createElement('div');
 localMsg.classList.add('msgLocal');
 localMsg.innerText = msg;
 
 let br = document.createElement('br');
 main.append(wrap);
 wrap.append(localMsg);
 main.append(br);
 localMsg.scrollIntoView();
 inputMsg.focus();
}

socket.on('bc', (data) => {
  console.log(data);
  showIncomingMsg(data.msg, data.name);
});

function sendmsg() {
  let localMsg = inputMsg.value;
  if(localMsg == "") return;
  socket.emit('send-msg', {msg: localMsg, name: user});
  inputMsg.value = "";
  showLocalMsg(localMsg);
}