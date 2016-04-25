onStartUp();

function onStartUp() {
	$('#waiting').hide();
	if (hasValidCache()){
		// Load second view
		$('#firstTime').hide();
		$('#secondTime').show();
		data = JSON.parse(localStorage.data);

		$fuzzyAttributes = $('#fuzzyAttributes').selectize({
					    onChange: onChangeFuzzyAttributes,
						valueField: 'id',    					
    					searchField: ['enitySchemaName', 'attributeSchemaName', 'EntityName', 'attributeName'],
						options: data,
						render: {
							option: function(item, escape){
								return renderTemplate.replace('{entitySchema}', item.enitySchemaName)
													 .replace('{attrSchema}', item.attributeSchemaName)
													 .replace('{entityLabel}', item.EntityName)
													 .replace('{attrLabel}', item.attributeName)								 
								}
							}						
						});
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
		serverUlr = 'https://timholzherr.crm4.dynamics.com'
		if (value === "") {
		return;
		}
		var d = data[value];
		var url = url =  serverUlr + '/tools/systemcustomization/attributes/manageAttribute.aspx?appSolutionId=%7b' 
		+ localStorage.solutionId + 
		'%7d' +
		'&entityId=%7b' +
		d.entityId +
		'%7d';
		;
		if (d.attributeId !== ""){		
			url = url + '&attributeId=%7b' + d.attributeId  + '%7d';
		} 		
		var win = window.open(url, '_blank');
	  	win.focus();
	  	//$fuzzyAttributes.selectize()[0].setValue("");// selectize.setValue(1, true)
	  	$(this)[0].setValue("");
	}

	var renderTemplate = 
		"<div>\
			<B>{entitySchema}:</B>  {attrSchema} <br>\
			<small><B>{entityLabel}:</B> {attrLabel}</small> \
		</div>"


}


function publishSolution(){
	alert("TODO: Implement publishSolution");
}


function downloadMetadataButton(){
	$('#waiting').show();
	localStorage.data = "data"
	localStorage.solutionId = "solutionId"
	downloadMetadata();
}

function reloadMetadataButton(){
	localStorage.removeItem('data');
	localStorage.removeItem('solutionId');	
	onStartUp();
}

$('.solutionPick').click( function (element) {
	$('#solutionDropdown').html(element.target.text + ' <span class="caret"></span>');
}
);


