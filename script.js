const url = "https://mushroom-lgyq.onrender.com";
const test = 'http://localhost:3000';

let socket = io.connect(url);
socket.on('connect', console.log('connected'));
//socket.emit('test', "Hii")

const main = document.getElementById('main');

function showIncomingMsg(msg) {
  let remoteMsg = document.createElement('div');
  let br = document.createElement('br');
  remoteMsg.classList.add("msgRemote");
  remoteMsg.innerText = msg;
 
  main.append(remoteMsg);
  main.append(br);
  remoteMsg.focus()
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
 
}

socket.on('bc', (data) => {
  console.log(data);
  showIncomingMsg(data.msg);
});

function sendmsg() {
  let inputMsg = document.getElementById('inputMsg');
  let localMsg = inputMsg.value;
  socket.emit('send-msg', {msg: localMsg});
  inputMsg.value = "";
  showLocalMsg(localMsg);
}