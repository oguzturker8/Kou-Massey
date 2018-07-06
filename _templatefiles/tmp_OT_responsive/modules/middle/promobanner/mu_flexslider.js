$j.fn.exists = function () {
    return this.length !== 0;
}

// https://developers.google.com/youtube/iframe_api_reference##Getting_Started
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

// This is a protocol-relative URL as described here:
//     http://paulirish.com/2010/the-protocol-relative-url/
// If you're testing a local page accessed via a file:/// URL, please set tag.src to
//     "https://www.youtube.com/iframe_api" instead.
tag.src = "//www.youtube.com/iframe_api";
//tag.src = "https://www.youtube.com/iframe_api";
//var firstScriptTag = document.getElementsByTagName('script')[0];
//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

if ($jmu_has_youtube == true) {		
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

var inlinePlayer;
var popupPlayer;
var _currentVideo = "player_1";
var iYouTubeLoaded = 0;
var bPopUpLoaded = 0;

function onYouTubeIframeAPIReady(){
	inlinePlayer = new YT.Player(_currentVideo, {		
	events: {
        'onReady': onInlinePlayerReady,
		'onStateChange': onInLinePlayerStateChange,
		'onError': onPlayerError
    	}			
	});							        
}		
													
//The API will call this function when the video player is ready.
function onInlinePlayerReady(event){
    //console.log("inlinePlayer Player Ready " + inlinePlayer.getVideoEmbedCode() );
	// Start the slider once the video has loaded for the first time.
	if (iYouTubeLoaded == 1){
		$j('.flexslider').flexslider("pause");
		$j('.flexslider').flexslider("play");
		iYouTubeLoaded = 0;	
	}	
}


// We capture this event to initiate the popup video
function onInLinePlayerStateChange(event){		

	//console.log("InLinePlayer State change " + event.data);
	
	/* Flash API Bug ? Continues returning these events! */
	/* Just ignore these events when the popup is loaded */
	//if (event.data == -1 || event.data == 5) {
		//return;
	//}			
	
	$j('.flexslider').flexslider("pause");
	
	// Allow the video and the slider to carry on when in small screen.
	if (Math.floor($j('body').width()) < 480) {
		if (event.data == 2 || event.data == 0) {
			$j('.flexslider').flexslider("play");
		}
		return;
	
	}
	else if (!bPopUpLoaded)
	{
	
		var thisVideo;
		var videoPaused = false;
		//console.log("State change " + event.data);		
		
		try {
			//event.target.pauseVideo();
			event.target.stopVideo();
			videoPaused = true;
			//console.log("event.target.pauseVideo() = true");
		} 
		catch (e) {
			//console.log("event.target.pauseVideo() = false " + e.message);
		}
		if (!videoPaused) {
			try {
				//inlinePlayer.pauseVideo();
				inlinePlayer.stopVideo();
				videoPaused = true;
				//console.log("inlinePlayer.pauseVideo() = true");
			} 
			catch (e) {
				//console.log("inlinePlayer.pauseVideo() = false " + e.message);
			}
		}
		if (!videoPaused) {
			try {
				//inlinePlayer.destroy();
				// If stopping the video via the API has failed
				// Re-set the video source to reload the video!
				thisVideo = $j("#" + _currentVideo).attr("src");
				$j("#" + _currentVideo).attr("src", "");
				$j("#" + _currentVideo).attr("src", thisVideo);				
				if (typeof(YT.Player) !== 'undefined') {
					inlinePlayer = new YT.Player(_currentVideo, {		
						events: {
				        	'onReady': onInlinePlayerReady,
							'onStateChange': onInLinePlayerStateChange
				    	}			
					});
				}else{
					// Allow brief interval to allow the player to load and let it run the onYouTubeIframeAPIReady 
					setTimeout(function() {
						if (typeof(YT.Player) !== 'undefined') {
							inlinePlayer = new YT.Player(_currentVideo, {		
								events: {
						        	'onReady': onInlinePlayerReady,
									'onStateChange': onInLinePlayerStateChange
						    	}			
							});
						}												
					}, 100 );
				}				
				videoPaused = true;
				//console.log("inlinePlayer.pauseVideo() = true");
			} 
			catch (e) {
				//console.log("inlinePlayer.pauseVideo() = false " + e.message);
			}
		}
					
		thisVideo = $j(".flex-active-slide .slideVideo").html();						
		//thisVideo = $j(".slideVideo").html();
		
		// playing / buffering 
		//if ((event.data == 1 || event.data == 3) && thisVideo.length && videoPaused) {
		if (thisVideo.length && videoPaused) {
			//iPopUpLoaded = 1;
			//alert($j('body').width());
			if (Math.floor($j('body').width()) < 1260) {
				iDialogWidth = Math.floor($j('body').width() * .95);
				//alert(iDialogWidth);
			}else{iDialogWidth = 1200}
			// Pop up video
			$j("#popupVideoDialog").dialog("option", "width", iDialogWidth);
			$j("#popupVideoDialog").dialog("option", "alsoResize", "#popupVideo");
			$j("#popupVideoDialog").data("myVideo", thisVideo).dialog("open");
			iPopUpLoaded = 1;						
		}				
		
	}
					
}

function onPlayerError(event){
	//console.log("API Error: " + event.data);
	var sError = "";
	switch (event.data) {
		case 2: 
		sError = "Invalid Video ID";
		case 5: 
		sError = "HTML5 player related error";
		case 100: 
		sError = "The video requested was not found";
		case 101: 
		sError = "The owner of the requested video does not allow it to be played in embedded players. ";
		case 150: 
		sError = "The owner of the requested video does not allow it to be played in embedded players. ";
		if (sError.length){
			alert(sError);	
		}		
	}
}

//The API will call this function when the video player is ready.	
function onPopupPlayerReady(event){
	//console.log("Popup Player Ready ");								
	// try once more to stop video if needed!
	if (typeof(inlinePlayer) !== "undefined") {
		try{
			inlinePlayer.stopVideo();
		}
		catch(e) {
			//console.log(e.message);									
		}	
	}
	event.target.playVideo();
}

function onPopupPlayerStateChange(event){
	//console.log("Popup State change " + event.data);
	if (typeof(inlinePlayer) !== "undefined") {
		try{
			inlinePlayer.stopVideo();
		}
		catch(e) {
			//console.log(e.message);									
		}	
	}
}


// window load function overcomes a lot of the problems encountered checking to see if the api is ready!!
// window load causing delays so reverting.
$j(document).ready(function(){
//$j(window).load(function() {
	
	var iDialogWidth = 1200;
	var bYouTube = false;
	
	//$j.getScript("//www.youtube.com/iframe_api");				
			
	$j(".playVideo").click(function () {
		popUpVideo();				
	});

	function popUpVideo() {
		var thisVideo = "";		
		
		$j('.flexslider').flexslider("pause");								
		//thisVideo = $j(".slideVideo").html();
		thisVideo = $j(".flex-active-slide .slideVideo").html();
		// Pop up video
		if (thisVideo.length) {
			iPopUpLoaded = 1;
			if (Math.floor($j('body').width()) < 1260) {
				iDialogWidth = Math.floor($j('body').width() * .95);
			}else{iDialogWidth = 1200}
			$j("#popupVideoDialog").dialog("option", "width", iDialogWidth);
			$j("#popupVideoDialog").dialog("option", "alsoResize", "#popupVideo");
			$j("#popupVideoDialog").data("myVideo", thisVideo).dialog("open");
		}else{
			alert("Failed to retrieve the current video details");
		}		
		
	}						
	
    $j("#popupVideoDialog").dialog({
		resizable: false,
		//draggable: false,
		autoOpen: false,
        modal: true,
		position: 'center',
		width: iDialogWidth,		
		height: 'auto',		
		closeOnEsc:	true,				                
        //title: "Video popup",
                
        open: function(){
			
			bPopUpLoaded = 1;
			// hide the ui background. 			
			$j(this).parents(".ui-widget-content").css("background","transparent");
			$j(this).parents(".ui-widget-content").css("border","none");			
			$j(this).css("background", "#FFFFFF");
						
			var dialogVideo = $j(this).data("myVideo");
			// Change its ID			
			dialogVideo = $j(dialogVideo).attr("id", "popupVideo");							
			$j(this).empty().html(dialogVideo);
			
			var _currentPopUpVideo = "popupVideo"
			popupPlayer = new YT.Player(_currentPopUpVideo, {
				events: {
					'onReady': onPopupPlayerReady,
					'onStateChange': onPopupPlayerStateChange
				}
			});
										        
        },
		        
        close: function(){
        	$j('.flexslider').flexslider("play");
			$j(this).empty();
			try{
				popupPlayer.destroy();
			}catch(e){}			 
			bPopUpLoaded = 0;
        }
        
    });	
	
	var currentSlide = 0;
	var player_id = 0;	
	$j('.flexslider').flexslider({					
		directionNav: false,
		slideshowSpeed: 7000,
		//initDelay: 1000,
		video: true,
				
        start: function(slider){
			//console.log("First slide load " + slider.currentSlide);
			currentSlide = slider.currentSlide;
			player_id = currentSlide + 1;
			_currentVideo = 'player_' + player_id;			
			//bYouTube = $j(".flex-active-slide iframe[src*='youtube.com/embed/']").find();
			bYouTube = $j(".flex-active-slide iframe[src*='youtube.com/embed/']").exists();
			if (bYouTube){
				$j(".flex-active-slide iframe").attr("id", _currentVideo);				
				//console.log(inlinePlayer.getVideoEmbedCode());			
				//console.log(typeof(YT));
				if (typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined'){
					try{
						inlinePlayer = new YT.Player(_currentVideo, {		
							events: {
						        'onReady': onInlinePlayerReady,
								'onStateChange': onInLinePlayerStateChange
						    }			
						});	
					}catch(e){
						//console.log(e.message);
					}					
					iYouTubeLoaded = 1;						
				}else{
					// Allow brief interval to allow youtube api to load and let it run the onYouTubeIframeAPIReady 
					setTimeout(function() {
						//console.log("Youtube after start 2: " + typeof(YT));
						//slider.flexslider("play");
						if (typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined'){
							try{
							inlinePlayer = new YT.Player(_currentVideo, {								
								events: {
						        	'onReady': onInlinePlayerReady,
									'onStateChange': onInLinePlayerStateChange
						    	}			
							});	
							//console.log(typeof(YT.Player));
							}catch(e){
								//console.log(e.message);
							}							
						}
						iYouTubeLoaded = 1;						
					}, 300 );
				}					
			}						
			
        },		
		
		before: function(slider) {
					
		},						

		after: function(slider) {
			//console.log("After slide load " + slider.currentSlide);
			currentSlide = slider.currentSlide;
			player_id = currentSlide + 1;
			_currentVideo = 'player_' + player_id;
			//bYouTube = $j(".flex-active-slide iframe[src*='youtube.com/embed/']").find();
			bYouTube = $j(".flex-active-slide iframe[src*='youtube.com/embed/']").exists();
			if (bYouTube){				
				$j(".flex-active-slide iframe").attr("id", _currentVideo);
				if (typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined'){
					try{
						inlinePlayer = new YT.Player(_currentVideo, {		
						events: {
					        'onReady': onInlinePlayerReady,
							'onStateChange': onInLinePlayerStateChange
					    	}			
						});	
					}catch(e){
						//
					}					
					//console.log("Youtube after: " + typeof(YT));	
				}else{ 
					setTimeout(function() {						
						if (typeof(YT) !== 'undefined' && typeof(YT.Player) !== 'undefined'){
							try{
								inlinePlayer = new YT.Player(_currentVideo, {		
								events: {
							        'onReady': onInlinePlayerReady,
									'onStateChange': onInLinePlayerStateChange
							    	}			
								});								
							}catch(e){
								//	
							}
						}						
					}, 100 );					
				}											
				//console.log(inlinePlayer.getVideoEmbedCode());								
			}												
		}			

	});
		
	
		
				
});	