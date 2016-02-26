angular.module("app.factories", [])

	.factory("users", function($firebaseObject, $firebaseArray){
		factory = {}
		var ref = new Firebase("https://codeconnect.firebaseio.com/")


		ref.onAuth(function(authData){
			if(authData){
				console.log("UID: "+authData.password.email.replace(/@.*/, ''))
			}

			else{
				window.location = '/'
			}
		})

		var users = $firebaseArray(ref.child("my-users"))
		var sessions = $firebaseArray(ref.child("sessions"))
		var chats = ref.child("chats")

		 factory.get = function(){
		 	return users
		 }


		 factory.getSessions = function(){
		 	return sessions
		 }

		 factory.getFirePadRef = function(){
		 	return ref
		 }

		 factory.getChats = function(session_index){
		 	return $firebaseArray(ref.child("sessions").child(session_index).child('chats'))
		 }

		 factory.getSessionKeys = function(){
		 	return ref.child("session_keys")
		 }

		 factory.getCurrentKey = function(session_name){
		 	return ref.child("session_keys").child(session_name)
		 }




		 return factory
		 

	})