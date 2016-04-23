var data = [];
var finished = false;
var downloadMetadata = function() {	
	var index = 0;
	var lastEntity = "\\";

	function start() {
		alert("Start Downloading Data")
		SDK.Metadata.RetrieveAllEntities(SDK.Metadata.EntityFilters.Entity,
    	false,
    	successRetrieveAllEntities,
    	errorRetrieveAllEntities);
	}

	function errorRetrieveAllEntities(error){
		alert("Could not retrive all entities, error=" + error);
	}

	function successRetrieveAllEntities(entityMetadataCollection) {
		lastEntity = entityMetadataCollection[entityMetadataCollection.length - 1].LogicalName
		for (var i = 0; i < entityMetadataCollection.length; i++) {
		    SDK.Metadata.RetrieveEntity(SDK.Metadata.EntityFilters.Attributes,
	    		entityMetadataCollection[i].LogicalName,
	    		null,
			    false,	
			    successRetrieveEntity,
			    errorRetrieveEntity);	   
   		}
	}

	function errorRetrieveEntity(error) {
		alert("Could not recieve entitie, error=" + error)
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

	function addToDataList(entityData, attribute){
		data.push({
			id:index, 
			entitySchemaName:entityData.SchemaName,
			entityLogicalName:entityData.LogicalName,
			attributeSchemaName:attribute.SchemaName,
			attributeLogicalName:attribute.LogicalName,
		});
		index = index + 1;
	}

	start();

};
