angular.module('app', ['ui.router', 'app.controllers', 'app.factories', 'firebase', 'ngCookies'])

	.config(function($stateProvider, $urlRouterProvider, $interpolateProvider){
		$interpolateProvider.startSymbol('##');
    	$interpolateProvider.endSymbol('##');
		$stateProvider
			
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: '/main'
			})

			.state('app.home', {
				url: '/home',
				views: {

					'sideBarView': {
						templateUrl: '/side',
						controller: 'SidebarController'
					},

					'headerView': {
						templateUrl: '/head'
					},

					'mainContentView': {
						templateUrl: '/content',
						controller: 'MainContentController'
					}
					


				}
			})


			.state('app.collab', {
				url: '/collab',
				views: {

					'sideBarView': {
						templateUrl: '/side',
						controller: 'SidebarController'
					},

					'headerView': {
						templateUrl: '/head'
					},

					'mainContentView': {
						templateUrl: '/collabview',
						controller: 'CollabViewController'
					}
					


				}
			});



		$urlRouterProvider.otherwise('/app/collab'); 
	})