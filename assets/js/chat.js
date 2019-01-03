let Chats = function (senderid, recieverid, msg, date) { /* chats class */
	this.sender = senderid;
	this.reciever = recieverid;
	this.msg = msg;
	this.date = date;
}

var ChatPerson = function (id, name, url, chats) { /* users class */
	this.id = id;
	this.name = name;
	this.url = url;
	this.chats = chats;
}


let chatPersonLists = new Array(); /* declaring array of users */
initChatPersons(); /*initializing array of users */
let dynamicRecieverId = 1; /* reciever id of the currently active chat */

function initChatPersons() /* initializing Admin and dummy users */ {
	chatPersonLists.push(new ChatPerson(0, 'admin', 'assets/images/user.jpg', new Array())); /* admin */
	for (let i = 1; i < 10; i++) {
		chatPersonLists.push(new ChatPerson(i, 'user' + i, 'assets/images/user.png', new Array())); /* dummy users */
	}
}

function clearMsgBox() { /* empties the chat window */
	$("#msgsHolder").empty();
}

function updateDynamicRecieverId(id) /* updating the dynamic user id */ {
	dynamicRecieverId = id;
	clearMsgBox();
	uploadMsgs(dynamicRecieverId, 1);

}

function uploadMsgs(userid, flag) { /* Displays the messages in the message window */
	clearMsgBox();
	let msgs = getMsgs(userid);
	if (msgs != 0) {
		for (let i = msgs.length - 1; i >= 0; i--)
			if (msgs[i].sender == 0)
				sendSenderMsgs(msgs[i].msg, chatPersonLists[msgs[i].sender].url, msgs[i].date, flag);
			else
				sendRecieverMsgs(msgs[i].msg, chatPersonLists[msgs[i].sender].url, msgs[i].date, flag);
	}
}

function getMsgs(userid) { /* fetches the messages */
	if (chatPersonLists[0].chats.length == 0) /* base case no msgs recieved or send */
		return 0;

	let chats = new Array();
	for (let i = 0; i < chatPersonLists[0].chats.length; i++) /* searching for messages send or recieve between the two users */ {
		if (chatPersonLists[0].chats[i].sender == userid || chatPersonLists[0].chats[i].reciever == userid) {
			chats.push(new Chats(chatPersonLists[0].chats[i].sender, chatPersonLists[0].chats[i].reciever, chatPersonLists[0].chats[i].msg, chatPersonLists[0].chats[i].date));
		}
	}
	if (chats.length == 0) /* no msgs recieved or send */
		return 0;
	else
		return chats;
}

function sendSenderMsgs(text, url, date, flag) { /* Calls to append sender message view */
	if (chatPersonLists[0].chats == null) chatPersonLists[0].chats = new Array();
	createSenderView(text, url, date, flag, dynamicRecieverId); /* admin message output */
}

function sendRecieverMsgs(text, url, date, flag) { /* Calls to append reciever message view */
	if (chatPersonLists[dynamicRecieverId].chats == null) chatPersonLists[dynamicRecieverId].chats = new Array();
	createRecieverView(text, url, date, flag, 0); /* user message output */
}

function createRecieverView(msg, url, date, flag = 0, recieverid) /* creating user message output on the chat window. */ {
	var link = document.createElement('li');
	link.className = "mar-btm";
	var div = document.createElement('div');
	div.className = "media-left";
	var img = document.createElement('img');
	img.src = url;
	img.className = "img-responsive img-circle";
	img.alt = "user image";
	img.style.maxWidth = "112px";
	div.appendChild(img);
	var div1 = document.createElement('div');
	div1.className = "media-body pad-hor mob_chat_left";
	var div2 = document.createElement('div');
	div2.className = "speech";
	var p = document.createElement('p');
	p.innerHTML = msg;
	div2.appendChild(p);
	var p1 = document.createElement('p');
	p1.className = "speech-time";
	var i = document.createElement('i');
	i.innerHTML = "<i class=\"fa fa-calendar-check-o\" aria-hidden=\"true\" style=\"margin-right:5px;\"></i>";
	p1.appendChild(i);
	var i1 = document.createElement('i');
	i1.innerHTML = date;
	p1.appendChild(i1);
	div2.appendChild(p1);
	div1.appendChild(div2);
	link.appendChild(div);
	link.appendChild(div1);
	if (flag == 0) {
		document.getElementById('msgsHolder').appendChild(link);
		chatPersonLists[recieverid].chats.push(new Chats(dynamicRecieverId, recieverid, msg, date));
	} else if (flag == 1)
		$("#msgsHolder").prepend(link);

}

function createSenderView(msg, url, date, flag = 0, recieverid) /* creating admin message output on the chat window. */ {
	var link = document.createElement('li');
	link.className = "mar-btm";
	var div = document.createElement('div');
	div.className = "media-right";
	var img = document.createElement('img');
	img.src = url;
	img.className = "img-responsive img-circle";
	img.alt = "user image";
	img.style.maxWidth = "112px";
	div.appendChild(img);

	var div1 = document.createElement('div');
	div1.className = "media-body pad-hor speech-right mob_chat_right";
	var div2 = document.createElement('div');
	div2.className = "speech";
	var p = document.createElement('p');
	p.innerHTML = msg;
	div2.appendChild(p);
	var p1 = document.createElement('p');
	p1.className = "speech-time";
	var i = document.createElement('i');
	i.innerHTML = "<i class=\"fa fa-calendar-check-o\" aria-hidden=\"true\" style=\"margin-right:5px;\"></i>";
	p1.appendChild(i);
	var i1 = document.createElement('i');
	i1.innerHTML = date;
	p1.appendChild(i1);
	div2.appendChild(p1);
	div1.appendChild(div2);
	link.appendChild(div);
	link.appendChild(div1);
	document.getElementById('msgsHolder').appendChild(link);
	if (flag == 0) {
		document.getElementById('msgsHolder').appendChild(link);
		chatPersonLists[0].chats.push(new Chats(0, recieverid, msg, date));
	} else if (flag == 1)
		$("#msgsHolder").prepend(link);
}

function sendMsgs() { /* sending message */

	var text = document.getElementById('mess').value;
	if (text == 'undefined' || text == null || text == '') return null;
	sendSenderMsgs(text, chatPersonLists[0].url, getDate(), 0);
	//sendRecieverMsgs(text,chatPersonLists[dynamicRecieverId].url,getDate(),0); /* user message output */
	updateChatLog(chatPersonLists[0].chats);
	scrollToBottom();
	clear();
}

function getDate() /* get current date */ {
	let date = new Date();
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function updateChatLog(chats) /* updating the local storage */ {
	localStorage.setItem("chats", JSON.stringify(chats));
}

function scrollToBottom() { /* scrolling the chat window to the latest message */
	$(".panel-body").stop().animate({
		scrollTop: $(".panel-body")[0].scrollHeight
	}, 1000);
}

function clear() { /* clearing the text box */
	document.getElementById('mess').value = '';
}

function redirectToLogin(chats) /* redirecting to login if user has signed out or has deleted the local storage data. */ {
	if (chats != null)
		localStorage.removeItem("chats");
	if(window.location.href !='http://localhost:3000/test/') /* for testing purpose this if is introduced to avoid redirection overflow */
	location.href = "./";
}

function logout() { /* logging off the user. */
	user = JSON.parse(localStorage.getItem('user'));
	localStorage.setItem("user", JSON.stringify({
		uid: user.uid,
		pass: user.pass,
		isLogin: "0"
	}));

	redirectToLogin(chatPersonLists[0].chats);
}

$(document).ready(function () { /*checking upon dom initialization if user has either signed out or has deleted the local storage data. */
	chats = JSON.parse(localStorage.getItem('chats'));
	user = JSON.parse(localStorage.getItem('user'));
	if (user != null) {
		if (user.isLogin == "0"  && window.location.href !='http://localhost:3000/test/') {
			redirectToLogin(chats);
		} else {
			if (chatPersonLists[0].chats == null) chatPersonLists[0].chats = new Array();
			if (chats != null) {
				for (let i = 0; i < chats.length; i++) {
					chatPersonLists[0].chats.push(new Chats(chats[i].sender, chats[i].reciever, chats[i].msg, chats[i].date));
				}
				uploadMsgs(1, 1);
			}
		}
	} else
		redirectToLogin(chats);
});