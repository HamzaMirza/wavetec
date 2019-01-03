$(document).ready(function () {

	$('form').bind('keypress', function (e) { /* binding form with the enter key */
		if (e.keyCode == 13) {
			e.preventDefault();
			callsRespectiveFunctionOnBinding();
		}
	});
	$('document').bind('keypress', function (e) { /* binding dom with the enter key */
		if (e.keyCode == 13) {
			callsRespectiveFunctionOnBinding();
		}
	});

	user = JSON.parse(localStorage.getItem('user')); /* checking if user is already signed in */
	if (user != null) {
		if (user.isLogin == "1" && window.location.href !='http://localhost:3000/test/') {
			window.location.href = "./chat"; /* redirecting the user to the chat window */
		}
	}
});

//Binding Enter Key with the pages
function callsRespectiveFunctionOnBinding() {
	let pathname = window.location.pathname;
	let filenameArr = pathname.split("/");
	let filename = filenameArr[filenameArr.length - 1];
	if (filename == "/")
		reqLogin();
	else if (filename == "chat")
		sendMsg();
}
//Check Form Fields
function checkForm() {
	let isSet = false;
	var createAllErrors = function () {
		var form = $(this);
		var showAllErrorMessages = function () {
			// Find all invalid fields within the form.
			var invalidFields = form.find(":invalid").each(function (index, node) {
				$('#submitButton').click();
			});
			if (invalidFields.length <= 0)
				isSet = true;
		};
		showAllErrorMessages();
	};
	$('form').each(createAllErrors);
	return isSet;
}

function updateUserSessionUponSigningIn(username,password)
{
	localStorage.setItem("user", JSON.stringify({
				uid: username,
				pass: password,
				isLogin: "1"
			}));
}
function reqLogin() /* Authorizing the user in to the app */ {
	if (checkForm()) {
	
		let username = $('input[name=username]').val();
		let password = $('input[name=password]').val();
		if (username == password && password == 'admin') {
			updateUserSessionUponSigningIn(username,password);
			window.location.href = "./chat";
		} else
			showError("Password and User name did not match");
	}

}

function showError(msg) /* Show Error Message */ {

	$("#errorMsg").html(msg);
	$("#dangerAlert").removeClass("hide");
}