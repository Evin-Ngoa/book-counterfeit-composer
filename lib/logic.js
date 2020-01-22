/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */
/**
 *  ChainCode file
 *  SetUp Demo that will automatically create new participants and assets automatically
 *  @param{org.evin.book.track.EvinBookSetupDemo} evinBookSetUpDemo
 *  @transaction
 */
function evinBookSetUpDemo(evinBookSetUpDemo) {
  var factory = getFactory();
  var NS = 'org.evin.book.track';

  //Create Publishers Info
  var publisher = factory.newResource(NS, 'Publisher', 'publisher1@gmail.com');
  var publisherAddress = factory.newConcept(NS, 'Address');
  publisherAddress.country = 'KENYA';
  publisherAddress.county = 'NAIROBI';
  publisherAddress.street = 'Loita Street';
  publisherAddress.zip = '047';
  publisher.address = publisherAddress;
  publisher.accountBalance = 0;

  var publisher2 = factory.newResource(NS, 'Publisher', 'publisher2@gmail.com');
  var publisherAddress2 = factory.newConcept(NS, 'Address');
  publisherAddress2.country = 'KENYA';
  publisherAddress2.county = 'MOMBASA';
  publisherAddress2.street = 'Loita Street';
  publisherAddress2.zip = '001';
  publisher2.address = publisherAddress2;
  publisher2.accountBalance = 0;

  //Create Distributor
  var distributor = factory.newResource(NS, 'Distributor', 'distributor@gmail.com');
  var distributorAddress = factory.newConcept(NS, 'Address');
  distributorAddress.country = 'KENYA';
  distributorAddress.county = 'NAIROBI';
  distributorAddress.street = 'Mfangano Street';
  distributorAddress.zip = '047';
  distributor.address = distributorAddress;
  distributor.accountBalance = 2000000;


  //Create Miller
  var individual = factory.newResource(NS, 'Customer', 'customer@gmail.com');
  var individualAddress = factory.newConcept(NS, 'Address');
  individualAddress.country = 'KENYA';
  individualAddress.county = 'NAIROBI';
  individualAddress.street = 'Kenyatta Avenue';
  individualAddress.zip = '047';
  individual.address = individualAddress;
  individual.accountBalance = 5000000;

  //Create Contract
  var contract = factory.newResource(NS, 'OrderContract', 'CON_001');
  contract.seller = factory.newRelationship(NS, 'Publisher', 'publisher1@gmail.com');
  contract.buyer = factory.newRelationship(NS, 'Customer', 'customer@gmail.com');
  var tomorrow = evinBookSetUpDemo.timestamp; //current time so to get tomorrow, add 1
  tomorrow.setDate(tomorrow.getDate() + 1);
  contract.arrivalDateTime = tomorrow; //set the time to tomorrow
  contract.unitPrice = 500;
  contract.lateArrivalPenaltyFactor = 0.15;
  contract.damagedPenaltyFactor = 0.20;
  contract.lostPenaltyFactor = 0.50;

  //Create Shipment
  var shipment = factory.newResource(NS, 'Shipment', 'SHIP_001');
  var coordinates = factory.newConcept(NS, 'Location');
  shipment.shipmentStatus = 'SHIPPED_IN_TRANSIT';
  shipment.itemStatus = 'LOST';
  shipment.unitCount = 1000;
  coordinates.latLong = '4.0435,39.6682';
  shipment.location = coordinates;
  shipment.contract = factory.newRelationship(NS, 'OrderContract', 'CON_001');

  //Javascript
  // Add above created participants to the
  // Network using the composer API in JS
  // From bcrCoffeeSetUpDemo function, return promise
  // from getParticipant module targeting grower
  // containing the grower registry
  return getParticipantRegistry(NS + '.Publisher')
    .then(function (publisherRegistry) {
      return publisherRegistry.addAll([publisher, publisher2]);
    })
    //Add All other participants to the network
    .then(function () {
      return getParticipantRegistry(NS + '.Distributor')
    })
    .then(function (distributorRegistry) {
      return distributorRegistry.addAll([distributor]);
    })
    .then(function () {
      return getParticipantRegistry(NS + '.Customer')
    })
    .then(function (individualRegistry) {
      return individualRegistry.addAll([individual]);
    })
    .then(function () {
      return getAssetRegistry(NS + '.OrderContract')
    })
    .then(function (contractRegistry) {
      return contractRegistry.addAll([contract]);
    })
    .then(function () {
      return getAssetRegistry(NS + '.Shipment')
    })
    .then(function (shipmentRegistry) {
      return shipmentRegistry.addAll([shipment]);
    });
}

/*
 * Shipment received and funds allocated
 * @param{org.evin.book.track.ShipmentReceived} shipmentReceived
 * @transaction
 */
async function shipmentReceived(shipmentReceived) {

  var shipment = shipmentReceived.shipment;
  var contract = shipmentReceived.shipment.contract;   // Points to particular shipment then contract
  var money = contract.unitPrice * shipment.unitCount; // Assuming no penalties

  console.log("INITIAL AMOUNT " + money);

  console.log('Received at: ' + shipmentReceived.timestamp);//when the shipment is received
  console.log('Contract arrivalDateTime: ' + contract.arrivalDateTime); // agreed upon arrivalTime

  shipment.shipmentStatus = 'DELIVERED';

  //If arrived late, set amount to latePenaltyFactor
  if (shipmentReceived.timestamp > contract.arrivalDateTime) {
    console.log("IF LATE!!!!!!");

    console.log('Before Late Amount' + money);

    //Apply the penalty to the amount
    money -= (contract.lateArrivalPenaltyFactor * shipment.unitCount);

    console.log('After Late Penalty Amount' + money);

    // Check Item Status
    if (shipment.itemStatus != "GOOD") {
      // Apply penalty for damaged
      if (shipment.itemStatus == "DAMAGED") {
        money -= (contract.damagedPenaltyFactor * shipment.unitCount);
        console.log('After Damaged Penalty Amount' + money);
      }

      // Apply penalty for lost items
      if (shipment.itemStatus == "LOST") {
        money -= (contract.lostPenaltyFactor * shipment.unitCount);
        console.log('After Lost Penalty Amount' + money);
      }
    }

    //Prevent negative payout
    if (money < 0) {
      money = 0;
    }

    // Update accounts
    contract.seller.accountBalance += money;
    contract.buyer.accountBalance -= money;


  } else {

    console.log("IF NOT LATE --=====");

    // Check Item Status
    if (shipment.itemStatus != "GOOD") {
      // Apply penalty for damaged
      if (shipment.itemStatus == "DAMAGED") {
        money -= (contract.damagedPenaltyFactor * shipment.unitCount);
        console.log('After Damaged Penalty Amount' + money);
      }

      // Apply penalty for lost items
      if (shipment.itemStatus == "LOST") {
        money -= (contract.lostPenaltyFactor * shipment.unitCount);
        console.log(contract.lostPenaltyFactor + " * "+shipment.unitCount +" = " + (contract.lostPenaltyFactor * shipment.unitCount));
        console.log('After Lost Penalty Amount' + money);
      }
    }

    //Prevent negative payout
    if (money < 0) {
      money = 0;
    }

    // Update accounts
    contract.seller.accountBalance += money;
    contract.buyer.accountBalance -= money;

  }

  var sellerID = contract.seller.getIdentifier();
  var sellerType = contract.seller.getType();
  var buyerID = contract.buyer.getIdentifier();
  var buyerType = contract.buyer.getType();
  console.log("SellerType " + sellerType);
  console.log("BuyerType " + buyerType);

  //Update to the network
  return getParticipantRegistry('org.evin.book.track.' + sellerType)
    .then(function (sellerRegistry) {
      return sellerRegistry.update(contract.seller);
    })
    .then(function () {
      return getParticipantRegistry('org.evin.book.track.' + buyerType);
    })
    .then(function (buyerRegistry) {
      return buyerRegistry.update(contract.buyer);
    })
    .then(function () {
      return getAssetRegistry('org.evin.book.track.Shipment');
    })
    .then(function (shipmentRegistry) {
      return shipmentRegistry.update(shipment);
    });
}

/**
*  In general, books should be registered in the shipment
*  @param{org.evin.book.track.BookRegisterShipment} bookRegisterShipment
*  @transaction
*/

async function bookRegisterShipment(bookRegisterShipment){
 var shipment = bookRegisterShipment.shipment;

 console.log('Adding books serials of ' + bookRegisterShipment.serials + 'to shipment');

 //if there is a temperature at the moment
 //ad to exising array
 if(shipment.bookRegisterShipment){
   shipment.bookRegisterShipment.push(bookRegisterShipment)
 }else{
   //if there are non assign the current temp reading in the array
   shipment.bookRegisterShipment = [bookRegisterShipment]
 }
 return getAssetRegistry('org.evin.book.track.Shipment')
 .then(function(shipmentRegistry){
   return shipmentRegistry.update(shipment);
 });
}

/**
 * Sample transaction
 * @param {org.evin.book.track.BookHistoryQuery} bookHistoryQuery
 * @transaction
 */
async function bookHistoryQuery(transaction) {
  const id = transaction.id
  const nativeSupport = transaction.nativeSupport;

  const assetRegistry = await getAssetRegistry('org.evin.book.track.Book')

  const nativeKey = getNativeAPI().createCompositeKey('Asset:org.evin.book.track.Book', [id]);
  const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
  let results = [];
  let res = {done : false};
  while (!res.done) {
      res = await iterator.next();

      if (res && res.value && res.value.value) {
          let val = res.value.value.toString('utf8');
          if (val.length > 0) {
              // val is a string looking like this:
              // "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135.448,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}"
              results.push(val);
          }
      }
      if (res && res.done) {
          try {
              iterator.close();
          }
          catch (err) {
          }
      }
  }

  const event = getFactory().newEvent('org.evin.book.track.', 'BookHistoryQueryResults');
  event.results = results
  emit(event)

  return results;
}

/**
* Creates a new Book with a aadharNo and a Book object, contatined in the
* createBook transaction passed into this function. The default Book access value
* is true. The Book will be added to the AssetRegistry.
* @param {org.evin.book.track.createBook} createBook The createBook transaction.
* @transaction
*/
function createBook(createBook) {
  
  var newBook;

  return getAssetRegistry('org.evin.book.track.Book')
  .then(function (bookRegistry) {
      
      // create new instance of a Car
      newBook = getFactory().newResource('org.evin.book.track', 'Book', createBook.id);

      newBook.id = createBook.id;
      newBook.bookDetails = createBook.bookDetails;
      return bookRegistry.add(newBook);
  })
  .then(function () {
      // Emit an event for the new Car creation.
      var event = getFactory().newEvent('org.evin.book.track', 'NewBookCreated');
      event.book = newBook;
      emit(event);
  });
}

/**
 *  num_id = (Math.floor(Math.random() * ( 999999 - 100000) + 100000)).toString(10)
 *  var assetID = asset.policyholder.id + num_id;
 *
 */


