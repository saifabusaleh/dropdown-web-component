const template = document.createElement("template")


// dropdown template used from https://www.w3schools.com/howto/howto_css_dropdown.asp

template.innerHTML = `
<style>

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }
  

  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {background-color: #ddd;}
  
  .dropdown:hover .dropdown-content {display: block;}
  
  .dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>
<div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">

  </div>
</div>
    `;

class DropdownList extends HTMLElement {

  constructor() {
    super();
    // Attach a shadow root to the element.
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    //Add click event listener to dropdown menu
    this.dropdownContentEle = this.shadowRoot.querySelector('.dropdown-content');
    this.dropdownContentEle.addEventListener('click', this._onListItemClick);

    // initialize dropdown items array
    this._items = [];
  }
  set items(value) {
    this._items = value;
    this._renderList();
  }

  get items() {
    return this._items;
  }

  //Called every time the element is removed from the DOM.
  disconnectedCallback() {
    this.dropdownContentEle.removeEventListener('click', this._onListItemClick);
  }

  _renderList() {
    this.dropdownContentEle.innerHTML = "";
    this.items.forEach((item) => {
      this._appendItemToDropdownList(item);
    })
  }

  _appendItemToDropdownList(text) {
    const anchor = document.createElement('a');
    anchor.innerHTML = text;
    this.dropdownContentEle.appendChild(anchor);
  }

  _onListItemClick(e) {
    this.dispatchEvent(new CustomEvent('selectionChange', {
      composed: true,
      detail: e.target.innerHTML
    }));
  }

}

customElements.define("dropdown-list", DropdownList);


// Code for usage of drop-down list web component

const dropdownEle = document.querySelector("dropdown-list");
const selectedItemValueEle = document.querySelector("span");

let selectedItem;
dropdownEle.addEventListener('selectionChange', (e) => {
  //reads the selected value from selectionChange event
  selectedItem = e.detail;
  selectedItemValueEle.innerHTML = selectedItem;
});


//assign to the dropdown numberic values

dropdownEle.items = [1, 2, 3];

//override the values to string values

dropdownEle.items = ['a', 'b', 'c'];