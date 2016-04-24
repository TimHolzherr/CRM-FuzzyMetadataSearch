onStartUp();

function onStartUp() {
	$('#waiting').hide();
	if (hasValidCache()){
		// Load second view
		$('#firstTime').hide();
		$('#secondTime').show();
	}
	else {
		// Load first start view
		$('#solutionDropdown').html('Choose your Solution <span class="caret"></span>');
		$('#firstTime').show();
		$('#secondTime').hide();		
	}
			
	//var data = JSON.parse(localStorage.data); if not defined ...

	function hasValidCache(){
		if (localStorage.solutionId && localStorage.data){
			return true;
		}
		return false;
	}
	
	function onChangeFuzzyAttributes (value) {
		var url = "https://www.google.com/#safe=off&q="+value
		var win = window.open(url, '_blank');
		win.focus();
	}

	$fuzzyAttributes = $('#fuzzyAttributes').selectize({
		onChange: onChangeFuzzyAttributes,
		valueField: 'id',    					
		searchField: ['entitySchemaName', 'attributeSchemaName'],
		options: data,
		render: {
			option: function(item, escape){
				return("<div>" + item.entitySchemaName + "              " + item.attributeSchemaName+"</div>");
			}
		}						
	});
}


function publishSolution(){
	alert("TODO: Implement publishSolution");
}


function downloadMetadataButton(){
	$('#waiting').show();
	localStorage.data = "data"
	localStorage.solutionId = "solutionId"
	alert("TODO: Implement Download Metadata Button");
	onStartUp();
}

function reloadMetadataButton(){
	localStorage.removeItem('data');
	localStorage.removeItem('solutionId');
	alert("TODO: Implement reloadMetadataButton");
	onStartUp();
}

$('.solutionPick').click( function (element) {
	$('#solutionDropdown').html(element.target.text + ' <span class="caret"></span>');
}
);


