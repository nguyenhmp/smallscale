1: Install CLI and CLI aws API
2: Make sure ssh is in PATH
3: Create an access key through the amazon identity and management(AIM)(needed for CLI);
4: SET JAVA_HOME environment to the home NOT the bin, but the folder right before home.
5: SET the CLI(command line interface) PATH to its bin


For example, the following commands list the contents of the .aws folder:
	Linux, OS X, or Unix - "$ ls  ~/.aws"
	Windows - "> dir %UserProfile%/.aws"

Describe your instance:
	i-4e462789 //balancer
	i-76118eb1 //server1
	i-df8e2607 //server2
	ec2-describe-instances i-IIII1111

Describe your volume:
	ec2-describe-volumes vol-0f10d5f9

Open a new Command Prompt window and verify your JAVA_HOME setting using this command:
	C:\> "%JAVA_HOME%"\bin\java -version

Create a new instance with:
	ec2-run-instances --key <Your key pair name> <what operating system you want> 	-t <the system type> -g <security-group-name>
	//scaleserver1
	ec2-run-instances --key 	scaleapp1 				ami-9abea4fb 				-t 		t2.micro

To SSH into your instance:
	ssh -i 					<Directory of your PEM key> 				ubuntu@<insert Public IP address>
	ssh -i      					scaleapp1.pem         				ubuntu@     52.36.153.23
	ssh -i "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" ubuntu@		52.36.153.23
	//scaleServer1
	ssh -i "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" ubuntu@		52.37.3.211
	//scaleServer2
	ssh -i "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" ubuntu@		52.37.120.158
	//balancer
	ssh -i "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" ubuntu@		52.36.250.179
	//SSH without yes confirmation
	ssh -o StrictHostKeyChecking=no

Upating your instance(UBUNTU OS(linux)):
	sudo apt-get update && sudo apt-get upgrade -y 
	sudo apt-get install build-essential
	sudo apt-get install libssl-dev
	sudo apt-get install python-software-properties
	//gets git
	sudo apt-get install git -y 
	sudo apt-get update && sudo apt-get upgrade -y 

Getting node:
	//downloads linux version of node
	curl -O 'https://nodejs.org/dist/v4.3.1/node-v<Node version>-linux-x64.tar.xz'
	curl -O 'https://nodejs.org/dist/v4.3.1/node-v4.3.1-linux-x64.tar.xz'
	//unzips
	tar -xf node-v<Node version>-linux-x64.tar.xz
	tar -xf node-v4.3.1-linux-x64.tar.xz
	//put in your path
	echo "export PATH=<directory to bin>:$PATH" >> ~/.bashrc
	echo "export PATH=/home/ubuntu/node-v4.3.1-linux-x64/bin:$PATH" >> ~/.bashrc
	//reload bash
	source ~/.bashrc
	//check if node works
	node

Installing MySQL:
	sudo apt-get install -y xfsprogs mysql-server

Running Node forever:
	//create screen
	$ screen
	//run node with server
	$ node amazonserver.js
	//Exit screen
	$ (ctrl + 'a') + 'd'
	//exit server
	$ exit 

Pulling github
	$ git clone https://github.com/nguyenhmp/smallscale

FTP:
	scp -r -o StrictHostKeyChecking=no -i ./scaleapp1.pem "/home/ubuntu/smallscale/resources/shellScripts" ubuntu@ec2-52-36-238-114.us-west-2.compute.amazonaws.com:/home/ubuntu
	//PC home
	scp -o StrictHostKeyChecking=no -i "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" "C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem" 'ubuntu@ec2-52-36-238-114.us-west-2.compute.amazonaws.com':/home/ubuntu

screen -dm bash ./runNode.sh                                                

//balancer scripts needs
install awscli

scp -r -o StrictHostKeyChecking=no -i "/home/ubuntu/scaleapp1.pem" "/home/ubuntu/
smallscale/resources/shellScripts" "ec2-52-25-161-84.us-west-2.compute.amazonaws.com:/home/ubuntu"

ssh -o StrictHostKeyChecking=no -i "/home/ubuntu/scaleapp1.pem" ubuntu@52.25.161.84 chmod -
R +x ./shellScripts && ./shellScripts/setUpScript.sh"