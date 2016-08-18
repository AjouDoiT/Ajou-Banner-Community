# JWT Authentication Progress

- Firebase Authentication basically uses JWT.
- SHOULD NOT SEND UID IN PLAINTEXT OVER HTTP PROTOCOL
- Changes made
	 * package.json : Adding Firebase SDK dependencies
	 * custom_sample.html : Sample view to check JWT Token Authentication
	 * routes/index.js : Create a routing rule to get token(Originally wanted to get through POST method)
- Problem So far
	* firebase.auth().getToken method does not work
	* Sending that token is not working (Maybe problem of routing on Server-side.)

- Expected Solution
	* Create seperate page for sending JWT Token
	* 몰라 ㅆㅂ 존나 복잡하네
