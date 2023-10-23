sap.ui.define(["./BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("security.demo.securityDemo.controller.Master", {
        onInit: function () {
            this.Router = this.getOwnerComponent().getRouter();
        },

        onListItemPress(oEvent) {
            const productPath = oEvent.getSource().getBindingContext("products").getPath();
            const product = productPath.split("/").slice(-1).pop();
            this._navigateToDetail(product);
        },

        onAdd() {
            this._navigateToDetail("draft");
        },

        _navigateToDetail(product) {
            this.getOwnerComponent()
                .getHelper()
                .then((oHelper) => {
                    const oNextUIState = oHelper.getNextUIState(1);
                    this.Router.navTo("detail", {
                        layout: oNextUIState.layout,
                        product: product,
                        query: {
                            type: "draft",
                        },
                    });
                });
        },
    });
});
