/*
	Ajou Banner Community OAuth Script
	(Development Version)
	Powered by Firebase Authentication.
	Modification or Cracking this script
	could be violation of End-user Agreement.
	Written by lkaybob
*/

// Initializing Firebase
var config = {
	apiKey: "AIzaSyACXoY2tVZCiIq2b8Kx0rKcC3pyWB5CPFI",
	authDomain: "ajoubannercom.firebaseapp.com",
	databaseURL: "https://ajoubannercom.firebaseio.com",
	storageBucket: "ajoubannercom.appspot.com"
	};
firebase.initializeApp(config);

// Individual service for firebase authentication
// Should be included
app.service('$auth', function($route) {
	// 최소한의 정보만 담을 객체
	// firebase 객체를 사용하지 않도록 하기 위함임!
	var currentUser;

	// Initailzation Function
	// Called in $scope controller
	this.init = function () {
		firebase.auth().getRedirectResult().then(function (result) {
			if (result.credential) {
				// Access 토큰은 필요없을거 같은데...?
			}
			else {

			}
			var user = result.user;
		}).catch(function (error) { //로그인 실패 시나리오
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;

			// 여기서 서비스하는 errorcode들은
			// 가능성이 적은 문제들로 보통 비정상적인 접근이
			// 일어날때만 날 것 같다.
			if (errorCode === 'auth/account-exists-with-different-credential') {
				alert('이미 가입하셨어여');
			}
			// 그 이외 오류들
			// 정지먹은 사용자들도 여기서 예외처리 넣어주면 될 것 같음
			// Update : Firebase Auth는 API적으로 사용정지 설정을 할 수 없어
			// Firebase DB를 활용하여 사용가능성을 확인해야한다.
			else {
				// 비정상적인 접근에 대한 로직을 따로 짤 수 있을 것 같음.
				alert("비정상적인 접근입니다.\n다시 로그인해주세요.");
				console.error(error);
			}
		});
	};

	this.setScopeOnAuthStateChange = function ($scope) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				alert("b");
				$scope.state = user.displayName;
				$scope.showModal = false;
				// currentUser 객체는 global하게 접근 가능!
				$('#modal').modal('hide');

				currentUser = {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL
				}
				//display user infomation
				$scope.name = currentUser.displayName + '님';
				$scope.userPhoto = currentUser.photoURL;
			}
			else {
				//$scope.showModal = true;
				$scope.state = "";
				$route.reload();
				// 로그아웃이 됐을 경우의 로직
				// index.html(메인페이지 화면)으로 redirect하게
				// 하면 될 듯
			}
		});
	}

	// 로그인 여부 확인
	// 현재는 T/F만 return하는 것으로
	this.checkSignedIn = function () {
		if (firebase.auth().currentUser)
			return true;
		else
			return false;
	};
});