#!/usr/bin/env bash

# Start Project
function start_project(){
	# Composer Commands
	echo "------------- START PROJECT --------------"
	echo "==================> Executing composer network install ..."
	composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@"$version".bna
	
	echo "==================> composer network start ..."
	composer network start --networkName book-counterfeit-composer --networkVersion "$version" --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
	
	echo "==================> Beginnig API ..."
	composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w -p 3001
	
    exit 0
}

# Upgrade Project 
function upgrade_project(){
	#Composer Commands
	echo "------------- START PROJECT --------------"
	echo "==================> composer archive create ..."
	composer archive create --sourceType dir --sourceName . -a book-counterfeit-composer@"$version".bna
	
	echo "==================> Executing composer network install ..."
	composer network install --card PeerAdmin@hlfv1 --archiveFile book-counterfeit-composer@"$version".bna
	
	echo "==================> Executing composer network upgrade ..."
	composer network upgrade -c PeerAdmin@hlfv1 -n book-counterfeit-composer -V "$version"
	
	echo "==================> Beginnig API ..."
	composer-rest-server -c admin@book-counterfeit-composer -n never -u true -w -p 3001
	
    exit 0
}

#Incase 1 argument misses
helpFunction()
{
   echo ""
   echo "Usage: $0 -f fun -v version "
   echo -e "\t-f Description of what is function to execute"
   echo -e "\t-v Description of what is version of the project"
   exit 1 # Exit script after printing help
}

while getopts "f:v:" opt
do
   case "$opt" in
      f ) fun="$OPTARG" ;;
      v ) version="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$fun" ] || [ -z "$version" ] 
	# Choose functio to execute
	while [ $# -ne 0 ]
	do
		arg="$1"
		case "$arg" in
			--start)
				start_project
				;;
				
			--upgrade)
				upgrade_project
				;;
				
			--help)
				menu
				;;
		  
			--halt)
				stop
				;;
			
		esac
		shift
	done
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

# Begin script in case all parameters are correct
echo "$fun"
echo "$version"