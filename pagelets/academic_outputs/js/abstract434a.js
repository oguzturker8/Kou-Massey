var $academic_outputs_abstract_dialog;

$j(document).ready(function(){
  $j('body').append('<div id="academic_outputs_abstract_dialog"><\/div>');
	
	$academic_outputs_abstract_dialog = $j('#academic_outputs_abstract_dialog').dialog({
	  autoOpen: false,
	  title: 'Abstract',
	  width: 900,
	  height: 300,
	  modal: true,
	  closeText: ''
	});
	
});