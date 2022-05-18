sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {

		onSearch : function () {
			// read msg from i18n model
			var sRecipient = this.getView().getModel().getProperty("/recipient/code");
			var token = this.getView().getModel().getProperty("/recipient/token");
			var oData;
			jQuery.ajax({
				type: "POST",
				async: false,
				url: "https://cfrdev01-dev-zfitmp02-api-miao.cfapps.jp20.hana.ondemand.com/rfc/getUntrSlip",
				contentType: "application/json",
				headers: {'Authorization': 'Bearer ' + token},
				data: JSON.stringify({
					"bukrs": sRecipient,
					"gjahr": "2022",
					"slipNum": []
				}),
				success: function(data) {
					oData = data.belnr2;
				}
			});
			this.getView().getModel("invoice").setProperty("/Invoices",oData);
			console.log(this.getView().getModel().getProperty("/Invoices"));
		},

		onOpenDialog : function () {
			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.walkthrough.view.HelloDialog"
				});
			}

			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

		onCloseDialog : function () {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog").close();
		}
	});

});