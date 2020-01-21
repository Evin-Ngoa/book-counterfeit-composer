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
function evinBookSetUpDemo(evinBookSetUpDemo){
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
    distributor.accountBalance = 2000;
   
    //Create Exporter
    var institution = factory.newResource(NS, 'Institution', 'institution@gmail.com');
    var institutionAddress = factory.newConcept(NS, 'Address');
    institutionAddress.country = 'KENYA';
    institutionAddress.county = 'NAIROBI';
    institutionAddress.street = 'Moi Avenue';
    institutionAddress.zip = '047';
    institution.address = institutionAddress;
    institution.accountBalance = 2000;
   
    //Create Miller
    var individual = factory.newResource(NS, 'Individual', 'individual@gmail.com');
    var individualAddress = factory.newConcept(NS, 'Address');
    individualAddress.country = 'KENYA';
    individualAddress.county = 'NAIROBI';
    individualAddress.street = 'Kenyatta Avenue';
    individualAddress.zip = '047';
    individual.address = individualAddress;
    individual.accountBalance = 2000;
   
    //Create Contract
    var contract = factory.newResource(NS, 'Contract', 'CON_001');
    contract.distributor = factory.newRelationship(NS, 'Distributor', 'distributor@gmail.com');
    contract.publisher = factory.newRelationship(NS, 'Publisher', 'publisher@gmail.com');
    contract.institution = factory.newRelationship(NS, 'Institution', 'institution@gmail.com');
    contract.individual = factory.newRelationship(NS, 'Individual', 'individual@gmail.com');
    var tomorrow = evinBookSetUpDemo.timestamp; //current time so to get tomorrow, add 1
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.arrivalDateTime = tomorrow; //set the time to tomorrow
    contract.unitPrice = 0.5;
    contract.minPenaltyFactor = 0.2;
    contract.maxPenaltyFactor = 0.1;
  
    //Create Shipment
    var shipment = factory.newResource(NS, 'Shipment','SHIP_001');
    shipment.status = 'IN_TRANSIT';
    shipment.unitCount = 5000;
    shipment.contract = factory.newRelationship(NS, 'Contract', 'CON_001');
   
    //Javascript
    // Add above created participants to the
    // Network using the composer API in JS
    // From bcrCoffeeSetUpDemo function, return promise
    // from getParticipant module targeting grower
    // containing the grower registry
    return getParticipantRegistry(NS + '.Publisher')
    .then(function(publisherRegistry){
    return publisherRegistry.addAll([publisher,publisher2]);
    })
    //Add All other participants to the network
    .then(function(){
      return getParticipantRegistry(NS + '.Distributor')
    })
    .then(function(distributorRegistry){
      return distributorRegistry.addAll([distributor]);
    })
    .then(function(){
      return getParticipantRegistry(NS + '.Institution')
    })
    .then(function(institutionRegistry){
      return institutionRegistry.addAll([institution]);
    })
    .then(function(){
      return getParticipantRegistry(NS + '.Individual')
    })
    .then(function(individualRegistry){
      return individualRegistry.addAll([individual]);
    })
    .then(function(){
      return getAssetRegistry(NS + '.Contract')
    })
    .then(function(contractRegistry){
      return contractRegistry.addAll([contract]);
    })
    .then(function(){
      return getAssetRegistry(NS + '.Shipment')
    })
    .then(function(shipmentRegistry){
      return shipmentRegistry.addAll([shipment]);
    }); 
}

/**
 *    num_id = (Math.floor(Math.random() * ( 999999 - 100000) + 100000)).toString(10)
    var assetID = asset.policyholder.id + num_id;
 *
 */

/**
 * Sample transaction
 * @param {org.evin.book.track.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {

    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.evin.book.track.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.evin.book.track', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
