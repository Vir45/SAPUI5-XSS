/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/f/FlexibleColumnLayoutSemanticHelper", "sap/f/library"],
    function (UIComponent, JSONModel, FlexibleColumnLayoutSemanticHelper, library) {
        "use strict";

        return UIComponent.extend("security.demo.securityDemo.Component", {
            metadata: {
                manifest: "json",
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);
                this.oLayoutModel = new JSONModel();
                this.setModel(this.oLayoutModel, "layout");

                // enable routing
                const oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();
            },

            getHelper: function () {
                return this._getFcl().then(function (oFCL) {
                    const oSettings = {
                        defaultTwoColumnLayoutType: library.LayoutType.TwoColumnsMidExpanded,
                        initialColumnsCount: 1,
                    };
                    return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
                });
            },

            _onBeforeRouteMatched(oEvent) {
                const sLayout = oEvent.getParameters().arguments.layout;

                // If there is no layout parameter, set a default layout (normally OneColumn)
                if (!sLayout) {
                    this.getHelper().then((oHelper) => {
                        const oNextUIState = oHelper.getNextUIState(0);
                        this.oLayoutModel.setProperty("/layout", oNextUIState.layout);
                    });
                    return;
                }

                this.oLayoutModel.setProperty("/layout", sLayout);
            },

            _getFcl: function () {
                return new Promise(
                    function (resolve) {
                        const oFCL = this.getRootControl().byId("flexibleColumnLayout");
                        if (!oFCL) {
                            this.getRootControl().attachAfterInit(function (oEvent) {
                                resolve(oEvent.getSource().byId("flexibleColumnLayout"));
                            }, this);
                            return;
                        }
                        resolve(oFCL);
                    }.bind(this),
                );
            },
        });
    },
);
