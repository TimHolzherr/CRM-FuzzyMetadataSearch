if (typeof (SDK) == "undefined")
   { SDK = { __namespace: true }; }
       //This will establish a more unique namespace for functions in this library. This will reduce the 
       // potential for functions to be overwritten due to a duplicate name when the library is loaded.
       SDK.PUBLISH = {
           _getServerUrl: function () {
               ///<summary>
               /// Returns the URL for the SOAP endpoint using the context information available in the form
               /// or HTML Web resource.
               ///</summary>
               var OrgServicePath = "/XRMServices/2011/Organization.svc/web";
               var serverUrl = "";
               if (typeof GetGlobalContext == "function") {
                   var context = GetGlobalContext();
                   serverUrl = context.getClientUrl();
               }
               else {
                   if (typeof Xrm.Page.context == "object") {
                         serverUrl = Xrm.Page.context.getClientUrl();
                   }
                   else
                   { throw new Error("Unable to access the server URL"); }
                   }
                  if (serverUrl.match(/\/$/)) {
                       serverUrl = serverUrl.substring(0, serverUrl.length - 1);
                   } 
                   return serverUrl + OrgServicePath;
               }, 
           PublishAllXmlRequest: function () {
               var requestMain = ""
               requestMain += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
               requestMain += "  <s:Body>";
               requestMain += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";
               requestMain += "      <request i:type=\"b:PublishAllXmlRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">";
               requestMain += "        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\" />";
               requestMain += "        <a:RequestId i:nil=\"true\" />";
               requestMain += "        <a:RequestName>PublishAllXml</a:RequestName>";
               requestMain += "      </request>";
               requestMain += "    </Execute>";
               requestMain += "  </s:Body>";
               requestMain += "</s:Envelope>";
               var req = new XMLHttpRequest();
               req.open("POST", SDK.PUBLISH._getServerUrl(), true)
               // Responses will return XML. It isn't possible to return JSON.
               req.setRequestHeader("Accept", "application/xml, text/xml, */*");
               req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
               req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
               var successCallback = null;
               var errorCallback = null;
               req.onreadystatechange = function () { SDK.PUBLISH.PublishAllXmlResponse(req, successCallback, errorCallback); };
               req.send(requestMain);
           },
       PublishAllXmlResponse: function (req, successCallback, errorCallback) {
               ///<summary>
               /// Recieves the assign response
               ///</summary>
               ///<param name="req" Type="XMLHttpRequest">
               /// The XMLHttpRequest response
               ///</param>
               ///<param name="successCallback" Type="Function">
               /// The function to perform when an successfult response is returned.
               /// For this message no data is returned so a success callback is not really necessary.
               ///</param>
               ///<param name="errorCallback" Type="Function">
               /// The function to perform when an error is returned.
               /// This function accepts a JScript error returned by the _getError function
               ///</param>
               if (req.readyState == 4) {
               if (req.status == 200) {
               //if (successCallback != null)
               //{ successCallback(); }
               $('#publishSpinner').hide();
               }
               else {
                   errorCallback(SDK.PUBLISH._getError(req.responseXML));
               }
           }
       },
       _getError: function (faultXml) {
           ///<summary>
           /// Parses the WCF fault returned in the event of an error.
           ///</summary>
           ///<param name="faultXml" Type="XML">
           /// The responseXML property of the XMLHttpRequest response.
           ///</param>
           var errorMessage = "Unknown Error (Unable to parse the fault)";
           if (typeof faultXml == "object") {
               try {
                   var bodyNode = faultXml.firstChild.firstChild;
                   //Retrieve the fault node
                   for (var i = 0; i < bodyNode.childNodes.length; i++) {
                       var node = bodyNode.childNodes[i];
                       //NOTE: This comparison does not handle the case where the XML namespace changes
                       if ("s:Fault" == node.nodeName) {
                       for (var j = 0; j < node.childNodes.length; j++) {
                           var faultStringNode = node.childNodes[j];
                           if ("faultstring" == faultStringNode.nodeName) {
                               errorMessage = faultStringNode.text;
                               break;
                           }
                       }
                       break;
                   }
               }
           }
           catch (e) { };
        }
        return new Error(errorMessage);
     },
 __namespace: true
};
