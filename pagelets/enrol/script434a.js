/**
 * if the enrol and apply divs are both are sitting sidebyside then 
 * set the height of the enrol div to that of the two beside it- take up the parent div height
 */
$j(window).on("load",function(){
	resizeEnrolPagelet();
});

$j(window).resize(function(){	
	resizeEnrolPagelet();
});

function resizeEnrolPagelet(){
	// Reset the sizes
	$j("#enrolApply").css("height", "");
	$j("#enrolReturning").css("height", "");
	
	var enrolApplyTop = $j("#enrolApply").position().top;
	var enrolNewTop = $j("#enrolNew").position().top;
	var enrolReturningTop = $j("#enrolReturning").position().top;
	var parentTop = $j("#enrolApply").parent().position().top;	
	var parentHeight = $j("#enrolApply").parent().height();	
	var enrolApplyHeight = $j("#enrolApply").height();
	var enrolReturningHeight = $j("#enrolReturning").height();
	
	// Resize the left and right columns 
	if(enrolNewTop == enrolApplyTop){		
		if ((parentTop + enrolApplyHeight) < (enrolReturningTop + enrolReturningHeight)){
			$j("#enrolApply").height(parentHeight - 18);
		} else {
			var newHeight = (enrolApplyHeight) - (enrolReturningTop - parentTop);
			$j("#enrolReturning").height(newHeight);
}}}

