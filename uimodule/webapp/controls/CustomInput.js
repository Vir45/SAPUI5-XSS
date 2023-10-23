sap.ui.define(["sap/ui/core/Control"], (Control) => {
    "use strict";

    return Control.extend("security.demo.securityDemo.control.CustomInput", {
        metadata: {
            properties: {
                value: {
                    type: "string",
                    defaultValue: "",
                },
            },
        },

        renderer: {
            render: function (rm, control) {
                rm.write("<div");
                rm.writeControlData(control);
                rm.addStyle("width", "100%");
                rm.addClass("sapMInputBaseContentWrapper");
                rm.addClass("sapUiTinyMarginTop");
                rm.writeStyles();
                rm.writeClasses();
                rm.write(">");
                rm.write("<input id='myCustomID' type='text'");
                rm.addClass("custom-input");
                rm.addClass("sapMInputBaseInner");
                rm.writeClasses();
                rm.write('value="');
                rm.write(control.getValue());
                // rm.writeEscaped(control.getValue());
                rm.write('"/>');

                // rm.openStart("div", control);
                // rm.style("width", "100%");
                // rm.class("sapMInputBaseContentWrapper");
                // rm.class("sapUiTinyMarginTop");
                // rm.openEnd();
                // rm.voidStart("input");
                // rm.class("custom-input");
                // rm.class("sapMInputBaseInner");
                // rm.attr("id", "myCustomID");
                // rm.attr("type", "text");
                // rm.attr("value", control.getValue());
                // rm.voidEnd();
                // rm.close("div");
            },
        },
    });
});
