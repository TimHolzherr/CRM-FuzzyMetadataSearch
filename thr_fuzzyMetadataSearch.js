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
								
