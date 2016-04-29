onStartUp();
findSolutions();

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
    					searchField: ['entitySchemaName', 'attributeSchemaName', 'entityName', 'attributeName'],
						options: data,
						maxOptions: 10,
						render: {
							option: function(item, escape){
								return renderTemplate.replace('{entitySchema}', item.entitySchemaName)
													 .replace('{attrSchema}', item.attributeSchemaName)
													 .replace('{entityLabel}', item.entityName)
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

	function hasValidCache(){
		if (localStorage.solutionId && localStorage.data){
			return true;
		}
		return false;
	}
	
	function onChangeFuzzyAttributes (value) {
		serverUlr = GetGlobalContext().getClientUrl();
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
	  	$(this)[0].setValue("");
	}

	var renderTemplate = 
		"<div>\
			<B>{entitySchema}:</B>  {attrSchema} <br>\
			<small><B>{entityLabel}:</B> {attrLabel}</small> \
		</div>"
}


function publishSolution(){
	SDK.PUBLISH.PublishAllXmlRequest();
	$('#publishSpinner').show();
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

$(".spinner").load('.\\lib_\\thr_spinner.html');

// Page Counter
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-77032343-1', 'auto');
  ga('send', 'pageview');



