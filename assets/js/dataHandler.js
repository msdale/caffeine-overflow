var shopperAddr = "";
var itemDesc = "";
var shoppingList = {"Target": [], "Walmart": []};
localStorage.clear();
localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

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
  console.log("DRIVE TO TARGET LOCATION");
  console.log(jsonDrivingDistanceToTarget);
  console.log("*********************************");
  var targetHeaderEl = document.querySelector("#target-info");
  var targetAddressEl = document.createElement("p");
  targetAddressEl.textContent = jsonTargetLocation.address + ", " + jsonTargetLocation.city + " " + jsonTargetLocation.state + ", " + jsonTargetLocation.zipCode;
  targetHeaderEl.appendChild(targetAddressEl);
  var targetMilesEl = document.createElement("p");
  targetMilesEl.textContent = jsonDrivingDistanceToTarget.distanceInMiles;
  targetHeaderEl.appendChild(targetMilesEl);
  var targetAvgDriveTimeEl = document.createElement("p");
  targetAvgDriveTimeEl.textContent = jsonDrivingDistanceToTarget.avgTimeInMinutes;
  targetHeaderEl.appendChild(targetAvgDriveTimeEl);
  var targetTrafficDriveTimeEl = document.createElement("p");
  targetTrafficDriveTimeEl.textContent = jsonDrivingDistanceToTarget.trafficTimeInMinutes;
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
  var walmartAddressEl = document.createElement("p");
  walmartAddressEl.textContent = jsonWalmartLocation.address + ", " + jsonWalmartLocation.city + " " + jsonWalmartLocation.state + ", " + jsonWalmartLocation.zipCode;
  walmartHeaderEl.appendChild(walmartAddressEl);
  var walmartMilesEl = document.createElement("p");
  walmartMilesEl.textContent = jsonDrivingDistanceToWalmart.distanceInMiles;
  walmartHeaderEl.appendChild(walmartMilesEl);
  var walmartAvgDriveTimeEl = document.createElement("p");
  walmartAvgDriveTimeEl.textContent = jsonDrivingDistanceToWalmart.avgTimeInMinutes;
  walmartHeaderEl.appendChild(walmartAvgDriveTimeEl);
  var walmartTrafficDriveTimeEl = document.createElement("p");
  walmartTrafficDriveTimeEl.textContent = jsonDrivingDistanceToWalmart.trafficTimeInMinutes;
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
  for (var i = 0; i < jsonTargetItemList.items.length; i++) {
    // image
    var itemEl = document.createElement("li");
    itemEl.innerHTML = '<image src="' + jsonTargetItemList.items[i].image + '" alt="Placeholder image">';

    // description
    var itemDescEl = document.createElement("p");
    itemDescEl.textContent = jsonTargetItemList.items[i].description.title;
    itemEl.appendChild(itemDescEl);

    // price
    var itemPriceEl = document.createElement("p");
    itemPriceEl.textContent = jsonTargetItemList.items[i].formattedPrice;
    itemEl.appendChild(itemPriceEl);

    // button
    var itemButtonEl = document.createElement("button");
    itemButtonEl.textContent = "Add To Shopping List";
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
  for (var i = 0; i < jsonWalmartItemList.items.length; i++) {
    // image
    var itemEl = document.createElement("li");
    itemEl.innerHTML = '<image src="' + jsonWalmartItemList.items[i].image + '" alt="Placeholder image">';

    // description
    var itemDescEl = document.createElement("p");
    itemDescEl.textContent = jsonWalmartItemList.items[i].description;
    itemEl.appendChild(itemDescEl);

    // price
    var itemPriceEl = document.createElement("p");
    itemPriceEl.textContent = jsonWalmartItemList.items[i].foramattedPrice;
    itemEl.appendChild(itemPriceEl);

    // button
    var itemButtonEl = document.createElement("button");
    itemButtonEl.textContent = "Add To Shopping List";
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
  parentEl = event.target.parentElement;
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.Target.push({"description": parentEl.children[1].textContent, "image": parentEl.children[0], "formattedPrice": parentEl.children[2].textContent});
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
};

var saveWalmartItem = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  parentEl = event.target.parentElement;
  shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  shoppingList.Walmart.push({"description": parentEl.children[1].textContent, "image": parentEl.children[0], "formattedPrice": parentEl.children[2].textContent});
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
};


var targetItemsEl = document.getElementById("target-items");
targetItemsEl.addEventListener("click", saveTargetItem);
var walmartItemsEl = document.getElementById("walmart-items");
walmartItemsEl.addEventListener("click", saveWalmartItem);


//var tryit = async function (shopperAddr, itemDesc) {
//  var target_location_id = await populateLocationElements(shopperAddr);
//  populateItemElements(target_location_id, itemDesc);
//};

