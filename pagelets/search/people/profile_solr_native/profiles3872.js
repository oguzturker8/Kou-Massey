/* Formating function for row details ref http://www.datatables.net/release-datatables/examples/api/row_details.html */
function fnFormatNativeDetails ( oCurrentTable, nTr )
{
    var aData = oCurrentTable.fnGetData( nTr );
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
	if (aData[9] != "") {
	sOut += '<tbody><tr><td style="width:120px;"><img src="/massey/fms/expertise/user_images/'+$j.trim(aData[9])+'?a=5" ></td><td>'+aData[3]+'</td></tr>';
	}else{
		sOut += '<tbody><tr><td style="width:120px;"></td><td>'+aData[3]+'</td></tr>';		
	}	
	sOut += '<tr><td>Department:</td><td>'+aData[5]+'</td></tr>';
    sOut += '<tr><td>College:</td><td>'+aData[7]+'</td></tr>';
	sOut += '<tr><td>Campus:</td><td>'+aData[8]+'</td></tr>';
	if (aData[10] != "") {
		sOut += '<tr><td>Phone:</td><td>'+aData[10]+'</td></tr>';
	}	
	if (aData[16] != "") {
		sOut += '<tr><td>Research Interests:</td><td>'+aData[16]+'</td></tr>'; // Interests field
	}	
	if (aData[17] != "") {
		sOut += '<tr><td>Expertise:</td><td>' + aData[17] + '</td></tr>'; // Expertise field
	}
	if (aData[18] != "") {
		sOut += '<tr><td>Thematics:</td><td>' + aData[18] + '</td></tr>';
	}
	if (aData[19] != "") {
		sOut += '<tr><td>Fields of research:</td><td>' + aData[19] + '</td></tr>';
	}
	if (aData[20] != "") {
		sOut += '<tr><td>Research Opportunity:</td><td>' + aData[20] + '</td></tr>';
	}
	if (aData[21] != "") {
		sOut += '<tr><td>Teaching:</td><td>' + aData[21] + '</td></tr>';		
	}
	if (aData[22] != "") {
		sOut += '<tr><td>Profile:</td><td>' + aData[22] + '</td></tr>';		
	}
    sOut += '</tbody></table>';
     
    return sOut;	
}

$j(document).ready(function(){

	var bInitExpertise = false;

	//get the currently selected tab
    if ($JQueryLegacy == true) {

        $j("#expertiseSearchTabs").tabs({
            //show: function(){
            select: function(event, ui) {
                $jExpertiseTabs = ui.index;
                if ($jExpertiseTabs == 0) {

                }
                if ($jExpertiseTabs == 1) {
                    var ans = true;
                    //ans = window.confirm("This may be slow on some networks\n do you wish to continue?")
                    if (ans == true && !bInitExpertise) {
                        initExpertiseTable();
                        bInitExpertise = true;
                    }
                }
            }
        });

        //Hide second tab (1) for IE8 and below
        if (!jQuery.support.leadingWhitespace){
            $j("#expertiseSearchTabs").children("ul").children("li:eq(1)").hide();
        }

    } else {

        $j("#expertiseSearchTabs").tabs({

            activate: function(event, ui) {

                var $jExpertiseTabs = $j('#expertiseSearchTabs').tabs('option', 'active');

                if ($jExpertiseTabs == 0) {

                }
                if ($jExpertiseTabs == 1) {
                    var ans = true;
                    if (ans == true && !bInitExpertise) {
                        initExpertiseTable();
                        bInitExpertise = true;

                    }else{
                        //alert("Go back to 0");
                    }
                }
            }
        });

    }
	
	$j("#person_keyword").focus();
	
	$j(".aHrefShowHideAdvanced").click(function(){
		if ($j(this).text() == "Show advanced search"){
			$j(this).text("Hide advanced search");
			//$j(".divAdvancedSearch").show();
			$j(".divAdvancedSearch").slideDown("slow");
		}else{
			$j(this).text("Show advanced search");
			//$j(".divAdvancedSearch").hide();
			$j(".divAdvancedSearch").slideUp("slow");
		}		
		return false;
	});
	
	$j("#aHrefToggleExpertiseSearch").click(function(){
		if ($j(this).text() == "Show search form"){
			$j(this).text("Hide search form");
			$j("#expertiseSearchTabs").slideDown("slow");
		}else{
			$j(this).text("Show search form");
			$j("#expertiseSearchTabs").slideUp("slow");
		}		
		return false;
	});
	
	
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
	
	function initExpertiseTable(){
		return oTable = $j('#mu_dt_table_person').dataTable({
		
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
				{"bSearchable": true, "bSortable": false, "bVisible": false}, // [14] Academic / Staff
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
			
			"sAjaxSource": "/massey/app_templates/_pagetemplates/pagelets/search/people/profile_solr_native/profiles.cfc",
			
			"fnServerData": getExpertsBasic		
	
		});	
	}
		
	// Basic non server side processing (return all records - then filter client side)
	function getExpertsBasic(sSource, aoData, fnCallback) {
									 					
			var dtJSON = {};

			//var $jmu_person_webroot and others defined in cfm
			aoData.push({ "name": "method", "value": "getExpertsBasicCFC" });
			aoData.push({ "name": "webroot", "value": $jmu_person_webroot });													
			aoData.push({ "name": "solrHostname", "value": $jmu_person_expertise_solr_host });
			aoData.push({ "name": "solrPort", "value": $jmu_person_expertise_solr_port });
			aoData.push({ "name": "solrCollection", "value": $jmu_person_expertise_solr_collection });

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
					oTable.fnProcessingIndicator(false);
					oTable.fnClearTable();				
				}									
			});						
										
	}

	/* Add event listener for opening and closing details
	 * Note that the indicator for showing which row is open is not controlled by DataTables,
	 * rather it is done here
	 */
    $j(document).on('click', '#mu_dt_table_person tbody td i', function () {
        $j(this).toggleClass('icon-minus-sign-alt icon-green icon-plus-sign-alt icon-red');
        var nTr = $j(this).parents('tr')[0];
        oTable.fnIsOpen(nTr) ? oTable.fnClose( nTr ) : oTable.fnOpen( nTr, fnFormatNativeDetails(oTable, nTr), 'details' );
    });
	
	// Clear filtering
	$j('#person_form .btn-group button.clear').click(function (e) {		
	//$j('.clear').click(function () {
		e.preventDefault();
		oTable.fnFilter("");
		fnResetAllFilters(oTable);
		$j("#person_keyword").attr("data-field", "person_name");
		$j("#person_keyword").attr("placeholder","Name").val("").focus().blur();
		$j("input:radio[name=radio_person_search][value=person_keyword]").attr("checked", false);
		$j("input:radio[name=radio_person_search][value=person_name]").attr("checked", true);
		$j(':input:radio[data-field="person_staff_or_academic"]').removeAttr("checked");				
		//Default to Academic expert radio button when not loaded in iframe popup
		$jmu_person_expertise = false; // forcing at the mo 
		if (typeof($jmu_person_expertise) != "undefined" && $jmu_person_expertise){			
			$j(':input:radio[data-field="person_staff_or_academic"][value="academic"]').attr("checked", "checked");
			oTable.fnFilter("academic", 14);
		}else{
		$j(':input:radio[data-field="person_staff_or_academic"][value=""]').attr("checked", "checked");
		}						
		$j('#person_form div.btn-group').each( function() {		
			var sDataField = $j(this).attr('data-field');
			var sLabel = "All" // Select Title
			switch(sDataField)
			{			  
			case "person_thematic":
			  sLabel = "Thematic";
			  break;						  
			case "person_clear":
			  sLabel = "Reset";
			  break;
			}			
			$j(this).children('button:first-child').text(sLabel);			
		});
		//$j('#person_form :input:not(:radio)').each( function() {
		$j('#person_form :input[type=text]').each( function() {
			var sDataField = $j(this).attr('name');
			var sValue = "" // Input value
			switch (sDataField) {
				case "person_name":
					//sValue = "";
					sValue = "Name";
					break;
				case "person_position":
					//sValue = "";
					sValue = "Position";
					break;
				case "person_department":
					//sValue = "";
					sValue = "Department";
					break;
				case "person_interests":
					//sValue = "";
					sValue = "Interests";
					break;
				case "person_experts":
					sValue = "Expertise";
					break;
				case "person_fields_of_research":
					//sValue = "";
					sValue = "Fields of Research";
					break;
				case "person_opportunity":
					sValue = "Research Opportunity";
					break;
				case "person_teaching":
					sValue = "Teaching";
					break;
				case "person_profile":
					sValue = "Profile";
					break;
				case "person_keyword":
					//sValue = "";
					sValue = "Keywords";
					break;
			}
			$j(this).val(sValue);
			$j(this).blur();			
		});						
	});	
	
	// Input filtering
	$j('#person_form :input').keyup( function() {
		var sDataField = $j(this).attr('data-field');
		var sValue = $j(this).val();
		var iData = 0 // Column Number
		/*
		var bGeneralStaff = false;
		var sRadioAcademicOrStaff = $j(':input:radio[data-field="person_staff_or_academic"]:checked').val();		
		if (sRadioAcademicOrStaff == "staff"){
			bGeneralStaff = true;
		} 
		*/
		switch(sDataField)
		{
		case "person_name":
			iData = 3;
			break;
		case "person_position":
			iData = 4;
			break;
		case "person_department":
			iData = 5;
			break;
		case "person_interests":
		  /*
		  if (bGeneralStaff){
		  	iData = 16;
			//iData = 17;  // They may also have academic expertise i.e. staff_id = '040411'
		  }else{
		  	// default interests (compulsory field for academics)
			iData = 15;
		  }		  
		  */
		  	iData = 16;
			break;
		case "person_expertise":
			iData = 17;
			break;
		case "person_fields_of_research":
			iData = 19;
			break;
		case "person_opportunity":
			iData = 20;
			break;
		case "person_teaching":
			iData = 21;
			break;
		case "person_profile":
			iData = 22;
			break
		case "person_keyword": // All bSearchable columns
			iData = -1;
			break;
		}		
		if (iData > 0) {
			oTable.fnFilter(sValue, iData);
			//Wanted to sort by academics first but this slows down the filtering dramatically.
			//oTable.fnSort( [ [10,'asc'], [6,'asc'] ] ); // Sort by academic / staff asc, last name asc
		}else{
			oTable.fnFilter(sValue);	
			//oTable.fnSort( [ [10,'asc'], [6,'asc'] ] ); // Sort by academic / staff asc, last name asc
		}		
    });
	
	// Switch filtering for keywords / name
	$j("input:radio[name=radio_person_search]").click(function(){		
		var sValue = $j(this).val();
		var sKeyword = $j("#person_keyword").val();		
		if (sValue == "person_keyword"){	
			$j("#person_keyword").attr("data-field", "person_keyword");
			if (sKeyword == "Name"){
				$j("#person_keyword").attr("placeholder","Keywords").val("").focus().blur();	
			}			
		}else{
			$j("#person_keyword").attr("data-field", "person_name");
			if (sKeyword == "Keywords"){			
				$j("#person_keyword").attr("placeholder","Name").val("").focus().blur();	
			}			
		}				
		if (sKeyword.length && sKeyword != "Keywords" && sKeyword != "Name") {
			oTable.fnFilter("");
			fnResetAllFilters(oTable);
			if (sValue == "person_keyword"){				
				oTable.fnFilter(sKeyword);					
			}else{				
				oTable.fnFilter(sKeyword, 3);
			}			
		}				
		//$j("#person_keyword").select();
		$j("#person_keyword").focus().blur();
	});
	
	// Academic Staff
	// radio_staff_or_academic
	$j(':input:radio[data-field="person_staff_or_academic"]').click( function() {
		var sValue = $j(this).val();
		oTable.fnFilter(sValue, 14);		
	});	
	
	// Academic Staff
	// radio_staff_or_academic
	/*
	$j(':input:radio[data-field="person_staff_or_academic"]').click( function() {
		var sValue = $j(this).val();
		var sInterests = $j.trim($j("#person_interests").val());
		if (sInterests == "Interests / Expertise"){
			sInterests = "";
		}
		if (sInterests.length){
			oTable.fnFilter("", 15);
			oTable.fnFilter("", 16);	
			oTable.fnFilter("", 17);
		}		
		oTable.fnFilter(sValue, 10);		
		if (sValue == "staff") {
			if (sInterests.length) {
				oTable.fnFilter(sInterests, 16);
				//oTable.fnFilter(sInterests, 17);
			}
			//$j("#person_fields_of_research").val("");
			//$j("#person_fields_of_research").hide();
		}
		else {
			if (sInterests.length) {
				oTable.fnFilter(sInterests, 15);
				//oTable.fnFilter(sInterests, 17);
			}
			
			//if ($j("#person_fields_of_research").val() == ""){
				//$j("#person_fields_of_research").blur();
			//}
			//$j("#person_fields_of_research").show();
			
			}
	});
			*/
	
	
	// Drop down filtering
	$j('.divAdvancedSearch .btn-group li').click(function (e) {
		e.preventDefault();
		var sDataField = $j(this).parents('div').attr('data-field');
		var iUl = 0 // Column Number
		switch(sDataField)
		{
		case "person_thematic":
		  iUl = 18;
		  break;
		}
		var inputClass = $j(this).closest('div.btn-group').data("field");
		$j(this).closest('div.btn-group').children('button:first-child').text($j(this).text());
		$j("input." + inputClass).val("" + $j(this).data("value"));
		oTable.fnFilter($j(this).data("value"), iUl);
    });		
	
	function fnResetAllFilters(oTable) {
	    var oSettings = oTable.fnSettings();
	    for(iCol = 0; iCol < oSettings.aoPreSearchCols.length; iCol++) {
	        oSettings.aoPreSearchCols[ iCol ].sSearch = '';
	    }
	    oSettings.oPreviousSearch.sSearch = '';
	    oTable.fnDraw();
	}
     			
	//Default to Academic expert radio button when not loaded in iframe popup
	/* 
	if (typeof($jmu_person_expertise) != "undefined" && $jmu_person_expertise){
		//$j(':input:radio[data-field="person_staff_or_academic"][value="academic"]').trigger("click");
		$j(':input:radio[data-field="person_staff_or_academic"][value="academic"]').attr("checked", "checked");
		oTable.fnFilter("academic", 10)		
	}
	*/
     			
});
