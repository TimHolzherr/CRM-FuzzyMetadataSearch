function findSolutions(){ 
    $.ajax({

    type: "GET",

    contentType: "application/json; charset=utf-8",

    datatype: "json",

    url:  GetGlobalContext().getClientUrl() + "/XRMServices/2011/OrganizationData.svc/SolutionSet?$select=FriendlyName,SolutionId&$filter=IsVisible eq true",

    beforeSend: function (XMLHttpRequest) {

        XMLHttpRequest.setRequestHeader("Accept", "application/json");

    },

    async: true,

    success: function (data, textStatus, xhr) {

        var results = data.d.results;

   for (var i = 0; i < results.length; i++) {
        $('#solutionDrowdownContent').append('<li id="' + results[i].SolutionId + '"><a class="solutionPick">' + results[i].FriendlyName +'</a></li>');        
   }
   $('.solutionPick').click( function (element) {
        $('#solutionDropdown').html(element.target.text + ' <span class="caret"></span>');
        localStorage.solutionId = element.target.parentElement.id
        $('#DownloadMetadataButton').prop( "disabled", false );
    });


    },

    error: function (xhr, textStatus, errorThrown) {

        alert(textStatus + " " + errorThrown);

    }

});
}