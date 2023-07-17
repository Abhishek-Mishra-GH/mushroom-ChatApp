const url = "https://mushroom-lgyq.onrender.com";
const test = 'http://localhost:3000';
let count = 0;

const main = document.getElementById('main');
const inputMsg = document.getElementById('inputMsg');
const navbar = document.getElementById('navbar');


showIncomingMsg("🕊️");
showLocalMsg("🕊️");
showIncomingMsg("🕊️");


let socket = io.connect(url);
socket.on('connect', console.log('connected'));
//socket.emit('test', "Hii")

function showIncomingMsg(msg) {
  let remoteMsg = document.createElement('div');
  let br = document.createElement('br');
  remoteMsg.classList.add("msgRemote");
  remoteMsg.innerText = msg;
 
  main.append(remoteMsg);
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
  count++
  showIncomingMsg(data.msg);
});

function sendmsg() {
  count++
  let localMsg = inputMsg.value;
  socket.emit('send-msg', {msg: localMsg});
  inputMsg.value = "";
  showLocalMsg(localMsg);
}