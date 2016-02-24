angular.module('app', ['ui.router', 'app.controllers'])

	.config(function($stateProvider, $urlRouterProvider){
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
						templateUrl: '/side'
					},

					'headerView': {
						templateUrl: '/head'
					},

					'mainContentView': {
						templateUrl: '/content'
					}
					


				}
			});

		$urlRouterProvider.otherwise('/app/home'); 
	})