var getAllData = async function (_inputAddress, _itemDesc) {
  var addrArray = _inputAddress.split(" "); 
  var zipCode = addrArray[addrArray.length-1];

  /*
   * Target Data
   */
  var jsonTargetLocation = await targetLocator(zipCode,"20");

  // need for driving distance calculator
  var targetAddr = await jsonTargetLocation.address + ", " + jsonTargetLocation.city + " " + jsonTargetLocation.state + ", " + jsonTargetLocation.zipCode;
  
  var jsonDrivingDistanceToTarget = await drivingDistance(_inputAddress, targetAddr);

  var jsonItemList = await targetProductLocator(jsonTargetLocation.location_id, _itemDesc);

  console.log("READY TO POPULATE ON THE PAGE");
  console.log("TARGET LOCATION");
  console.log(jsonTargetLocation);
  console.log("DRIVE TO TARGET LOCATION");
  console.log(jsonDrivingDistanceToTarget);
  console.log("TARGET PRODUCT LIST");
  console.log(jsonItemList);

  /*
   * Walmart Data
   */
  var jsonWalmartLocation = await walmartLocator(zipCode);

  // need for driving distance calculator
  var walmartAddr = await jsonWalmartLocation.address + ", " + jsonWalmartLocation.city + " " + jsonWalmartLocation.state + ", " + jsonWalmartLocation.zipCode;
  
  var jsonDrivingDistanceToWalmart = await drivingDistance(_inputAddress, walmartAddr);

  var jsonItemList = await walmartProductLocator(_itemDesc);

  console.log("READY TO POPULATE ON THE PAGE");
  console.log("WALMART LOCATION");
  console.log(jsonWalmartLocation);
  console.log("DRIVE TO WALMART LOCATION");
  console.log(jsonDrivingDistanceToWalmart);
  console.log("WALMART PRODUCT LIST");
  console.log(jsonItemList);
};

/*var getWalmartData = async function (_inputAddress) {
  var addrArray = _inputAddress.split(" "); 
  var zipCode = addrArray[addrArray.length-1];

  // need for driving distance calculator
  var walmartAddr = await jsonWalmartLocation.address + ", " + jsonWalmartLocation.city + " " + jsonWalmartLocation.state + ", " + jsonWalmartLocation.zipCode;
  
  var jsonDrivingDistance = await drivingDistance(_inputAddress, walmartAddr);

  var jsonItemList = await walmartProductLocator(jsonWalmartLocation.location_id, "apples");

  console.log("READY TO POPULATE ON THE PAGE");
  console.log("WALMART LOCATION");
  console.log(jsonWalmartLocation);
  console.log("DRIVE TO WALMART LOCATION");
  console.log(jsonDrivingDistance);
  console.log("WALMART PRODUCT LIST");
  console.log(jsonItemList);
};*/

var shopperAddr = "4400 Baptist Island Road, Groveland Fl, 34736";
var itemDesc = "Fresh Bananas"

getAllData(shopperAddr, itemDesc);