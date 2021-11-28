var shopperAddr = "";
var itemDesc = "";
var shoppingList = {"Target": [], "Walmart": []};
localStorage.clear();
localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

var removeAllChildNodes = function (parent) {
  if (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

var populateLocationElements = async function (_inputAddress) {
  var addrArray = _inputAddress.split(" ");
  var zipCode = addrArray[addrArray.length - 1];

  /*
   * Target Data
   */
  var jsonTargetLocation = await targetLocator(zipCode, "20");

  // need for driving distance calculator
  var targetAddr = await jsonTargetLocation.address + ", " + jsonTargetLocation.city + " " + jsonTargetLocation.state + ", " + jsonTargetLocation.zipCode;

  var jsonDrivingDistanceToTarget = await drivingDistance(_inputAddress, targetAddr);

  // HERE"S WHERE YOU POPULATE THE PAGE WITH TARGET DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("TARGET LOCATION");
  console.log(jsonTargetLocation);
  console.log(jsonDrivingDistanceToTarget);
  console.log("*********************************");
  var targetHeaderEl = document.querySelector("#target-info");
  removeAllChildNodes(targetHeaderEl);
  var targetAddressEl = document.createElement("h2");
  targetAddressEl.textContent = "Store Address: " + jsonTargetLocation.address + ", " + jsonTargetLocation.city + " " + jsonTargetLocation.state + ", " + jsonTargetLocation.zipCode;
  targetHeaderEl.appendChild(targetAddressEl);
  var targetMilesEl = document.createElement("p");
  targetMilesEl.textContent = "Distance to Store: " + jsonDrivingDistanceToTarget.distanceInMiles + " Miles";
  targetHeaderEl.appendChild(targetMilesEl);
  var targetAvgDriveTimeEl = document.createElement("p");
  targetAvgDriveTimeEl.textContent = "Average Time: " + jsonDrivingDistanceToTarget.avgTimeInMinutes + " Min";
  targetHeaderEl.appendChild(targetAvgDriveTimeEl);
  var targetTrafficDriveTimeEl = document.createElement("p");
  targetTrafficDriveTimeEl.textContent = "Current Traffic Time: " + jsonDrivingDistanceToTarget.trafficTimeInMinutes + " Min";
  targetHeaderEl.appendChild(targetTrafficDriveTimeEl);

  /*
   * Walmart Data
   */
  var jsonWalmartLocation = await walmartLocator(zipCode);

  // need for driving distance calculator
  var walmartAddr = await jsonWalmartLocation.address + ", " + jsonWalmartLocation.city + " " + jsonWalmartLocation.state + ", " + jsonWalmartLocation.zipCode;

  var jsonDrivingDistanceToWalmart = await drivingDistance(_inputAddress, walmartAddr);

  // HERE"S WHERE YOU POPULATE THE PAGE WITH WALMART DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("WALMART LOCATION");
  console.log(jsonWalmartLocation);
  console.log("DRIVE TO WALMART LOCATION");
  console.log(jsonDrivingDistanceToWalmart);
  console.log("*********************************");
  var walmartHeaderEl = document.querySelector("#walmart-info");
  removeAllChildNodes(walmartHeaderEl);
  var walmartAddressEl = document.createElement("h2");
  walmartAddressEl.textContent = "Store Address: " + jsonWalmartLocation.address + ", " + jsonWalmartLocation.city + " " + jsonWalmartLocation.state + ", " + jsonWalmartLocation.zipCode;
  walmartHeaderEl.appendChild(walmartAddressEl);
  var walmartMilesEl = document.createElement("p");
  walmartMilesEl.textContent = "Distance to Store: " +  jsonDrivingDistanceToWalmart.distanceInMiles + " Miles";
  walmartHeaderEl.appendChild(walmartMilesEl);
  var walmartAvgDriveTimeEl = document.createElement("p");
  walmartAvgDriveTimeEl.textContent = "Average Time: " + jsonDrivingDistanceToWalmart.avgTimeInMinutes + " Min";
  walmartHeaderEl.appendChild(walmartAvgDriveTimeEl);
  var walmartTrafficDriveTimeEl = document.createElement("p");
  walmartTrafficDriveTimeEl.textContent = "Current Traffic Time: " + jsonDrivingDistanceToWalmart.trafficTimeInMinutes + " Min";
  walmartHeaderEl.appendChild(walmartTrafficDriveTimeEl);


  return jsonTargetLocation.location_id; // need for target item lookup
};

var target_location_id = "";
var getshopperaddr = async function (event) {
  // prevent page from refreshing
  event.preventDefault();
  var shopperAddrEl = document.getElementById("address-input");
  var addr = shopperAddrEl.value;
  target_location_id = await populateLocationElements(addr);
};

var enterBtnEl = document.getElementById("enter-button");
enterBtnEl.addEventListener("click", getshopperaddr);

var populateItemElements = async function (location_id, _itemDesc) {
  // Target Data
  var jsonTargetItemList = await targetProductLocator(location_id, _itemDesc);

  var targetItemsList = document.getElementById("target-items");
  // HERE"S WHERE YOU POPULATE THE PAGE WITH TARGET DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("TARGET PRODUCT LIST");
  console.log(jsonTargetItemList);
  console.log("*********************************");
  var targetItemsEl = document.getElementById("target-items");
  removeAllChildNodes(targetItemsEl);
  for (var i = 0; i < jsonTargetItemList.items.length; i++) {
    // image
    var itemEl = document.createElement("li");
    itemEl.innerHTML = '<image src="' + jsonTargetItemList.items[i].image + '" alt="Placeholder image">';

    // description
    var itemDescEl = document.createElement("p");
    itemDescEl.textContent = jsonTargetItemList.items[i].description.title;
    itemEl.appendChild(itemDescEl);

    // price
    var itemPriceEl = document.createElement("h1");
    itemPriceEl.textContent = jsonTargetItemList.items[i].formattedPrice;
    itemEl.appendChild(itemPriceEl);

    // button
    var itemButtonEl = document.createElement("button");
    itemButtonEl.textContent = "Add To Shopping List";
    itemButtonEl.setAttribute("idx", i);
    itemEl.appendChild(itemButtonEl);

    targetItemsEl.appendChild(itemEl);
  }
  console.log(targetItemsEl);


  // Walmart Data
  var jsonWalmartItemList = await walmartProductLocator(_itemDesc);

  var walmartItemsList = document.getElementById("walmart-items");
  // HERE"S WHERE YOU POPULATE THE PAGE WITH WALMART DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("WALMART PRODUCT LIST");
  console.log(jsonWalmartItemList);
  console.log("*********************************");
  var walmartItemsEl = document.getElementById("walmart-items");
  removeAllChildNodes(walmartItemsEl);
  for (var i = 0; i < jsonWalmartItemList.items.length; i++) {
    // image
    var itemEl = document.createElement("li");
    itemEl.innerHTML = '<image src="' + jsonWalmartItemList.items[i].image + '" alt="Placeholder image">';

    // description
    var itemDescEl = document.createElement("p");
    itemDescEl.textContent = jsonWalmartItemList.items[i].description;
    itemEl.appendChild(itemDescEl);

    // price
    var itemPriceEl = document.createElement("h1");
    itemPriceEl.textContent = jsonWalmartItemList.items[i].foramattedPrice;
    itemEl.appendChild(itemPriceEl);

    // button
    var itemButtonEl = document.createElement("button");
    itemButtonEl.textContent = "Add To Shopping List";
    itemButtonEl.setAttribute("idx", i);
    itemEl.appendChild(itemButtonEl);

    walmartItemsEl.appendChild(itemEl);
  }
  console.log(walmartItemsEl);
};

var listItems = async function (event) {
  // prevent page from refreshing
  event.preventDefault();

  var itemDescEl = document.getElementById("item-desc");
  var itemDesc = itemDescEl.value;
  await populateItemElements(target_location_id, itemDesc);
};

var searchBtnEl = document.getElementById("search-button");
searchBtnEl.addEventListener("click", listItems);


var saveTargetItem = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  var index = event.target.getAttribute("idx");
  var targetItemListEl = document.querySelector("#target-items");
  console.log(targetItemListEl);
  var targetItemsEl = targetItemListEl.getElementsByTagName("li");
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.Target.push({"description": targetItemsEl[index].children[1].textContent, "formattedPrice": targetItemsEl[index].children[2].textContent});
  console.log(shoppingList);
  console.log(targetItemsEl[index].children[1].textContent);
  console.log(targetItemsEl[index].children[2].textContent);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
};

var saveWalmartItem = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  var index = event.target.getAttribute("idx");
  var walmartItemListEl = document.querySelector("#walmart-items");
  console.log(walmartItemListEl);
  var walmartItemsEl = walmartItemListEl.getElementsByTagName("li");
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.Walmart.push({"description": walmartItemsEl[index].children[1].textContent, "formattedPrice": walmartItemsEl[index].children[2].textContent});
  console.log(shoppingList);
  console.log(walmartItemsEl[index].children[1].textContent);
  console.log(walmartItemsEl[index].children[2].textContent);
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
};

var viewShoppingList = function(event) {
  // prevent page from refreshing
  event.preventDefault();
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

  // Target Shopping List
  var targetShoppingListEl = document.getElementById("target-shopping-list");
  removeAllChildNodes(targetShoppingListEl);
  var targetShoppingListTitleEl = document.createElement("p");
  targetShoppingListTitleEl.textContent = "Target Shopping List";
  targetShoppingListEl.appendChild(targetShoppingListTitleEl);
  for (var i = 0; i < shoppingList.Target.length; i++) {
    var itemEl = document.createElement("li");
    itemEl.textContent = shoppingList.Target[i].description + " --- " + shoppingList.Target[i].formattedPrice;  
    targetShoppingListEl.appendChild(itemEl);
  }

  // Walmart Shopping List
  var walmartShoppingListEl = document.getElementById("walmart-shopping-list");
  removeAllChildNodes(walmartShoppingListEl);
  var walmartShoppingListTitleEl = document.createElement("p");
  walmartShoppingListTitleEl.textContent = "Walmart Shopping List";
  walmartShoppingListEl.appendChild(walmartShoppingListTitleEl);
  for (var i = 0; i < shoppingList.Walmart.length; i++) {
    var itemEl = document.createElement("li");
    itemEl.textContent = shoppingList.Walmart[i].description + " --- " + shoppingList.Walmart[i].formattedPrice;  
    walmartShoppingListEl.appendChild(itemEl);
  }
}

var targetItemsEl = document.getElementById("target-items");
targetItemsEl.addEventListener("click", saveTargetItem);
var walmartItemsEl = document.getElementById("walmart-items");
walmartItemsEl.addEventListener("click", saveWalmartItem);
var viewListBtnEl = document.getElementById("view-list");
viewListBtnEl.addEventListener("click", viewShoppingList);


//var tryit = async function (shopperAddr, itemDesc) {
//  var target_location_id = await populateLocationElements(shopperAddr);
//  populateItemElements(target_location_id, itemDesc);
//};

