# book-counterfeit-composer
The Hyperledger Composer For the book counterfeit system

# Important about filter composer-rest
<https://stackoverflow.com/questions/51655153/how-to-include-relationship-in-custom-query-in-hyperledger-composer/>
`filter={"include":"resolve"}` is a loopback filter (exposed on the REST APIs only) - and not part of the Composer Query Language syntax.
Only applies in other queries like
`http://localhost:3000/api/Account?filter={"where":{"account_type":"saving"},"include":"resolve"}`

Historian Queries return empty results till you add the following in your permissions
`rule ParticipantAdminWhoCanAllHistorian {
  description: "this type of participants can read HistorianRecord to the Historian"
  participant: "org.hyperledger.composer.system.NetworkAdmin"
  operation: ALL
  resource: "org.hyperledger.composer.system.HistorianRecord"
  action: ALLOW  
}`

`rule ParticipantWhoCanReadHistorian {
  description: "this type of participants can read HistorianRecord to the Historian"
  participant: "org.hyperledger.composer.system.Participant"
  operation: READ
  resource: "org.hyperledger.composer.system.HistorianRecord"
  action: ALLOW  
}`


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
> cd /d/workspace/fabric-dev-servers/book-counterfeit-composer/my-loopback-app
> cd /d/workspace/fabric-dev-servers/book-counterfeit-composer/auth-express

# Runing Fabric
cd ~/fabric-dev-servers
./startFabric.sh
./createPeerAdminCard.sh


# Runnning Project
https://medium.com/coinmonks/build-a-insurance-application-with-hyperledger-composer-and-react-js-part-1-3ebe7ad54986
### Checking Adminpeer card 
> composer card list

creating bna command from project folder
> composer archive create --sourceType dir  --sourceName . --archiveFile ./dist/book-counterfeit-composer-19.bna

> composer archive create -t dir -n .

version above 0.0.1 [upgrade]
https://hyperledger.github.io/composer/v0.19/tutorials/queries
> composer archive create --sourceType dir --sourceName . -a book-counterfeit-composer@0.3.23.bna

install our Composer business network on the Hyperledger Fabric peer we have set up [Start] | version above 0.0.1 [upgrade] chnge the version
> composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@0.3.23.bna

start our business network 
> composer network start --networkName book-counterfeit-composer --networkVersion 0.3.23 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

If started before upgrade version version above 0.0.1 [upgrade]
> composer network upgrade -c PeerAdmin@hlfv1 -n book-counterfeit-composer -V 0.3.23

import the network administrator identity 
> composer card import --file networkadmin.card

ping network
> composer network ping --card admin@book-counterfeit-composer
ping version above 0.0.1 [upgrade]
> composer network ping -c admin@book-counterfeit-composer | grep Business

Create rest-api+
> composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w 

// With Another port
> composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w -p 3001

// With Authentication
> composer-rest-server -c admin@book-counterfeit-composer -n never -p 3000 -a true -m 

Command deletes the contents of all the registries in the State Database. It is fast way for developers to reset the Business Network and remove test data.
> composer network reset -c admin@book-counterfeit-composer

Delete a Card
composer card delete --card admin@tutorial-network

// resource:org.evin.book.track.Publisher#publisher1@gmail.com
query getPublisherShipments {
  description: "Getting Only Shipments [Publishers]"
  statement:
    SELECT org.evin.book.track.Shipment
    WHERE (contract.seller.email ==_$seller)
}


<!-- permissions.acl -->
rule customerBook{
    description: "Customer Can only Read Book"
    participant: "org.evin.book.track.Customer"
    operation: CREATE UPDATE DELETE
    resource: "org.evin.book.track.Book"
    action: DENY
}

rule customerBookRead{
    description: "Customer Can only Read Book"
    participant: "org.evin.book.track.Customer"
    operation: READ
    resource: "org.evin.book.track.Book"
    action: ALLOW
}

"bookRegisterShipment": [
    {
      "$class": "org.evin.book.track.BookRegisterShipment",
      "book": "resource:org.evin.book.track.Book#BOOK_001",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "2a564b57b61070e3f34f9a839ab9f4051717176985181753ef7dda0b324fe7ea",
      "timestamp": "2020-01-30T10:54:45.460Z"
    }
  ],
  "shipOwnership": [
    {
      "$class": "org.evin.book.track.ShipOwnership",
      "owner": "resource:org.evin.book.track.Publisher#publisher1@gmail.com",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "5b4bf6a273ac9ccab05eb6f53f12988f93b8256f5e991f0f27380d4d7f9a553d",
      "timestamp": "2020-01-30T13:16:49.897Z"
    },
     {
      "$class": "org.evin.book.track.ShipOwnership",
      "owner": "resource:org.evin.book.track.Distributor#distributor@gmail.com",
      "shipment": "resource:org.evin.book.track.Shipment#SHIP_001",
      "transactionId": "0172cdd4b00bd673c00a92fc30109f356be98bfa2c85f9f65ee6bc929f7f8802",
      "timestamp": "2020-01-31T06:24:29.675Z"
    }
  ],



  http://localhost:3000/api/Book/BOOK_001?filter={"where":{"id":"BOOK_001"}, "include":"resolve"}

  login auth 5. composer rest-api time 55:19

  export COMPOSER_PROVIDERS='{
    "github" : {
      "provider" : "github",
      "module" : "passport-github",
      "clientID" : "305ac7dfd7305b3baf8c",
      "clientSecret" : "81be47b409e106dcb29288e1466b4c04ccc6386a",
      "authPath" : "/auth/github",
      "callbackURL" : "/auth/github/callback",
      "successRedirect" : "/",
      "failureRedirect" : "/"
    }
    }'

    // White 
    export COMPOSER_PROVIDERS='{"github":{"provider":"github","module":"passport-github","clientID":"305ac7dfd7305b3baf8c","clientSecret":"81be47b409e106dcb29288e1466b4c04ccc6386a","authPath":"/auth/github","callbackURL":"/auth/github/callback","successRedirect":"/","failureRedirect":"/"}}'

    Authentication links

    1. https://medium.com/@CazChurchUk/developing-multi-user-application-using-the-hyperledger-composer-rest-server-b3b88e857ccc
    Medium for upload card

    2. https://html.developreference.com/article/11381546/Hyperledger+Composer%3A+How+to+use+card+to+call+composer+REST+services

    3. https://webcache.googleusercontent.com/search?q=cache:CqDzzTXFQOUJ:https://hyperledger.github.io/composer/v0.19/managing/participantsandidentities+&cd=2&hl=en&ct=clnk&gl=ke

    https://www.edureka.co/community/14345/create-participant-there-identities-hyperledger-composer

    Identity Management

    4. https://webcache.googleusercontent.com/search?q=cache:6TyK3QWs1boJ:https://hyperledger.github.io/composer/v0.19/managing/identity-issue+&cd=3&hl=en&ct=clnk&gl=ke

    5. https://stackoverflow.com/questions/54787936/hyperledger-fabric-composer-rest-server-how-to-setup-a-username-password-authe
    Auth