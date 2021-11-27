var shopperAddr = "4400 Baptist Island Road, Groveland Fl, 34736";
console.log("SHOPPER ADDRESS: " + shopperAddr);
var itemDesc = "Fresh Bananas";
console.log("ITEM DESCRIPTION: " + itemDesc);
console.log("*********************************");

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

  return jsonTargetLocation.location_id; // need for target item lookup
};

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

tryit(shopperAddr, itemDesc);
