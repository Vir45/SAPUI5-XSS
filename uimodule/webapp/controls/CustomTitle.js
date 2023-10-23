sap.ui.define(["sap/ui/core/Control", "sap/base/security/encodeXML"], (Control, encodeXML) => {
    "use strict";

    return Control.extend("security.demo.securityDemo.control.CustomTitle", {
        metadata: {
            properties: {
                text: {
                    type: "string",
                    defaultValue: "",
                },
            },
        },

        setText(sValue) {
            this.setProperty("text", sValue, true);
            this._outPutText();
        },

        _outPutText() {
            const domRef = this.getDomRef();
            if (domRef) {
                // domRef.innerHTML = encodeXML(this.getText());
                domRef.innerHTML = this.getText();
            }
        },

        renderer: {
            render: function (rm, control) {
                rm.write("<h3");
                rm.writeControlData(control);
                rm.addClass("sapUiFromTitle");
                rm.addClass("sapUiFromTitleH3");
                rm.writeClasses();
                rm.write(">");
                rm.write(control.getText());
                // rm.writeEscaped(control.getText());

                //     rm.openStart("h3", control);
                //     rm.class("sapUiFromTitle");
                //     rm.class("sapUiFromTitleH3");
                //     rm.openEnd();
                //     rm.text(control.getText());
                //     rm.close("h3");
            },
        },
    });
});
