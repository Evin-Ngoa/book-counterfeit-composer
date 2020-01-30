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
> composer archive create --sourceType dir --sourceName . -a book-counterfeit-composer@0.0.15.bna

install our Composer business network on the Hyperledger Fabric peer we have set up | version above 0.0.1 [upgrade] chnge the version
> composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@0.0.15.bna


start our business network 
> composer network start --networkName book-counterfeit-composer --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

If started before upgrade version version above 0.0.1 [upgrade]
> composer network upgrade -c PeerAdmin@hlfv1 -n book-counterfeit-composer -V 0.0.15

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