var shopperAddr = "";
var itemDesc = "";

var populateLocationElements = async function (_inputAddress) {
  var addrArray = _inputAddress.split(" "); 
  var zipCode = addrArray[addrArray.length-1];

  /*
   * Target Data
   */
  var jsonTargetLocation = await targetLocator(zipCode,"20");

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

var getshopperaddr = async function(){
  var shopperAddrEl = document.getElementById("address-input");
  var addr = shopperAddrEl.value;
  var location_id = await populateLocationElements (addr);

}
//tryit(shopperAddr, itemDesc);
var enterBtn = document.getElementById("enter-button");
enterBtn.addEventListener("click",getshopperaddr);

var populateItemElements = async function (location_id, _itemDesc) {

  /*
   * Target Data
   */
  var jsonItemList = await targetProductLocator(location_id, _itemDesc);

  // HERE"S WHERE YOU POPULATE THE PAGE WITH TARGET DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("TARGET PRODUCT LIST");
  console.log(jsonItemList);
  console.log("*********************************");

  /*
   * Walmart Data
   */
  var jsonItemList = await walmartProductLocator(_itemDesc);

  // HERE"S WHERE YOU POPULATE THE PAGE WITH WALMART DATA
  console.log("READY TO POPULATE ON THE PAGE");
  console.log("WALMART PRODUCT LIST");
  console.log(jsonItemList);
  console.log("*********************************");
};

var tryit = async function (shopperAddr, itemDesc) {
  var target_location_id = await populateLocationElements(shopperAddr);
  populateItemElements(target_location_id, itemDesc);
};

