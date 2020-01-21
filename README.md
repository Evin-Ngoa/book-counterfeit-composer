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

# Runnning Project
https://medium.com/coinmonks/build-a-insurance-application-with-hyperledger-composer-and-react-js-part-1-3ebe7ad54986
### Checking Adminpeer card 
> composer card list

creating bna command from project folder
> composer archive create --sourceType dir  --sourceName . --archiveFile ./dist/book-counterfeit-composer-02.bna

> composer archive create -t dir -n .

install our Composer business network on the Hyperledger Fabric peer we have set up
> composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@0.0.1.bna


start our business network
> composer network start --networkName book-counterfeit-composer --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

import the network administrator identity 
> composer card import --file networkadmin.card

ping network 
> composer network ping --card admin@book-counterfeit-composer


Create rest-api
> composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w true