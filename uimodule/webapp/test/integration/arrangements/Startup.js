sap.ui.define([
    "sap/ui/test/Opa5"
], function (Opa5) {
    "use strict";

    return Opa5.extend("security.demo.securityDemo.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "security.demo.securityDemo",
                    async: true,
                    manifest: true
                }
            });
        }
    });

});
