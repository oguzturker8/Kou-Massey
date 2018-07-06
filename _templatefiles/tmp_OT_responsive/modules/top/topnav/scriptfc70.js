

$j(function () {	
	// Mobile menu toggle
	$j('#ddNavSmall').click(function () {
		$j('#mainNav').css("width", $j('#mainNav').width() +"px");
		$j(".searchSocialInner").slideUp(200);
		$j('#mainNav').toggle('slide', {direction: 'right'}, 200);
	});
    // Resize clear the width attribute (which is used for smooth nav opening
	$j(window).resize(function(){
		$j('#mainNav').css("width", "");		
	});
	
	// Navigation 
    $j('#mainNav > ul > li > a').click(function (e) {        
    	var target = $j(this).attr('href').replace("#", ".");       
        show = true;
    	
    	if($j(this).parent().hasClass("selected")){
    		$j(this).parent().removeClass("selected");
    		showNav = false;
    	}else{
	    	$j(this).parent().siblings().removeClass("selected");
		    $j(this).parent().addClass("selected");
		    showNav = true;
    	}
    	$j('.extNav').not(target).slideUp(200);
    	
		if(!$j(this).siblings(target).length){
			/*mobile functionality*/
			//add child for mobile view 	
			$j(target).clone().appendTo($j(this).parent());
			$j(this).siblings(".extNav").find(".col").css("height", "");
			$j(this).siblings(".extNav").hide();		}
		
    		/*non mobile functionality to*/    		
	    	$j(target).slideToggle(200, function(){
	    		equaliseExtNav();
	    	});
	    	
	    	if(showNav){
	    		$j(target).show();
	    		$j(".extNav").not(target).hide();
	    	}
	    	else{
	    		$j(target).hide();	    	
	    	}
	    
        e.preventDefault();
    });
    
    //when the browser size changes the heights of the extnav  cols need to be reset 
    $j(window).resize(function(){		
    	equaliseExtNav();
    });
    
    

    $j('#languageButton').click(function () {
        var parent = $j(this).next('ul');

        parent.toggle();

        $j(parent).find('li a').click(function () {
            parent.hide();
        });
    });
	
	$j("#mobileSearchToogle").click(function(){
		$j(".searchSocialInner").slideToggle(200);
	});	
	
	function equaliseExtNav(){	
		// Clear previous max heights 
		$j(".extNav:visible").find('.col:visible').css("height", "");
		
		// If not in mobile (>900px) resize col heights by max height
		if($j("#ddNavSmall").not(":visible").length){
			var maxHeight = -1;	
			$j(".extNav:visible").find('.col:visible').each(function(){
				if($j(this).height() > maxHeight){
					maxHeight = $j(this).outerHeight(); 
				}
			});
			$j(".extNav:visible").find('.col').height(maxHeight);
		}
	}

	//If the search button is clicked
	$j(".searchCourseSubmit").click(function(){
		submitCourseSearch($j(this).parent());
	});
	
	//If enter is pressed from within the search
	$j(".searchCourseInput").keyup(function (e) {
	    if (e.keyCode == 13) {
	    	submitCourseSearch($j(this).parent());
	    }
	});
	
	//Go to the search results
	function submitCourseSearch(parent){
		var searchText = $j(parent).children(".searchCourseInput").val(); 
		if(searchText.length){
			var shadoUrl = getShadoHostUrl();
			
			if(shadoUrl.length > 1){
				shadoUrl = "//" + shadoUrl;
			}
			
			var searchUrl = shadoUrl + getProgSearchUrl();
			
			

			searchUrl = searchUrl + "?key_word=" + searchText + "&action=show_results";			
			window.location = searchUrl;			
		}
	}
	
	
});


