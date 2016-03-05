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
      '-o StrictHostKeyChecking=no',
      '-i',
      '/home/ubuntu/scaleapp1.pem',
      'ubuntu@52.37.1.141',
      'chmod -R +x ./shellScripts && ./shellScripts/setUpScript.sh'
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
