sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {

		metadata : {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			var token;
			jQuery.ajax({
				type: "POST",
				url: "https://zzyjpm3bc6vpbxdq.authentication.jp20.hana.ondemand.com/oauth/token?grant_type=client_credentials",
				contentType: "application/x-www-form-urlencoded",
				data: 'client_id=sb-na-7241840a-d668-448b-8f97-2f6bb0a9abe6!t326&client_secret=aHW13tPAQoL6wdpo5nBoif2nd5c=',

				async: false,
				success: function(data) {
					token = data.access_token;
				}
			})
			// set data model
			var oData = {
				recipient : {
					code : "",
					token : token,
					data : []
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
		}

	});

});