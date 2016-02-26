1. Install CLI and CLI aws API
2. Make sure ssh is in PATH
3. Create an access key through the amazon identity and management(AIM)(needed for CLI);
4. SET JAVA_HOME environment to the home NOT the bin, but the folder right before home.
5. SET the CLI(command line interface) PATH to its bin


For example, the following commands list the contents of the .aws folder:
	Linux, OS X, or Unix - "$ ls  ~/.aws"
	Windows - "> dir %UserProfile%\.aws"

Describe your instance:
	ec2-describe-instances i-IIII1111

Describe your volume:
	ec2-describe-volumes vol-0f10d5f9

Open a new Command Prompt window and verify your JAVA_HOME setting using this command:
	C:\> "%JAVA_HOME%"\bin\java -version

Create a new instance with:
	ec2-run-instances --key <Your key pair name> <what operating system you want> 	-t <the system type> -g <security-group-name>
	ec2-run-instances --key 	scaleapp1 				ami-9abea4fb 				-t 		t2.micro
To SSH into your instance. 
	ssh -i 					<Directory of your PEM key> 				ubuntu@<insert Public IP address>
	ssh -i      					scaleapp1.pem         				ubuntu@     52.36.153.23
	ssh -i "C:\Users\minh_\Desktop\Scalability\resources\scaleapp1.pem" ubuntu@		52.36.153.23

Upating your instance(UBUNTU OS):
	sudo apt-get update && sudo apt-get upgrade -y
	sudo apt-get install build-essential
	sudo apt-get install libssl-dev
	sudo apt-get install python-software-properties
	sudo apt-get git -y //gets git
	sudo apt-get update

Getting node:
	//downloads linux version of node
	curl -O https://nodejs.org/dist/v4.3.1/node-v<Node version>-linux-x64.tar.xz
	//unzips
	tar -xf node-v<Node version>-linux-x64.tar.xz
	//put in your path
	echo "export PATH=<directory to bin>:$PATH" >> ~/.bashrc
	//reload bash
	source ~/.bashrc
	//check if node works
	node

Installing MySQL:
	sudo apt-get install -y xfsprogs mysql-server

Running Node forever:
	$ nohup long-running-process &
	$ exit