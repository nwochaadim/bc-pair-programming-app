angular.module("app.controllers", [])

	.controller("AppController", function($scope, fmSvc){
		$scope.items = [];
		$('.panel.panel-primary').click(function(){
			$('.panel.panel-primary').removeClass("glow");
			$(this).addClass("glow");
		})

		 $scope.currentStep = 1;
          

      
          $('.slider.range-min, .sl1, .sl2').slider({
				range: "min",
				min:4,
				max: 25,
					slide: function( event, ui ) {
			        //$('.slider.range-min > a.ui-slider-handle').html("<div class='range-tooltip'>$ " + $(".slider.range-min").slider("value") + "</div>")
			        $(this).find('.num-max').html($(this).slider("value") + "px")
			        if($(this).slider("value") > 1){
			        	$(this).addClass('active');
			        } else {
			        	$(this).removeClass('active');
			        }
			      },
			    value:10
			});

          $scope.loadCharacterScene = function(){
            $scope.items = [];
          	fmSvc.get("phpscripts/scan.php?lookup=../files/Character-Scenes").then(function(data){
                $scope.items = data;
          	})
          }

          $scope.loadTypoScene = function(){
          	fmSvc.get("phpscripts/scan.php?lookup=../files/Typography-Scenes").then(function(data){
          		$scope.items = data;
          	})
          }

          $scope.loadUserScene = function(){
          	fmSvc.get("phpscripts/scan.php?lookup=../files/User-Scenes").then(function(data){
          		$scope.items = data;
          	})
          }

          $scope.navigateForward = function(url){
          	
          	fmSvc.get("phpscripts/scan.php?lookup="+url).then(function(data){

          		$scope.items = data;
          	})
          }

          $scope.closeModal = function(){
          
          	$("#myModal").modal('hide');

          	
          }


          $('[data-toggle="tooltip"]').tooltip(); 
          $("a[rel^='prettyPhoto']").prettyPhoto();

          //Fix Modal Scroll Issues

        $(document).on('hidden.bs.modal', '.modal', function () {
              $('.modal:visible').length && $(document.body).addClass('modal-open');

          });

        //Fix Modal BackDrop Issue

        $(document).on('show.bs.modal', '.modal', function () {
               

              var zIndex = 1040 + (10 * $('.modal:visible').length);
              $(this).css('z-index', zIndex);
              setTimeout(function() {
                  $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
              }, 0);
          });

          $scope.implementPop = function(path, $event){

            path = path.substring(3, path.length);
            angular.element($event.currentTarget).popover({
                    content: ' <div>'+
                                        '<a href="" >Add</a><br/>'+
                                        '<a href="'+path+'" rel="prettyPhoto">Preview</a>'+
                                        
                              '</div>',
                    placement: 'bottom',
                    trigger: 'focus',
                    viewport: '#characterContents'

                  }).popover('show').on('shown.bs.popover', function(){
                         $("a[rel^='prettyPhoto']").prettyPhoto();

                  });
          }

         
          

});

 
           

