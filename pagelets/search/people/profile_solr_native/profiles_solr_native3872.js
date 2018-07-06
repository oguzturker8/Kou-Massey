// Wake up solr /ajax on first load and every few minutes if page is left open 
window.setInterval("pollSolrAutoSuggest();",300000);
pollSolrAutoSuggest();
function pollSolrAutoSuggest(){
	$j.ajax({
		url: "/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profiles_solr_native.cfc?method=getAutoSuggestResults&returnformat=json",
		dataType: "json",
		data: {
			solrHost: $jmu_person_expertise_solr_host,			
			solrPort: $jmu_person_expertise_solr_port,
			solrCollection: $jmu_person_expertise_solr_collection,
			term: "zoo"
		},
		success: function(result){
		}
	});
}

$j(document).ready(function(){
	
	var people_search_server = $j("#people_native_search_server").val();	
	
	$j("#people_native_keyword").focus();
	
	$j('#expertiseSearchTabs').tabs();

	/* Use profiles.js */
	/*
	$j("[placeholder]:not(.mu_jq_dialog_login [placeholder])").focus(function() {
		var input = $j(this);
		if (input.val() == input.attr("placeholder")) {
			input.val("");
			input.removeClass("placeholder");
		}
	}).blur(function() {
		var input = $j(this);
		if (input.val() == "" || input.val() == input.attr("placeholder")) {
			input.addClass("placeholder");
			input.val(input.attr("placeholder"));
		}
	}).blur();
		
	$j("[placeholder]:not(.mu_jq_dialog_login [placeholder])").parents("form").submit(function() {
		$j(this).find("[placeholder]").each(function() {
			var input = $j(this);
			if (input.val() == input.attr("placeholder")) {
				input.val("");
			}
		})
	});
	*/
		
	$j("#chkSolrNativePosition").click(function(e) {
		e.stopPropagation();
		$j("#people_native_position").toggle();		
	});		
	
	$j("#chkSolrNativeCollege").click(function(e) {
		e.stopPropagation();
		$j("#people_native_college").toggle();
	});		
	
	$j("#chkSolrNativeDepartment").click(function(e) {
		e.stopPropagation();
		$j("#people_native_department").toggle();		
	});
	
	$j('a').parent('li[data-field="people_native_college"]').click(function(e){
		e.preventDefault();
		var sSelected = $j.trim($j(this).text());
		$j(this).parent("ul").prev(".btn-large").prev(".btn-large").text(sSelected);		
		if (sSelected == "All Colleges") {
			$j("#people_native_college_selected").val("");
			$j("#btnPeopleNativeSearch").trigger("click");
		}else{
			$j("#people_native_college_selected").val(sSelected);
			$j("#btnPeopleNativeSearch").trigger("click");
		}
	});			
	
	$j('a').parent('li[data-field="people_native_department"]').click(function(e){
		e.preventDefault();
		var sSelected = $j.trim($j(this).text());
		$j(this).parent("ul").prev(".btn-large").prev(".btn-large").text(sSelected);
		if (sSelected == "All Departments") {
			$j("#people_native_department_selected").val("");
			$j("#btnPeopleNativeSearch").trigger("click");
		}else{
			$j("#people_native_department_selected").val(sSelected);
			$j("#btnPeopleNativeSearch").trigger("click");
		}		
	});	
	
	//$j("#people_native_keyword").keyup(function() {
		//peopleDatatable();
	//});
	
	autosuggestRadioSelected("keywords");
	
	/* autosuggest on radio click - see also output_search keyup to work with url parameters */
	$j("input:radio[name=radio_people_native_search]").click(function(){
		var rVal = $j(this).val();
		autosuggestRadioSelected(rVal);		
	});
	
	$j("#people_native_keyword").focus(function(){
		$j("#people_native_keyword").select();
	});
	
	$j("#people_native_keyword").click(function(){
		$j("#people_native_keyword").select();
	});
		
	/* autosuggest on people_native_keyword keyup */
	function autosuggestRadioSelected(rVal){
		$j("#people_native_keyword").focus();
		//$j("#people_native_keyword").attr("data-autocomplete_selected", "none");
		$j("#autocomplete_selected").val("none");
		switch (rVal) {			
			case "keywords": // All bSearchable columns
				// Solr Autocomplete when the native solr server is in place				
				//$j(function(){
					$j("#people_native_keyword").autocomplete({			
						source: function(query, response){
							$j.ajax({
								url: "/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profiles_solr_native.cfc?method=getAutoSuggestResults&returnformat=json",
								dataType: "json",
								data: {
									solrHost: $jmu_person_expertise_solr_host,
									solrPort: $jmu_person_expertise_solr_port,
									solrCollection: $jmu_person_expertise_solr_collection,
									term: query.term
								},
								success: function(result){
									response(result);
									//$j("#people_native_keyword").attr("data-autocomplete_selected", "none");
									$j("#autocomplete_selected").val("none");
								}
							});				
						},
						select: function( event, ui ) {
							//alert(ui.item.value);
							//return false;
							if ((ui.item.value).length > 3) {
								//Add quotes when selecting autocomplete option. 
								//var sKeywords = sKeywords = '"'+ui.item.value+'"';
								var sKeywords = ui.item.value;								
								$j("#people_native_keyword").val(sKeywords);
								//$j("#people_native_keyword").attr("data-autocomplete_selected", "keywords");
								$j("#autocomplete_selected").val("keywords");
								//alert($j("#people_native_keyword").data("autocomplete_selected"));
								//alert($j("#autocomplete_selected").val());								
								$j("#btnPeopleNativeSearch").trigger("click");
								//return false;																	
							}							
						}
					});
					//$j("#people_native_keyword").val("Anne Noble");
				//});								
			break;
			case "person":				
				$j("#people_native_keyword").autocomplete({
					source: function(query, response){
						$j.ajax({
							url: "/massey/app_templates/_pagetemplates/pagelets/search/people/profile/profiles_solr.cfc?method=getPeople&returnformat=json",
							dataType: "json",
							data: {
								term: query.term
							},
							success: function(result){
								response(result);
								//$j("#people_native_keyword").attr("data-autocomplete_selected", "none");
								$j("#autocomplete_selected").val("none");
							},							
						});
					},
					select: function(event, ui){
						if ((ui.item.value).length > 3) {
							//Add quotes when selecting autocomplete option. 
							//var sKeywords = '"'+ui.item.value+'"';
							var sKeywords = ui.item.value;							
							$j("#people_native_keyword").val(sKeywords);
							//$j("#people_native_keyword").attr("data-autocomplete_selected", "person");
							//alert($j("#people_native_keyword").data("autocomplete_selected"));
							$j("#autocomplete_selected").val("person");							
							//alert($j("#autocomplete_selected").val());
							$j("#btnPeopleNativeSearch").trigger("click");
							//return false;
						}
					}
				});
			break;
		}
	}			  
		
	$j("#people_native_position").click(function(){
		$j("#people_native_position").select();
	});
	
	$j("#people_native_position").autocomplete({
		source: function(query, response){
			$j("#autocomplete_position_selected").val("none");
			$j.ajax({
				url: "/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profiles_solr_native.cfc?method=getPositions&returnformat=json",
				dataType: "json",
				data: {
					term: query.term
				},
				success: function(result){
					response(result);
					$j("#autocomplete_position_selected").val("none");
				}				
			});
		},
		select: function(event, ui){
			if ((ui.item.value).length > 3) {
				$j("#autocomplete_position_selected").val("position");
				$j("#btnPeopleNativeSearch").trigger("click");
			}
		}
	});		
	
	// Enter keypress.	
	$j("#people_solr_native_form").keypress(function(e) {	
		// if the Enter button is pressed
		if (e.which && e.which == 13) {
	  		e.preventDefault();
			$j("#autocomplete_selected").val("none");
			$j("#btnPeopleNativeSearch").click();
			$j("#people_native_keyword").blur();						
		}							   
	});
		
	$j("#btnPeopleNativeSearch").click(function(e) {
		e.preventDefault();
		// Set to none when clicking on button.
		if (e.which) {
			$j("#autocomplete_selected").val("none");
		}								
		// Results table
		/* */
		var jqxhr = $j.get("/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profile_solr_native_search_results.cfm").done(function(data) {								
			$j("#solrPeopleNativeResults").empty().html(data);
		});		
		jqxhr.always(function(){
			peopleDatatable();			
		});
		/* */		
	});	
	
	var oSolrNativeTable;
	
	function peopleDatatable(){

		oSolrNativeTable = $j('#mu_dt_table_solr_native_person').dataTable({			
				
				"bDestroy": true, 
				"bJQueryUI": true,
				"bProcessing": true,
				"bServerSide": false,
				"bStateSave": false,
				"bRetrieve": false,
				"bDeferRender": true, // Good for IE8 for large datasets // quicker load in all browsers
				"bSort": true,
				//"bAutoWidth": false, // Disable the auto width calculation 
				"sPaginationType": "full_numbers",
				"aLengthMenu": [[10, 15, 25, 50, 100 , 500], [10, 15, 25, 50, 100, 500]], // Number of records per page
				"iDisplayLength" : 25, // Number of records preset to
				//"iSortingCols": 1,
				"iSortCol": 25, // Sort by ranking
				"oLanguage": {
					//"sSearch": "Filter records: _INPUT_ (Title)"
					"sSearch": "Apply additional filtering:"
				},
				// make sure you have the correct number of columns in the cfm table! 
				// Even the hidden ones. These must be co-ordinated with profiles.js
				"aoColumns": [
					{"bSearchable": false, "bSortable": false, "bVisible": true}, // [0] Hidden Dummy
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [1] Staff ID
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [2] Staff Link
					{"bSearchable": true, "bSortable": true, "bVisible": true, iDataSort:6}, // [3] Known as Name
					{"bSearchable": true, "bSortable": true, "bVisible": true}, // [4] Position						
					{"bSearchable": true, "bSortable": true, "bVisible": true}, // [5] Department
					
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [6] College Code
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [7] College
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [8] Campus
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [9] Profile Image
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [10] Phone
					{"bSearchable": false, "bSortable": false, "bVisible": true}, // [11] Ext.
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [12] Email					
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [13] Last name
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [14] Academic / Staff
					{"bSearchable": false, "bSortable": false, "bVisible": false}, // [15] Gender
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [16] Research Interest - Apply to Academic staff mandatory input
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [17] Expertise - Apply to General staff
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [18] Thematics
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [19] Fields of Research
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [20] Research Opportunity Title & Description
					{"bSearchable": true, "bSortable": false, "bVisible": false}, // [21] Teaching
					{"bSearchable": true, "bSortable": false, "bVisible": false} // [22] Profile
					//{"bSearchable": true, "bSortable": false, "bVisible": false}, // [23] Title					
					//{"bSearchable": true, "bSortable": false, "bVisible": false} // [24] Keywords																				 
				],
				"aoColumnDefs": [			
					{ "sName": "DUMMY", "sWidth": "5px", "sClass": "center", "aTargets": [0],
						"fnRender": function(oObj){
							return '<i class="icon-plus-sign-alt icon-green"></i>';
						}
					},
					{ "sName": "id", "sTitle": "Staff ID", "aTargets": [1] },
					{ "sName": "url", "sTitle": "Staff Link", "aTargets": [2] },
					{ "sName": "known_as", "sTitle": "Name", "sWidth": "175px", "aTargets": [3],
						"fnRender": function(oObj){
							return '<a target="blank" title="' + oObj.aData[3] + '" href="' + oObj.aData[2] + '">' + oObj.aData[3] + '</a>';
						}
					},
					{ "sName": "position", "sTitle": "Position", "aTargets": [4] },	
					{ "sName": "department", "sTitle": "Department", "aTargets": [5] },					 																			
					{ "sName": "college_code", "sTitle": "College Code", "aTargets": [6] },
					{ "sName": "college", "sTitle": "College", "aTargets": [7] },
					{ "sName": "campus", "sTitle": "Campus", "aTargets": [8] },				 			  																	
					{ "sName": "image_name", "sTitle": "Image", "aTargets": [9] },					
					{ "sName": "phone", "sTitle": "Phone", "aTargets": [10] },
					{ "sName": "extension", "sTitle": "Ext.", "sWidth": "40px", "aTargets": [11] },
					{ "sName": "email", "sTitle": "Email", "sWidth": "100px", "aTargets": [12] },
					{ "sName": "last_name", "sTitle": "Last Name", "aTargets": [13] },
					{ "sName": "academic", "sTitle": "Academic", "aTargets": [14] },
					{ "sName": "gender", "sTitle": "Gender", "aTargets": [15] },
					{ "sName": "interests", "sTitle": "Interests", "aTargets": [16] }, // Academic staff - Research Interest			 			  
					{ "sName": "expertise", "sTitle": "Expertise", "aTargets": [17] }, // General and Academic staff - Area of Expertise
					{ "sName": "thematics", "sTitle": "Thematics", "aTargets": [18] },
					{ "sName": "fields_of_research", "sTitle": "Fields of Research", "aTargets": [19] },
					{ "sName": "opportunity", "sTitle": "Research Opportunity", "aTargets": [20] },
					{ "sName": "teaching", "sTitle": "Teaching", "aTargets": [21] },
					{ "sName": "profile", "sTitle": "Profile", "aTargets": [22] }								
					//{ "sName": "outputs_titles", "sTitle": "Output Titles", "aTargets": [23] },
					//{ "sName": "outputs_keywords", "sTitle": "Output Keywords", "aTargets": [24] },				
				],
				"sAjaxSource": "/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profiles_solr_native.cfc",
				
				"fnServerData": getExpertsNativeSolr		

		});
		
	}		
		
	// Basic non server side processing (return all records - then filter client side)
	function getExpertsNativeSolr(sSource, aoData, fnCallback) {
									 														
			$j("#btnPeopleNativeSearch").attr("disabled", true);
			
			var dtJSON = {};
			var bValues = false;
			//var sAutoSelected = $j("#people_native_keyword").data("autocomplete_selected");
			var sAutoSelected = $j("#autocomplete_selected").val();
			//alert(sAutoSelected);
			aoData.push({ "name": "experts_keywords_auto_selected", "value": sAutoSelected });
			var sKeywordsVal = $j("#people_native_keyword").val();
			if (sKeywordsVal == "Keywords" || sKeywordsVal == ""){
				sKeywordsVal = "";	
			}else {bValues = true;} 		
			aoData.push({ "name": "experts_keywords", "value": sKeywordsVal });			
			var sPositionAutoSelected = $j("#autocomplete_position_selected").val();
			aoData.push({ "name": "experts_position_auto_selected", "value": sPositionAutoSelected });
			var sPositionVal = $j("#people_native_position").val();
			if (sPositionVal == "Position / Job title" || sPositionVal == ""){
				sPositionVal = "";	
			}else {bValues = true;}
			aoData.push({ "name": "experts_position", "value": sPositionVal });
			var sCollegeVal = $j("#people_native_college_selected").val();
			if (sCollegeVal.length) {bValues = true;}
			aoData.push({ "name": "experts_college", "value": sCollegeVal });
			var sDeptVal = $j("#people_native_department_selected").val();
			if (sDeptVal.length) {bValues = true;}
			aoData.push({ "name": "experts_department", "value": sDeptVal });
			aoData.push({ "name": "solrHost", "value": $jmu_person_expertise_solr_host });
			
			if (bValues){
			
				aoData.push({ "name": "method", "value": "getExpertsFromSolr" });
				aoData.push({ "name": "radioSelect", "value": $j("input:radio[name=radio_people_native_search]:checked").val() });										
				
				$j.ajax({
					dataType: 'json',			
					type: "post",
					url: sSource,
				 	data: aoData,
					async: false,							
					success: function (json) {
		
						try{											
							
							if (json.response.docs.length){
														
								// Columns
								var currentColumns = [];
								currentColumns[currentColumns.length] = {"sTitle":"dummy"};
								currentColumns[currentColumns.length] = {"sTitle":"staff_id"};
				                $j.each(json.response.docs[0], function(key, row) {
				                    currentColumns[currentColumns.length] = {"sTitle":key};
				                });
								
								// Rows
								var currentData = [];
				                $j.each(json.response.docs, function(key, row) {
				                    var newrow = [];
									newrow[newrow.length] = ""; // dummy
									newrow[newrow.length] = ""; // staff_id
				                    $j.each(row, function(key, value) {
				                        newrow[newrow.length] = value;
				                    });
				                    currentData[currentData.length] = newrow;
				                });
								
								if (currentColumns.length){
									dtJSON.aoColumns = currentColumns;	
								}else{
									dtJSON.aoColumns = {};
								}
								if (currentColumns.length) {
									dtJSON.aaData = currentData;
								}else{
									dtJSON.aaData = {};
								}						
							}else{
								dtJSON.aaData = {};
								dtJSON.aoColumns = {};
							}							
							
							dtJSON.iTotalRecords = json.response.numFound;
							dtJSON.iTotalDisplayRecords = json.response.numFound;									

																
							fnCallback(dtJSON);						
													
						}catch(e){
							
							alert( "Failed to populate expertise table.\n"+e.message );
							dtJSON.aaData = {};
							dtJSON.aoColumns = {};
							fnCallback(dtJSON);
							
						}																																	
		
					},																																																		
					error: function (xhr, textStatus, errorThrown) {
						alert( "Failed to return expertise data.\n"+textStatus+" "+errorThrown );
						oSolrNativeTable.fnProcessingIndicator(false);
						oSolrNativeTable.fnClearTable();				
					}									
				});			
				
			}else{
				dtJSON.aaData = {};
				dtJSON.aoColumns = {};
				fnCallback(dtJSON);
			}
				
			$j("#btnPeopleNativeSearch").attr("disabled", false);								
										
	}

	/* Add event listener for opening and closing details
	 * Note that the indicator for showing which row is open is not controlled by DataTables,
	 * rather it is done here
	 */
    $j(document).on('click', '#mu_dt_table_solr_native_person tbody td i', function () {
        $j(this).toggleClass('icon-minus-sign-alt icon-green icon-plus-sign-alt icon-red');
        var nTr = $j(this).parents('tr')[0];
        oSolrNativeTable.fnIsOpen(nTr) ? oSolrNativeTable.fnClose( nTr ) : oSolrNativeTable.fnOpen( nTr, fnFormatNativeDetails(oSolrNativeTable, nTr), 'details' );
    });
	
	// Clear filtering
	$j('#people_solr_native_form .btn-group button.clear').click(function (e) {		
		e.preventDefault();
		if (typeof(oSolrNativeTable) != "undefined"){
			oSolrNativeTable.fnFilter("");
			//fnResetAllFilters(oSolrNativeTable);	
		}				
		$j(':input:radio[name="radio_people_native_search"][value="keywords"]').attr("checked", "checked");
		$j(':input:radio[name="radio_people_native_search"][value="person"]').attr("checked", false);
		autosuggestRadioSelected("keywords");
		$j("#chkSolrNativePosition").attr("checked", false);
		$j("#chkSolrNativeCollege").attr("checked", false);
		$j("#chkSolrNativeDepartment").attr("checked", false);
		$j('#people_solr_native_form div.btn-group').each( function() {		
			var sDataField = $j(this).attr('data-field');
			var sLabel = "All" // Select Title
			switch(sDataField)
			{			  
			case "people_native_search":
			  sLabel = "Search";
			  break;
			case "people_native_college":
			  sLabel = "All Colleges";
			  break;						  
			case "people_native_department":
			  sLabel = "All Departments";
			  break;
			case "people_native_criterea":
			  sLabel = "Add criteria";
			  break;
			case "people_native_clear":
			  sLabel = "Reset";
			  break;
			}			
			$j(this).children('button:first-child').text(sLabel);			
		});
		$j("#people_native_position").hide();
		$j("#people_native_position").val("");
		$j("#people_native_college").hide();
		$j("#people_native_college_selected").val("");
		$j("#people_native_department").hide();
		$j("#people_native_department_selected").val("");
		//$j('#people_solr_native_form :input:not(:radio)').each( function() {
		$j('#people_solr_native_form :input[type=text]').each( function() {
			var sDataField = $j(this).attr('name');
			var sValue = "" // Input value
			switch (sDataField) {
				case "people_native_position":
					sValue = "Position";
					break;
				case "people_native_keyword":
					sValue = "Keywords";
					break;
			}
			$j(this).val(sValue);			
			$j(this).blur();
		});						
	$j("#solrPeopleNativeResults").empty();
	});

});
	