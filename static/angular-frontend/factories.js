angular.module("app.factories", [])

	.factory("fmSvc", function($q){
		var factory = {};
		factory.get = function(url){
			var promise = $q.defer();
			$.get(url, function(data){
					var items = [];
	          		angular.forEach(data.items, function(item){
	          			
	          			if(item.type=="folder"){
	          				items.push({name: item.name, type: item.type, path: item.path, image: "img/folder.png"});
	          			}
	          			else if(item.type=="file"){
	          				items.push({name: item.name, type: item.type, path: item.path, image: "img/video-file.png"});
	          			}
	          		})
	          		promise.resolve(items);

	          	})
			return promise.promise;

		}
		return factory;
		
	})