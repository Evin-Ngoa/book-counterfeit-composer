# book-counterfeit-composer
The Hyperledger Composer For the book counterfeit system

# Docker
# Stop all containers
docker stop $(docker ps -a -q)
# Delete all containers
docker rm $(docker ps -a -q)

# Running the project from WSL
> source ~/.profile

> sudo mkdir -p /d
> sudo mount --bind /mnt/d /d
> cd /d/workspace/fabric-dev-servers/book-counterfeit-composer

# Runing Fabric
cd ~/fabric-dev-servers
./startFabric.sh
./createPeerAdminCard.sh


# Runnning Project
https://medium.com/coinmonks/build-a-insurance-application-with-hyperledger-composer-and-react-js-part-1-3ebe7ad54986
### Checking Adminpeer card 
> composer card list

creating bna command from project folder
> composer archive create --sourceType dir  --sourceName . --archiveFile ./dist/book-counterfeit-composer-02.bna

> composer archive create -t dir -n .

version above 0.0.1 [upgrade]
https://hyperledger.github.io/composer/v0.19/tutorials/queries
> composer archive create --sourceType dir --sourceName . -a book-counterfeit-composer@0.0.17.bna

install our Composer business network on the Hyperledger Fabric peer we have set up | version above 0.0.1 [upgrade] chnge the version
> composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@0.0.17.bna


start our business network 
> composer network start --networkName book-counterfeit-composer --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

If started before upgrade version version above 0.0.1 [upgrade]
> composer network upgrade -c PeerAdmin@hlfv1 -n book-counterfeit-composer -V 0.0.17

import the network administrator identity 
> composer card import --file networkadmin.card

ping network 
> composer network ping --card admin@book-counterfeit-composer
ping version above 0.0.1 [upgrade]
> composer network ping -c admin@book-counterfeit-composer | grep Business


Create rest-api+
> composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w true

Command deletes the contents of all the registries in the State Database. It is fast way for developers to reset the Business Network and remove test data.
> composer network reset -c admin@book-counterfeit-composer



"bookRegisterShipment": [
    {
      "$class": "org.evin.book.track.BookRegisterShipment",
      "serials": "resource:org.evin.book.track.Book#BOOK_001",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "2a564b57b61070e3f34f9a839ab9f4051717176985181753ef7dda0b324fe7ea",
      "timestamp": "2020-01-30T10:54:45.460Z"
    }
  ],
  "shipOwnership": [
    {
      "$class": "org.evin.book.track.ShipOwnership",
      "email": "publisher1@gmail.com",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "5b4bf6a273ac9ccab05eb6f53f12988f93b8256f5e991f0f27380d4d7f9a553d",
      "timestamp": "2020-01-30T13:16:49.897Z"
    },
    {
      "$class": "org.evin.book.track.ShipOwnership",
      "email": "distributor@gmail.com",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "d6fa1397c2e9203d412a526690a8c42c92bb9a2b4e708e5c58e5588e63d57732",
      "timestamp": "2020-01-30T13:17:26.876Z"
    }
  ],