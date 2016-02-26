angular.module("app.controllers", [])

  .controller('headerController', function($scope, users, $rootScope){
    $scope.users = users.get()
     angular.forEach($scope.users, function(user){
        if(user.uid==$rootScope.uid){
          $scope.currentMember = user.name
        }
      })

  })

	 .controller('SidebarController', function($scope, $rootScope, users){
    $scope.users = users.get()

    setTimeout(function(){
            $('#online-mem').removeClass('active')
            $('#session').addClass('active')
        }, 600)

  })

   .controller('MainContentController', function($scope, users, $rootScope, $cookies){

      $scope.users = users.get()
      firepadRef = users.getFirePadRef()

      var sessions = users.getSessions();
      $scope.data = {};
      $scope.data.members = []
      $scope.sessions = users.getSessions();
      
     

      var del = true

      angular.forEach($scope.users, function(user){
        if(user.uid==$rootScope.uid){
          $rootScope.currentMember = user.name
          $scope.currentMember = user.name
        }
      })

      angular.forEach(sessions, function(item){
        
        angular.forEach(item.members, function(member){

          if(member==$rootScope.currentMember){
              del = false
            
          }
        })

        if(!del){
            $scope.sessions.push(item)
            del = true
        }

      })

      var session_keys = users.getSessionKeys();

      session_keys.child("hel").once("value", function(snapshot){
        console.log("Session Key is: "+snapshot.val())
      })

      $scope.saveSessionChanges = function(){

          $scope.sessions.$add({name: $scope.data.session_name, language: $scope.data.language, members: $scope.data.members, chats: [{timestamp: 0, message: '', member: ''}]})
          .then(function(ref){
              session = {}
              session[$scope.data.session_name] = ref.key()
              session_keys.update(session)
          })
      }

      $scope.openSessionModal = function(){
          $("#myModal").modal("show")
      }
     
     

  })

   .controller('CollabViewController', function($scope, users, $rootScope){
        ace.require("ace/ext/language_tools");
        var editor = ace.edit("editor");
        editor.session.setMode("ace/mode/html");
        editor.setTheme("ace/theme/tomorrow");
        // enable autocompletion and snippets
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false
        });

        

        var sendChats = $('#sendChats');
        var chatForm = $('#chatForm');
        var chatMessage = $('#chatMessage')

        var session_key = users.getCurrentKey("test2");
        

        session_key.once("value", function(snapshot){
            $scope.currentKey = snapshot.val()
            $scope.chats = users.getChats($scope.currentKey)
           
        })


        chatForm.on("submit", function(e){
          e.preventDefault();
          var chat = chatMessage.val()
          chatMessage.val('');

          var d = new Date();
          $scope.chats.$add({timestamp: d.getTime(), message: chat, member: 'people'})

        })

        var firepadRef = users.getFirePadRef();
        var sessions = firepadRef.child("sessions");
        var firepad = Firepad.fromACE(firepadRef, editor);
        firepad.setUserId("session1234")



   })




           

