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
    var dt = new Date();
    dt.setHours( dt.getHours() + 3 );


    //Create Admin Info
    var admin = factory.newResource(NS, 'Admin', 'admin@book-counterfeit-composer.com');
    var adminAddress = factory.newConcept(NS, 'Address');
    adminAddress.country = 'KENYA';
    adminAddress.county = 'NAIROBI';
    adminAddress.street = 'Loita Street';
    adminAddress.zip = '047';
    admin.address = adminAddress;
    admin.memberId = 'P-001';
    admin.name = 'Network Admin';
    admin.firstName = 'Network Admin';
    admin.userName = 'admin';
    admin.secret = 'admin123';
    admin.createdAt = dt;
    admin.accountBalance = 0;

    //Create Publishers Info
    var publisher = factory.newResource(NS, 'Publisher', 'publisher1@gmail.com');
    var publisherAddress = factory.newConcept(NS, 'Address');
    publisherAddress.country = 'KENYA';
    publisherAddress.county = 'NAIROBI';
    publisherAddress.street = 'Loita Street';
    publisherAddress.zip = '047';
    publisher.address = publisherAddress;
    publisher.memberId = 'P-001';
    publisher.name = 'Longhorn Publishers';
    publisher.firstName = 'Longhorn Publishers';
    publisher.userName = 'longhorn-publishers';
    publisher.secret = 'kaarada';
    publisher.createdAt = dt;
    publisher.accountBalance = 0;

    var publisher2 = factory.newResource(NS, 'Publisher', 'publisher2@gmail.com');
    var publisherAddress2 = factory.newConcept(NS, 'Address');
    publisherAddress2.country = 'KENYA';
    publisherAddress2.county = 'MOMBASA';
    publisherAddress2.street = 'Loita Street';
    publisherAddress2.zip = '001';
    publisher2.address = publisherAddress2;
    publisher2.memberId = 'P-002';
    publisher2.name = 'Kenya Bureau Of Statitics';
    publisher2.firstName = 'Kenya Bureau Of Statitics';
    publisher2.userName = 'kbs-publishers';
    publisher2.secret = 'kaaradakbs';
    publisher2.createdAt = dt;
    publisher2.accountBalance = 0;

    //Create Distributor
    var distributor = factory.newResource(NS, 'Distributor', 'distributor@gmail.com');
    var distributorAddress = factory.newConcept(NS, 'Address');
    distributorAddress.country = 'KENYA';
    distributorAddress.county = 'NAIROBI';
    distributorAddress.street = 'Mfangano Street';
    distributorAddress.zip = '047';
    distributor.address = distributorAddress;
    distributor.memberId = 'D-001';
    distributor.name = 'Book Distributors Kenya';
    distributor.firstName = 'Book Distributors Kenya';
    distributor.userName = 'bdk-ditributors';
    distributor.secret = 'kaaradabdk';
    distributor.createdAt = dt;
    distributor.accountBalance = 2000000;


    //Create Customer
    var individual = factory.newResource(NS, 'Customer', 'customer@gmail.com');
    var individualAddress = factory.newConcept(NS, 'Address');
    individualAddress.country = 'KENYA';
    individualAddress.county = 'NAIROBI';
    individualAddress.street = 'Kenyatta Avenue';
    individualAddress.zip = '047';
    individual.address = individualAddress;
    individual.memberId = 'C-002';
    individual.firstName = 'Peter';
    individual.lastName = 'Kiama';
    individual.userName = 'pk-kiama';
    individual.secret = 'kaaradapk';
    individual.createdAt = dt;
    individual.accountBalance = 0;

    
    //Create Retailer
    var retailer = factory.newResource(NS, 'Customer', 'customer-evin@gmail.com');
    var retailerAddress = factory.newConcept(NS, 'Address');
    retailerAddress.country = 'KENYA';
    retailerAddress.county = 'NAIROBI';
    retailerAddress.street = 'Kenyatta Avenue';
    retailerAddress.zip = '047';
    retailer.address = retailerAddress;
    retailer.isRetailer = '1';
    retailer.memberId = 'C-6a3Gm';
    retailer.firstName = 'Evin BookStore';
    retailer.lastName = '';
    retailer.telephone = '078954326';
    retailer.userName = 'evin';
    retailer.secret = '123456';
    retailer.createdAt = dt;
    retailer.accountBalance = 0;

    //Create Contract
    var contract = factory.newResource(NS, 'OrderContract', 'CON_001');
    contract.seller = factory.newRelationship(NS, 'Publisher', 'publisher1@gmail.com');
    contract.buyer = factory.newRelationship(NS, 'Customer', 'customer@gmail.com');
    var tomorrow = evinBookSetUpDemo.timestamp; //current time so to get tomorrow, add 1
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.arrivalDateTime = tomorrow; //set the time to tomorrow
    contract.unitPrice = 500;
    contract.payOnArrival = true;
    contract.quantity = 200;
    contract.description = 'Mathematics, Class 4, 3rd Edition';
    contract.destinationAddress = 'Loita Street, Barclays Plaza, Flr 12';
    contract.orderStatus = 'WAITING';
    contract.lateArrivalPenaltyFactor = 0.15;
    contract.damagedPenaltyFactor = 0.20;
    contract.lostPenaltyFactor = 0.50;
    contract.createdAt = dt;

    //Create Contract2
    var contract2 = factory.newResource(NS, 'OrderContract', 'CON_DBn1jTnJoT');
    contract2.seller = factory.newRelationship(NS, 'Publisher', 'publisher1@gmail.com');
    contract2.buyer = factory.newRelationship(NS, 'Customer', 'customer@gmail.com');
    var tomorrow = evinBookSetUpDemo.timestamp; //current time so to get tomorrow, add 1
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract2.arrivalDateTime = tomorrow; //set the time to tomorrow
    contract2.unitPrice = 500;
    contract2.payOnArrival = true;
    contract2.quantity = 2;
    contract2.description = 'Social Studies, Class 8, 3rd Edition';
    contract2.destinationAddress = 'Loita Street, Barclays Plaza, Flr 12';
    contract2.orderStatus = 'DELIVERED';
    contract2.lateArrivalPenaltyFactor = 0.15;
    contract2.damagedPenaltyFactor = 0.20;
    contract2.lostPenaltyFactor = 0.50;
    contract2.createdAt = dt;

    // Create Shipment
    var shipment = factory.newResource(NS, 'Shipment', 'SHIP_001');
    var coordinates = factory.newConcept(NS, 'Location');
    shipment.ShipmentStatus = 'SHIPPED_IN_TRANSIT';
    shipment.itemStatus = 'LOST';
    shipment.unitCount = 1000;
    coordinates.latLong = '4.0435,39.6682';
    shipment.location = coordinates;
    shipment.createdAt = dt;
    shipment.contract = factory.newRelationship(NS, 'OrderContract', 'CON_001');

    // Create Book
    var book = factory.newResource(NS, 'Book', 'BOOK_001');
    var bkCoordinates = factory.newConcept(NS, 'Location');
    bkCoordinates.latLong = '3.0435,59.6682';
    book.location = bkCoordinates;
    book.type = 'Kiswahili';
    book.author = 'Wallah Bin Wallah';
    book.edition = '3rd Edition';
    book.description = 'Description Goes Here';
    // book.initialOwner = 'publisher1@gmail.com';
    book.sold = false;
    book.price = 450;
    book.createdAt = dt;
    book.shipment = factory.newRelationship(NS, 'Shipment', 'SHIP_hRSgxcVWU7');
    book.addedBy = factory.newRelationship(NS, 'Publisher', 'publisher1@gmail.com');

    // Create Book
    var book2 = factory.newResource(NS, 'Book', 'BOOK_002');
    var bkCoordinates2 = factory.newConcept(NS, 'Location');
    bkCoordinates2.latLong = '36.0435,80.6682';
    book2.location = bkCoordinates2;
    book2.type = 'English';
    book2.author = 'Oludhe McGoyie';
    book2.edition = '2nd Edition';
    book2.description = 'Description Goes Here';
    // book2.initialOwner = 'publisher2@gmail.com';
    book2.sold = false;
    book2.price = 650;
    book2.createdAt = dt;
    book2.shipment = factory.newRelationship(NS, 'Shipment', 'SHIP_hRSgxcVWU7');
    book2.addedBy = factory.newRelationship(NS, 'Publisher', 'publisher2@gmail.com');

    //Javascript
    // Add above created participants to the
    // Network using the composer API in JS
    // From bcrCoffeeSetUpDemo function, return promise
    // from getParticipant module targeting grower
    // containing the grower registry
    return getParticipantRegistry(NS + '.Publisher')
        .then(function(publisherRegistry) {
            return publisherRegistry.addAll([publisher, publisher2]);
        })
        //Add All other participants to the network
        .then(function() {
            return getParticipantRegistry(NS + '.Distributor')
        })
        .then(function(distributorRegistry) {
            return distributorRegistry.addAll([distributor]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Admin')
        })
        .then(function(adminRegistry) {
            return adminRegistry.addAll([admin]);
        })
        .then(function() {
            return getParticipantRegistry(NS + '.Customer')
        })
        .then(function(individualRegistry) {
            return individualRegistry.addAll([individual]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.OrderContract')
        })
        .then(function(contractRegistry) {
            return contractRegistry.addAll([contract, contract2]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Shipment')
        })
        .then(function(shipmentRegistry) {
            return shipmentRegistry.addAll([shipment]);
        })
        .then(function() {
            return getAssetRegistry(NS + '.Book')
        })
        .then(function(bookRegistry) {
            return bookRegistry.addAll([book, book2]);
        });
}

/*
 * Shipment received and funds allocated
 * @param{org.evin.book.track.ShipmentReceived} shipmentReceived
 * @transaction
 */
async function shipmentReceived(shipmentReceived) {

    var shipment = shipmentReceived.shipment;
    var contract = shipmentReceived.shipment.contract; // Points to particular shipment then contract
    var money = contract.unitPrice * shipment.unitCount; // Assuming no penalties

    console.log("INITIAL AMOUNT " + money);

    console.log('Received at: ' + shipmentReceived.timestamp); //when the shipment is received
    console.log('Contract arrivalDateTime: ' + contract.arrivalDateTime); // agreed upon arrivalTime

    shipment.ShipmentStatus = 'DELIVERED';

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
                console.log(contract.lostPenaltyFactor + " * " + shipment.unitCount + " = " + (contract.lostPenaltyFactor * shipment.unitCount));
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
        .then(function(sellerRegistry) {
            return sellerRegistry.update(contract.seller);
        })
        .then(function() {
            return getParticipantRegistry('org.evin.book.track.' + buyerType);
        })
        .then(function(buyerRegistry) {
            return buyerRegistry.update(contract.buyer);
        })
        .then(function() {
            return getAssetRegistry('org.evin.book.track.Shipment');
        })
        .then(function(shipmentRegistry) {
            return shipmentRegistry.update(shipment);
        });
}


/**
 *  Update the status in PurchaseRequest
 *  @param{org.evin.book.track.updatePurchaseRequestStatus} updatePurchaseRequestStatus
 *  @transaction
 */
async function updatePurchaseRequestStatus(updatePurchaseRequestStatus){
    let bookAssetRegistry = await getAssetRegistry('org.evin.book.track.PurchaseRequest');

    updatePurchaseRequestStatus.purchaseRequest.status = updatePurchaseRequestStatus.status;
    await bookAssetRegistry.update(updatePurchaseRequestStatus.purchaseRequest);
}

/**
 *  Update the book sold during book purchase
 *  @param{org.evin.book.track.updateBookSold} updateBookSold
 *  @transaction
 */
async function updateBookSold(updateBookSold){
    let bookAssetRegistry = await getAssetRegistry('org.evin.book.track.Book');

    updateBookSold.book.sold = updateBookSold.sold;
    await bookAssetRegistry.update(updateBookSold.book);
}

/**
 *  Update the shipmentId in Book Asset
 *  @param{org.evin.book.track.updateBookShipment} updateBookShipment
 *  @transaction
 */
async function updateBookShipment(updateBookShipment){
    let bookAssetRegistry = await getAssetRegistry('org.evin.book.track.Book');

    updateBookShipment.book.shipment = updateBookShipment.shipmentId;
    await bookAssetRegistry.update(updateBookShipment.book);
}

/**
 *  Update the Order Status in OrderContract Asset
 *  @param{org.evin.book.track.updateOrderStatus} updateOrderStatus
 *  @transaction
 * {
  "$class": "org.evin.book.track.updateBookShipment",
  "book": "resource:org.evin.book.track.Book#BOOK_001",
  "shipmentId": "resource:org.evin.book.track.Shipment#SHIP_xu4Tz2VbLY"
    }
 */
async function updateOrderStatus(updateOrderStatus){
    let orderContractAssetRegistry = await getAssetRegistry('org.evin.book.track.OrderContract');

    updateOrderStatus.order.orderStatus = updateOrderStatus.orderStatus;
    await orderContractAssetRegistry.update(updateOrderStatus.order);
}

/**
 *  Update the Shipment Status in Shipment Asset
 *  @param{org.evin.book.track.updateShipmentStatus} updateShipmentStatus
 *  @transaction
 */
async function updateShipmentStatus(updateShipmentStatus){
    let shipmentAssetRegistry = await getAssetRegistry('org.evin.book.track.Shipment');

    updateShipmentStatus.shipment.ShipmentStatus = updateShipmentStatus.ShipmentStatus;
    await shipmentAssetRegistry.update(updateShipmentStatus.shipment);
}

/**
 *  Update the Shipment Status in Shipment Asset
 *  @param{org.evin.book.track.updateShipmentItemStatus} updateShipmentItemStatus
 *  @transaction
 */
async function updateShipmentItemStatus(updateShipmentItemStatus){
    let shipmentAssetRegistry = await getAssetRegistry('org.evin.book.track.Shipment');

    updateShipmentItemStatus.shipment.itemStatus = updateShipmentItemStatus.itemStatus;
    await shipmentAssetRegistry.update(updateShipmentItemStatus.shipment);
}

/**
 *  Update the Shipment Review in Shipment Asset
 *  @param{org.evin.book.track.updateShipmentReview} updateShipmentReview
 *  @transaction
 */
async function updateShipmentReview(updateShipmentReview){
    let shipmentAssetRegistry = await getAssetRegistry('org.evin.book.track.Shipment');

    updateShipmentReview.shipment.feedbackMessage = updateShipmentReview.feedbackMessage;
    updateShipmentReview.shipment.feedbackScale = updateShipmentReview.feedbackScale;
    await shipmentAssetRegistry.update(updateShipmentReview.shipment);
}

/**
 *  Update customer points
 *  @param{org.evin.book.track.updateCustomerPoints} updateCustomerPoints
 *  @transaction
 */
async function updateCustomerPoints(updateCustomerPoints){
    let customerParticipantRegistry = await getParticipantRegistry('org.evin.book.track.Customer');

    updateCustomerPoints.customer.accountBalance = updateCustomerPoints.accountBalance;
    await customerParticipantRegistry.update(updateCustomerPoints.customer);
}

/**
 *  Upload the Customer Profile Image
 *  @param{org.evin.book.track.uploadCustomerProfilePic} uploadCustomerProfilePic
 *  @transaction
 */
async function uploadCustomerProfilePic(uploadCustomerProfilePic){
    let customerParticipantRegistry = await getParticipantRegistry('org.evin.book.track.Customer');

    uploadCustomerProfilePic.customer.avatar = uploadCustomerProfilePic.avatar;
    await customerParticipantRegistry.update(uploadCustomerProfilePic.customer);
}

/**
 *  Upload the Distributor Profile Image
 *  @param{org.evin.book.track.uploadDistributorProfilePic} uploadDistributorProfilePic
 *  @transaction
 */
async function uploadDistributorProfilePic(uploadDistributorProfilePic){
    let distributorParticipantRegistry = await getParticipantRegistry('org.evin.book.track.Distributor');

    uploadDistributorProfilePic.distributor.avatar = uploadDistributorProfilePic.avatar;
    await distributorParticipantRegistry.update(uploadDistributorProfilePic.distributor);
}

/**
 *  Upload the Publisher Profile Image
 *  @param{org.evin.book.track.uploadPublisherProfilePic} uploadPublisherProfilePic
 *  @transaction
 */
async function uploadPublisherProfilePic(uploadPublisherProfilePic){
    let publisherParticipantRegistry = await getParticipantRegistry('org.evin.book.track.Publisher');

    uploadPublisherProfilePic.publisher.avatar = uploadPublisherProfilePic.avatar;
    await publisherParticipantRegistry.update(uploadPublisherProfilePic.publisher);
}

/**
 *  In general, books should be registered in the shipment
 *  @param{org.evin.book.track.BookRegisterShipment} bookRegisterShipment
 *  @transaction
 */
async function bookRegisterShipment(bookRegisterShipment) {
    var shipment = bookRegisterShipment.shipment;

    // console.log('Adding books serials of ' + bookRegisterShipment.serials + 'to shipment');

    //if there is a temperature at the moment
    //ad to exising array
    console.log("shipment.bookRegisterShipment.length SIZE is : " + shipment.bookRegisterShipment ? shipment.bookRegisterShipment.length : 'shipment.bookRegisterShipment is null or undefined')
    if (shipment.bookRegisterShipment) {
        shipment.bookRegisterShipment.push(bookRegisterShipment)
    } else {
        //if there are non assign the current temp reading in the array
        shipment.bookRegisterShipment = [bookRegisterShipment]
    }

    return getAssetRegistry('org.evin.book.track.Shipment')
        .then(function(shipmentRegistry) {
            return shipmentRegistry.update(shipment);
        });
}

/**
 *  In general, books should be registered in the shipment
 *  @param{org.evin.book.track.VerifyBook} verifyBook
 *  @transaction
 */
// async function verifyBook(verifyBook) {

//   var shipment = bookRegisterShipment.shipment;

//   console.log('Adding books serials of ' + bookRegisterShipment.serials + 'to shipment');

//   //if there is a temperature at the moment
//   //ad to exising array
//   if (shipment.bookRegisterShipment) {
//     shipment.bookRegisterShipment.push(bookRegisterShipment)
//   } else {
//     //if there are non assign the current temp reading in the array
//     shipment.bookRegisterShipment = [bookRegisterShipment]
//   }

//   return getAssetRegistry('org.evin.book.track.Shipment')
//     .then(function (shipmentRegistry) {
//       return shipmentRegistry.update(shipment);
//     });
// }
/**
 *  In general, books new ownership should be registered in the shipment
 *  @param{org.evin.book.track.ShipOwnership} shipOwnerships
 *  @transaction
 */
async function shipOwnership(shipOwnerships) {
    var shipment = shipOwnerships.shipment;

    //if there is a temperature at the moment
    //ad to exising array
    if (shipment.shipOwnership) {
        shipment.shipOwnership.push(shipOwnerships)
    } else {
        //if there are non assign the current temp reading in the array
        shipment.shipOwnership = [shipOwnerships]
    }

    return getAssetRegistry('org.evin.book.track.Shipment')
        .then(function(shipmentRegistry) {
            return shipmentRegistry.update(shipment);
        });
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.evin.book.track.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeCommodity(trade) { // eslint-disable-line no-unused-vars

    // set the new owner of the commodity
    trade.commodity.owner = trade.newOwner;
    const assetRegistry = await getAssetRegistry('org.evin.book.track.Commodity');

    // emit a notification that a trade has occurred
    const tradeNotification = getFactory().newEvent('org.evin.book.track', 'TradeNotification');
    tradeNotification.commodity = trade.commodity;
    emit(tradeNotification);

    // persist the state of the commodity
    await assetRegistry.update(trade.commodity);
}

/**
 * Track the trade of a book from one entity to another Book.owner
 * @param {org.evin.book.track.TradeBookOwnership} tradeBook - the trade to be processed
 * @transaction
 */
async function tradeBookOwnership(tradeBook) { // eslint-disable-line no-unused-vars

    // set the new owner of the book
    tradeBook.book.owner = tradeBook.newOwner;
    const assetRegistry = await getAssetRegistry('org.evin.book.track.Book');

    // emit a notification that a trade has occurred
    const tradeNotification = getFactory().newEvent('org.evin.book.track', 'TradeBookNotification');
    tradeNotification.book = tradeBook.book;
    emit(tradeNotification);

    // persist the state of the book
    await assetRegistry.update(tradeBook.book);
}

/**
 *  In general, books should be registered in the shipment
 *  @param{org.evin.book.track.NewOwnership} newOwnership
 *  @transaction
 */

// async function newOwnership(newOwnership) {
//     var book = newOwnership.book;

//     console.log('Adding books emails of ' + newOwnership.email + 'to owner');

//     //if there is a temperature at the moment
//     //ad to exising array
//     if (book.newOwnership) {
//         book.newOwnership.push(newOwnership)
//     } else {
//         //if there are non assign the current temp reading in the array
//         book.newOwnership = [newOwnership]
//     }


//     return getAssetRegistry('org.evin.book.track.Book')
//         .then(function(bookRegistry) {
//             return bookRegistry.update(book);
//         });
// }

/**
 * 
 * @param {org.evin.book.track.UpdateShipment} updatedItems - the UpdateShipment transaction
 * @transaction
 */
// async function UpdateShipment(transactionItems) {

//     //TODO: CHECK PERMISSIONS
//     //console.log(newHolder.accountBalance);

//     var newHolder;
//     var newStatus = transactionItems.shipmentStatus;
//     var newLocation = transactionItems.newLocation;
//     var shipment = transactionItems.shipment;
//     var oldLocation = shipment.location;

//     // If the optional field "newHolder" is filled out
//     if (transactionItems.newHolder != '' && transactionItems.newHolder != null)
//         newHolder = transactionItems.newHolder;
//     else
//         newHolder = shipment.shipOwnership;

//     // const holderExists = await supplyMemberExists(newHolder);
//     // if(!holderExists)
//     //     throw 'The specified holder does not exist.'
//     // console.log("Holder exists: " + holderExists);

//     if (newStatus == 'DELIVERED') {
//         //CHECK IF NEW HOLDER EXISTS

//         if (newHolder.id == shipment.contract.buyer.id) {
//             if (shipment.contract.payOnArrival) {
//                 //PAYMENT ON ARRIVAL

//                 //Verify balance
//                 if (validPayment(shipment, transactionItems)) {

//                     payOut(shipment.contract.buyer, shipment.contract.seller, shipment);

//                     shipment.shipmentStatus = newStatus;
//                     shipment.location = newLocation;

//                 } else {
//                     throw 'Not enough money to make the payment transaction on delivery';
//                 }
//             } else {
//                 //NO PAYMENT ON ARRIVAL
//             }

//             shipment.shipmentStatus = newStatus;
//             shipment.location = newLocation;
//             shipment.shipOwnership = newHolder;
//             // shipment.holder = newHolder;

//             //change owner of all assets individually
//             for (var i = 0; i < shipment.assetExchanged.length; i++) {
//                 shipment.assetExchanged[i].owner = newHolder;
//             }

//         } else {
//             throw 'Not delivering to the contract buyer!';
//         }
//     } else {
//         shipment.shipmentStatus = newStatus;
//         shipment.location = newLocation;
//         shipment.shipOwnership = newHolder;
//         // shipment.holder = newHolder;
//     }
//     /**
//      * Check if member exists
//      * @param {} supplyChainMember 
//      */

//     async function supplyMemberExists(supplyChainMember) {


//         if (supplyChainMember === undefined) {
//             return false;
//         }

//         var memberID = supplyChainMember.getIdentifier();
//         var memberType = supplyChainMember.getType();

//         if (memberID === undefined || memberID == '' || memberID === null) {
//             return false;
//         } else {
//             return getParticipantRegistry('org.evin.book.track.' + memberType)
//                 .then(function(participantRegistry) {
//                     // Determine if the specific driver exists in the driver participant registry.
//                     return participantRegistry.exists(memberID);
//                 })
//                 .then(function(exists) {
//                     // Process the the boolean result.
//                     return exists;
//                 })
//                 .catch(function(error) {
//                     // Add optional error handling here.
//                 });

//         }
//     }



//     //checkLocationFraud(newLocation, shipment.contract.expectedArrivalLocation, shipment);

//     //UPDATE ASSETS
//     // const commodityAssetRegistry=await getAssetRegistry('org.evin.book.track.Book');
//     // await commodityAssetRegistry.updateAll(shipment.assetExchanged);

//     //UPDATE SHIPMENT
//     const shipmentAssetRegistry = await getAssetRegistry('org.evin.book.track.Shipment');
//     await shipmentAssetRegistry.update(shipment);

//     //EMIT UPDATE EVENT
//     let event = getFactory().newEvent('org.evin.book.track', 'ShipmentUpdate');
//     event.shipment = shipment;
//     emit(event);

// }

/**
 * Sample transaction
 * @param {org.evin.book.track.BookHistoryQuery} bookHistoryQuery
 * @transaction
 */
// async function bookHistoryQuery(transaction) {
//   const id = transaction.id
//   const nativeSupport = transaction.nativeSupport;

//   const assetRegistry = await getAssetRegistry('org.evin.book.track.Book')

//   const nativeKey = getNativeAPI().createCompositeKey('Asset:org.evin.book.track.Book', [id]);
//   const iterator = await getNativeAPI().getHistoryForKey(nativeKey);
//   let results = [];
//   let res = { done: false };
//   while (!res.done) {
//     res = await iterator.next();

//     if (res && res.value && res.value.value) {
//       let val = res.value.value.toString('utf8');
//       if (val.length > 0) {
//         // val is a string looking like this:
//         // "{\"$class\":\"org.bitship.Package\",\"sender\":\"resource:org.bitship.Customer#4602\",\"barcode\":\"1111\",\"weight\":186.716,\"location\":{\"$class\":\"org.bitship.Location\",\"lat\":135.448,\"lon\":41.32},\"status\":\"CHECK_IN\",\"receiverAddress\":\"Ex ut.\",\"receiverPhone\":\"Ad.\",\"receiverName\":\"Anim non.\",\"$registryType\":\"Asset\",\"$registryId\":\"org.bitship.Package\"}"
//         results.push(val);
//       }
//     }
//     if (res && res.done) {
//       try {
//         iterator.close();
//       }
//       catch (err) {
//       }
//     }
//   }

//   const event = getFactory().newEvent('org.evin.book.track.', 'BookHistoryQueryResults');
//   event.results = results
//   emit(event)

//   return results;
// }

/**
 * Creates a new Book with a aadharNo and a Book object, contatined in the
 * createBook transaction passed into this function. The default Book access value
 * is true. The Book will be added to the AssetRegistry.
 * @param {org.evin.book.track.createBook} createBook The createBook transaction.
 * @transaction
 */
// function createBook(createBook) {

//   var newBook;

//   return getAssetRegistry('org.evin.book.track.Book')
//     .then(function (bookRegistry) {

//       // create new instance of a Car
//       newBook = getFactory().newResource('org.evin.book.track', 'Book', createBook.id);

//       newBook.id = createBook.id;
//       newBook.bookDetails = createBook.bookDetails;
//       return bookRegistry.add(newBook);
//     })
//     .then(function () {
//       // Emit an event for the new Car creation.
//       var event = getFactory().newEvent('org.evin.book.track', 'NewBookCreated');
//       event.book = newBook;
//       emit(event);
//     });
// }

/**
 *  num_id = (Math.floor(Math.random() * ( 999999 - 100000) + 100000)).toString(10)
 *  var assetID = asset.policyholder.id + num_id;
 *
 */