// var spawn = require('child_process').spawn;
// var exec = require('child_process').exec;
// var cmd = "ec2-describe-instances i-df8e2607"
// var cmd2 = 'ssh -i "C:\Users\minh_\Desktop\Scalability\resources\scaleapp1.pem" ubuntu@52.36.153.23'
// exec(cmd2, function(error, stdout, stderr) {
// 	console.log(error)
//   console.log(stdout)
//   console.log(stderr)
// });
// var pty = require("pty.js");
// var term = pty.spawn('ssh -i "C:\Users\minh_\Desktop\Scalability\resources\scaleapp1.pem" ubuntu@52.36.250.179', [])
// term.on("data", function(data) {
//   console.log("Incoming: " + data.toString());
// });

// Wait a sec before sending the password. For proper implementation 
// you should wait for the password prompt.
// setTimeout(function(){
//   term.write("mypassword\n");
// }, 1000);
// var pty = require('pty.js');

// var term = pty.spawn('ssh -i "C:\Users\minh_\Desktop\Scalability\resources\scaleapp1.pem" ubuntu@52.36.250.179', [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env
// });

// term.on('data', function(data) {
//   console.log(data);
// });

// term.write('ls\r');
// term.resize(100, 40);
// term.write('ls /\r');

// console.log(term.process);
// var SSHClient = require("NodeSSH");
// var Expect = require('node-expect');

// var ssh=new SSHClient("ipOrHostname","user", "password");
// function close(addr) {
//     console.log('Disconnected from '+addr);
// }

// function connect(addr) {
//     console.log('Connected to '+addr);
// }

// function doUptime(match) {
//     console.log('Got uptime line: '+match[0]);
// }

// parser = new Expect();
// parser.conversation("logged")
//         .sync() // synchronous conversation.
//         .expect(null,true) // the conversation trigger starts the expect. no need to expect anything more.
//             .send("uptime\n")
//         .expect(/\n([^\r]+)/)
//             .handler(doUptime) // call the doUptime function with the match results.
//         .expect("# ")
//             .send("exit\n")
//             .emit("close")
//             .end()
//       .monitor(ssh)

// ssh.on('close',close);

// ssh.connect(connect);
// child process
// var int = 755;
var childProcess = require('child_process').spawn;
// var scp = childProcess('scp', 
//     ['-r', 
//       '-o StrictHostKeyChecking=no',
//       '-i',
//       '/home/ubuntu/scaleapp1.pem',
//       '/home/ubuntu/smallscale/resources/shellScripts',
//       'ubuntu@ec2-52-24-109-81.us-west-2.compute.amazonaws.com:/home/ubuntu']
//   )
// scp.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// scp.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// scp.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
    // spawn the slave using slaveId as the key
  var ssh = childProcess('ssh', [
      '-i',
      'C:/Users/minh_/Desktop/Scalability/resources/scaleapp1.pem',
      'ubuntu@52.37.1.141',
      'chmod +x ./shellScripts/runNode.sh'
    ])

  ssh.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ssh.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ssh.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
// });
