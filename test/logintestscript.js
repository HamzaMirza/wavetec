
const userCredentials = {
  username: 'admin', 
  password: 'admin'
}

describe('Chat Data ,Logging off and signing in', function () {
	
	it('Chat Logs should be updated upon every message insertion', function () {
		updateUserSessionUponSigningIn(userCredentials.username,userCredentials.password)
		var chats=[];
		chats.push(new Chats(0, 1, "test data 1", getDate()));
		chats.push(new Chats(0, 2, "test data 1", getDate()));
		chats.push(new Chats(0, 3, "test data 1", getDate()));
		updateChatLog(chats);
		chats = JSON.parse(localStorage.getItem('chats'));
		expect(chats.length).to.equal(3);

	});
		
	it('Chat Logs should be removed upon logging out successfully', function () {
		updateUserSessionUponSigningIn(userCredentials.username,userCredentials.password);
		var chats=[];
		logout();
		chats = JSON.parse(localStorage.getItem('chats'));
		expect(chats).to.equal(null);

	});
	
	it('User session should be updated successfully upon logging in to the application', function () {
		let previous_state = JSON.parse(localStorage.getItem('user'))['isLogin'];
		updateUserSessionUponSigningIn(userCredentials.username,userCredentials.password);
		let current_state = JSON.parse(localStorage.getItem('user'))['isLogin'];
		expect(previous_state).to.not.equal(current_state);
		logout(); // calling logout to clear sessions since this is the last test
	});
});