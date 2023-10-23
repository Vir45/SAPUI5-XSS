sap.ui.define(["sap/ui/core/Control", "sap/base/security/URLListValidator"], (Control, URLListValidator) => {
    "use strict";

    const DEFURL = "https://sapui5.hana.ondemand.com/resources/sap/ui/documentation/sdk/images/logo_ui5.png";
    URLListValidator.add("https", "sapui5.hana.ondemand.com");

    return Control.extend("security.demo.securityDemo.control.CustomLogo", {
        metadata: {
            properties: {
                src: {
                    type: "string",
                    defaultValue: DEFURL,
                },
            },
        },

        setSrc(sValue) {
            const isAllowedUrl = URLListValidator.validate(sValue);
            sValue = sValue ? sValue : DEFURL;
            this.setProperty("src", sValue, true);
            // isAllowedUrl && this.setProperty("src", sValue, true);
            this.invalidate();
            return this;
        },

        renderer: {
            render: function (rm, control) {
                rm.write("<div");
                rm.writeControlData(control);
                rm.addClass("custom-logo");
                rm.writeClasses();
                rm.write(">");
                rm.write('<img src="');
                rm.write(control.getSrc());
                // rm.writeEscaped(control.getSrc());
                rm.write('" style="height: 100%" />');

                // rm.openStart("div", control);
                // rm.class("custom-logo");
                // rm.openEnd();
                // rm.openStart("img");
                // rm.attr("src", control.getSrc());
                // rm.style("height", "100%");
                // rm.openEnd();
                // rm.close("img");
                // rm.close("div");
            },
        },
    });
});
