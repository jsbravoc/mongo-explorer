/*!
 * @author Juan Sebastián Bravo <js.bravo@uniandes.edu.co>
 * Fecha 03/05/2020
 * Javascript used on index.hbs. Contains functions related to MongoDB Collections CRUD.
 */

//#region constants variables

//#region modals
/**
 * @constant deleteModal 
 * @type {object}
 * @default
 * Constant pointer to DOM delete modal.
 */
const deleteModal = document.querySelector("#deleteModal");

/**
 * @constant deleteModalJS 
 * @type {object}
 * @default
 * Bootstrap Native modal initialization to @constant deleteModal. 
 * Used to avoid JQuery usage as recommended by John Guerra.
 */
// eslint-disable-next-line no-undef
const deleteModalJS = new Modal(deleteModal);


/**
 * @constant editModal 
 * @type {object}
 * @default
 * Constant pointer to DOM edit modal.
 */
const editModal = document.querySelector("#editModal");

/**
 * @constant editModallJS 
 * @type {object}
 * @default
 * Bootstrap Native modal initialization to @constant editModal. 
 * Used to avoid JQuery usage as recommended by John Guerra.
 */
// eslint-disable-next-line no-undef
const editModallJS = new Modal(editModal);

/**
 * @constant createModal 
 * @type {object}
 * @default
 * Constant pointer to DOM create modal.
 */
const createModal = document.querySelector("#createModal");

/**
 * @constant createModalJS 
 * @type {object}
 * @default
 * Bootstrap Native modal initialization to @constant createModal. 
 * Used to avoid JQuery usage as recommended by John Guerra.
 */
// eslint-disable-next-line no-undef
const createModalJS = new Modal(createModal);

//#endregion modals


/**
 * @constant selectDatabase 
 * @type {object}
 * @default
 * Constant pointer to select input with id = selectDatabase
 */
const selectDatabase = document.querySelector("#selectDatabase");

/**
 * @constant tableDocuments 
 * @type {object}
 * @default
 * Constant pointer to the table that shows the documents of a collection.
 */
const tableDocuments = document.querySelector("#tableDocuments");

/**
 * @constant selectCollection 
 * @type {object}
 * @default
 * Constant pointer to select input with id = selectCollection
 */
const selectCollection = document.querySelector("#selectCollection");

//#endregion constants


/**
 * @constant updateCollections 
 * @type {function}
 * Loads collections based on which database is selected in @constant selectDatabase 
 * by accesing to its data endpoint.
 */
const updateCollections = () => {
  selectCollection.innerHTML = "";
  let database = selectDatabase.value;
  fetch(window.location.href + "/" + database + "/collections")
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        selectCollection.innerHTML += "<option value='" + element.name + "'>" + element.name + "</option>";
      });
    });
};


/**
 * @constant updateDocuments 
 * @type {function}
 * Loads collections based on which database is selected in @constant selectCollection 
 * by accesing to its data endpoint.
 */
const updateDocuments = () => {

  let database = selectDatabase.value;
  let collection = selectCollection.value;
  let tableHead = document.querySelector("#thead");
  let tableBody = document.querySelector("#tbody");
  let createButton = document.querySelector("#createDocument");
  createButton.style.display = "initial";
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  fetch(window.location.href + "/" + database + "/collections/" + collection)
    .then(response => response.json())
    .then(data => {
      let attributes = [];
      if (data && data[0]) {
        attributes = Object.getOwnPropertyNames(data[0]);
      } else {
        console.log("sin datos");
      }
      let newHead = tableDocuments.insertRow(0);
      tempHead = document.createElement("th");
      tempHead.innerHTML = "#";
      newHead.appendChild(tempHead);
      attributes.forEach(element => {
        let tempHead = document.createElement("th");
        tempHead.innerHTML = element;
        newHead.appendChild(tempHead);
      });
      let buttonHead = document.createElement("th");
      buttonHead.innerHTML = "Edit";
      newHead.appendChild(buttonHead);

      buttonHead = document.createElement("th");
      buttonHead.innerHTML = "Delete";
      newHead.appendChild(buttonHead);

      let countObjects = 1;
      data.forEach(element => {
        let newRow = tableDocuments.insertRow();
        newRow.setAttribute("scope", "row");
        newRow.className = "obj";
        let tempCell = document.createElement("td");
        tempCell.innerHTML = countObjects++;
        newRow.appendChild(tempCell);
        for (const key in element) {
          tempCell = document.createElement("td");
          tempCell.innerHTML = element[key];
          if (key == "_id")
            tempCell.className = "MongoDB_id";
          newRow.appendChild(tempCell);
        }

        let tempButtonRow = document.createElement("td");
        let tempButton = document.createElement("button");
        tempButton.className = "btn btn-light";
        tempButton.innerHTML += "<span class='fa fa-pencil'></span>";
        tempButton.onclick = function () {
          editDocument(this.closest(".obj").querySelector(".MongoDB_id").innerHTML);
        };
        tempButtonRow.appendChild(tempButton);
        newRow.appendChild(tempButtonRow);

        tempButtonRow = document.createElement("td");
        tempButton = document.createElement("button");
        tempButton.className = "btn btn-danger";
        tempButton.onclick = function () {
          deleteDocument(this.closest(".obj").querySelector(".MongoDB_id").innerHTML);
        };
        tempButton.innerHTML += "<span class='fa fa-trash'></span>";
        tempButtonRow.appendChild(tempButton);
        newRow.appendChild(tempButtonRow);
      });
    });
};


/**
 * @constant createDocument 
 * @type {function}
 * Loads a modal which allows the user to create a specific document.
 */
const createDocument = () => {
  let database = selectDatabase.value;
  let collection = selectCollection.value;
  let _id = document.querySelector(".obj > td.MongoDB_id").innerText;
  fetch(window.location.href + "/" + database + "/collections/" + collection + "/" + _id)
    .then(response => response.json())
    .then(object => {
      let modalBody = document.querySelector("#createModalBody");
      for (const key in object) {
        if (key == "_id")
          continue;
        let tempFormGroup = document.createElement("div");
        tempFormGroup.className = "row form-group";
        let tempRowLabel = document.createElement("div");
        tempRowLabel.className = "col-md-4";
        let tempLabel = document.createElement("label");
        tempLabel.setAttribute("for", key);
        tempLabel.className = "control-label";
        tempLabel.innerHTML = key;
        let tempInput = document.createElement("input");
        let tempRowInput = document.createElement("div");
        tempRowInput.className = "col-md-8";
        tempInput.name = key;
        tempInput.setAttribute("type", "text");
        tempInput.setAttribute("placeholder", "Please set the " + key);
        tempInput.className = "form-control";
        tempRowInput.appendChild(tempInput);
        tempRowLabel.appendChild(tempLabel);
        tempFormGroup.appendChild(tempRowLabel);
        tempFormGroup.appendChild(tempRowInput);
        modalBody.appendChild(tempFormGroup);
      }
    });
  let createForm = document.querySelector("#createDocumentForm");
  createForm.setAttribute("action", window.location.href + "/" + database + "/collections/" + collection + "/create/");
  createModalJS.show();
};


/**
 * @constant editDocument 
 * @type {function}
 * Loads a modal which allows the user to edit a specific document.
 * @param {string} _id The _id of the document to edit.
 */
const editDocument = (_id) => {
  if (!_id || !(_id instanceof String)) {
    new Error("The _id of the document cannot be: " + _id);
  }
  let database = selectDatabase.value;
  let collection = selectCollection.value;
  fetch(window.location.href + "/" + database + "/collections/" + collection + "/" + _id)
    .then(response => response.json())
    .then(object => {
      let modalBody = document.querySelector("#editModalBody");
      for (const key in object) {
        let tempFormGroup = document.createElement("div");
        tempFormGroup.className = "row form-group";
        let tempRowLabel = document.createElement("div");
        tempRowLabel.className = "col-md-4";
        let tempLabel = document.createElement("label");
        tempLabel.setAttribute("for", key);
        tempLabel.className = "control-label";
        tempLabel.innerHTML = key;
        let tempInput = document.createElement("input");
        let tempRowInput = document.createElement("div");
        tempRowInput.className = "col-md-8";
        tempInput.name = key;
        tempInput.value = object[key];
        tempInput.setAttribute("type", "text");
        tempInput.setAttribute("placeholder", "Please set the " + key);
        tempInput.className = "form-control";
        if (key == "_id")
          tempInput.setAttribute("disabled", "true");
        tempRowInput.appendChild(tempInput);
        tempRowLabel.appendChild(tempLabel);
        tempFormGroup.appendChild(tempRowLabel);
        tempFormGroup.appendChild(tempRowInput);
        modalBody.appendChild(tempFormGroup);
      }
    });
  let updateForm = document.querySelector("#editDocumentForm");
  updateForm.setAttribute("action", window.location.href + "/" + database + "/collections/" + collection + "/update/" + _id);
  editModallJS.show();
};

/**
 * @constant deleteDocument 
 * @type {function}
 * Loads @constant deleteModal modal to confirm if a user wants to delete a document, using Bootstrap Native.
 * @param {string} _id The _id of the document to edit.
 */
const deleteDocument = (_id) => {
  if (!_id || !(_id instanceof String)) {
    new Error("The _id of the document cannot be: " + _id);
  }
  let deleteForm = document.querySelector("#deleteDocumentForm");
  let database = selectDatabase.value;
  let collection = selectCollection.value;
  deleteForm.setAttribute("action", window.location.href + "/" + database + "/collections/" + collection + "/delete/" + _id);
  deleteModalJS.show();
};

/**
 * @constant changeURI 
 * @type {function}
 * Redirects the user to the same page, loading the new database URI.
 */
const changeURI = () => {
  let updateURIForm = document.querySelector("#updateURIForm");
  if (updateURIForm.reportValidity()) {
    let databaseURI = document.querySelector("#databaseURI").value;
    updateURIForm.setAttribute("action", "/" + encodeURIComponent(databaseURI));
    updateURIForm.submit();
  }
};


/**
 * Updates the collection based on input @constant selectDatabase.
 * @listens change in input.
 */
selectDatabase.addEventListener("change", updateCollections);

/**
 * Updates the documents based on input @constant selectCollection.
 * @listens change in input.
 */
selectCollection.addEventListener("change", updateDocuments);