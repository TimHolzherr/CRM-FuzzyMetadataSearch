var data = [];
var finished = false;
var downloadMetadata = function() {	
	var index = 0;
	var lastEntity = "\\";

	function start() {
		alert("Start Downloading Data")
		SDK.Metadata.RetrieveAllEntities(SDK.Metadata.EntityFilters.Attributes,
    	false,
    	successRetrieveAllEntities,
    	errorRetrieveAllEntities);
	}

	function errorRetrieveAllEntities(error){
		alert("Could not retrive all entities, error=" + error);
	}

	function successRetrieveAllEntities(entityMetadataCollection) {
		for (var i = 0; i < entityMetadataCollection.length; i++) {
		    var entity = entityMetadataCollection[i];
		    debugger;
		    if (!entity.IsCustomizable.Value){
		    	continue;
		    }		    
		    addToDataList(entity, {SchemaName:'New Attribute', MetadataId:'', DisplayName:{UserLocalizedLabel:{Label:'New Attribute'}}});
		    for (var j = 0; j < entity.Attributes.length; j++){
		    	var attribute = entity.Attributes[j];
		    	if (!attribute.IsCustomizable.Value || attribute.AttributeOf != null){
		    		continue;
		    	}
		    	addToDataList(entity, attribute);		    			    
		    }
   		}
   		localStorage.data = JSON.stringify(data);
	    localStorage.solutionId = 'fd140aaf-4df4-11dd-bd17-0019b9312238';
	    onStartUp();
	}
	

	function successRetrieveEntity(entityMetadata){
		for (var i = 0; i < entityMetadata.Attributes.length; i++) {
		    var attribute = entityMetadata.Attributes[i];
		    addToDataList(entityMetadata, attribute);		   		 
   		}
   		// 
   		if (entityMetadata.LogicalName === lastEntity){
   			alert("downloaded all Metadata")
   			localStorage.data = JSON.stringify(data);
   		}
	}

	function addToDataList(entity, attribute){
		data.push({
			id:index, 
			entitySchemaName:entity.SchemaName,
			entityId:entity.MetadataId,
			entityName:entity.DisplayName.UserLocalizedLabel == null ? "null" : removeAccent(entity.DisplayName.UserLocalizedLabel.Label),
			attributeSchemaName:attribute.SchemaName,
			attributeId:attribute.MetadataId,
			attributeName:attribute.DisplayName.UserLocalizedLabel == null ? "null" : removeAccent(attribute.DisplayName.UserLocalizedLabel.Label),
		});
		index = index + 1;
	}

	function removeAccent(string){
		if (string == null){
			return "";
		}
		return string.replace("'", "").replace("\n", "") 	
	}

	start();

};
