(function () {
	onStartUp();

	function onStartUp() {
		$('#waiting').hide();
		if (hasValidCache()){
			// Load second view
			$('#firstTime').show();
			$('#secondTime').hide();
		}
		else {
			// Load first start view
			$('#firstTime').hide();
			$('#secondTime').show();
		}
		// wire up buttons
		$()
	}

	function hasValidCache(){
		return true;
		if (localStorage.solutionId && localStorage.data){
			return true;
		}
		return false;
	}


//var data = JSON.parse(localStorage.data); if not defined ...

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


})();


function publishSolution(){
	alert("TODO: Implement publishSolution");
}


function downloadMetadataButton(){
	$('#waiting').show();
	alert("TODO: Implement Download Metadata Button");
}

function reloadMetadataButton(){
	alert("TODO: Implement reloadMetadataButton");
}


$('.solutionPick').click( function (element) {console.log(element.target);} );