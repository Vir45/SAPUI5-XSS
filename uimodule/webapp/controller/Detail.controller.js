sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "sap/ui/richtexteditor/RichTextEditor"], function (Controller, JSONModel, RichTextEditor) {
    "use strict";

    // <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAAAwAB/evZ4QAAAABJRU5ErkJggg==" onload="alert('You have been hacked &#128518;')" />
    return Controller.extend("security.demo.securityDemo.controller.Detail", {
        onInit: function () {
            const ownerComponent = this.getOwnerComponent();
            this.router = ownerComponent.getRouter();
            this.layoutModel = ownerComponent.getModel("layout");
            this.productModel = ownerComponent.getModel("products");
            this.router.getRoute("master").attachPatternMatched(this._onProductMatched, this);
            this.router.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
            this.draftModel = new JSONModel(this._createDraftModelData());
            this.setModel(this.draftModel, "draftModel");
            this._addRichTextEditor();
        },

        _addRichTextEditor() {
            const container = this.getById("editorContainer");
            container.addItem(this._createEditor());
        },

        _createEditor() {
            const editor = new RichTextEditor("myRTE1", {
                width: "100%",
                height: "200px",
                tooltip: "My RTE Tooltip",
                sanitizeValue: false,
            });
            editor.addPlugin("code");
            editor.addButtonGroup("code");
            editor.attachBeforeEditorInit(function (event) {
                const config = event.getParameter("configuration");
                config.extended_valid_elements = "img[src|alt|title|onerror|onload]";
            });
            editor.attachChange(this.onEditorChanges.bind(this));
            return editor;
        },

        onEditorChanges(oEvent) {
            const value = oEvent.getParameters().newValue;
            this.draftModel.setProperty("/Description", value);
        },

        _onProductMatched(oEvent) {
            this._product = oEvent.getParameter("arguments").product || this._product || "0";
            const isDraft = !isFinite(oEvent.getParameter("arguments").product);
            this.draftModel.setProperty("/isDraft", isDraft);
            if (isDraft) {
                const query = oEvent.getParameter("arguments")["?query"];
                query.type && this.draftModel.setProperty("/Type", decodeURIComponent(query.type));
            } else {
                this.getView().bindElement({
                    path: `/ProductCollection/${this._product}`,
                    model: "products",
                });
            }
        },

        onEditToggleButtonPress() {
            this.draftModel.setProperty("/isDraft", true);
        },

        handleFullScreen: function () {
            const nextLayout = this.layoutModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.router.navTo("detail", { layout: nextLayout, product: this._product });
        },

        handleExitFullScreen: function () {
            const nextLayout = this.layoutModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            this.router.navTo("detail", { layout: nextLayout, product: this._product });
        },

        handleClose: function () {
            const nextLayout = this.layoutModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
            this.router.navTo("master", { layout: nextLayout });
        },

        onCancelChanges() {
            this.handleClose();
        },

        onSaveChanges() {
            this.handleClose();
            const productCollections = this.productModel.getData().ProductCollection;
            const draftObject = this.draftModel.getData();
            productCollections.push(draftObject);
            this.productModel.setProperty("/ProductCollection", productCollections);
        },

        onExit() {
            this.router.getRoute("master").detachPatternMatched(this._onProductMatched, this);
            this.router.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
        },

        _createDraftModelData() {
            return {
                isDraft: false,
                Type: "Draft",
                ProductId: "HT-1033",
                Category: "Laptops",
                MainCategory: "Computer Systems",
                TaxTarifCode: "1",
                SupplierName: "",
                Description: "",
                Name: "New Product",
                Status: "Available",
                logo: "https://sapui5.hana.ondemand.com/resources/sap/ui/documentation/sdk/images/logo_ui5.png",
            };
        },
    });
});
