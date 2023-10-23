sap.ui.define(["sap/ui/core/mvc/Controller"], function (BaseController) {
    "use strict";

    return BaseController.extend("security.demo.securityDemo.controller.App", {
        onInit: function () {
            this.oOwnerComponent = this.getOwnerComponent();
            this.oRouter = this.oOwnerComponent.getRouter();
            this.oRouter.attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            const sRouteName = oEvent.getParameter("name");
            const oArguments = oEvent.getParameter("arguments");
            this._updateUIElements();

            this.currentRouteName = sRouteName;
            this.currentProduct = oArguments.product;
        },

        onStateChanged: function (oEvent) {
            const bIsNavigationArrow = oEvent.getParameter("isNavigationArrow");
            const sLayout = oEvent.getParameter("layout");
            this._updateUIElements();

            if (bIsNavigationArrow) {
                this.oRouter.navTo(this.currentRouteName, { layout: sLayout, product: this.currentProduct }, true);
            }
        },

        _updateUIElements: function () {
            this.oOwnerComponent.getHelper().then((oHelper) => {
                this.oOwnerComponent.getModel("layout").setData(oHelper.getCurrentUIState());
            });
        },

        onExit: function () {
            this.oRouter.detachRouteMatched(this.onRouteMatched, this);
        },
    });
});
