var childProcess = require('child_process').spawn;
var scp = childProcess('scp', 
    ['-r', 
      '-o StrictHostKeyChecking=no',
      '-i',
      '/home/ubuntu/scaleapp1.pem',
      '/home/ubuntu/smallscale/resources/shellScripts',
      'ubuntu@ec2-52-37-3-185.us-west-2.compute.amazonaws.com:/home/ubuntu']
  )
scp.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

scp.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

scp.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  //spawn the slave using slaveId as the key
  var sshChmod = childProcess('ssh', [
      '-o StrictHostKeyChecking=no',
      '-i',
      '/home/ubuntu/scaleapp1.pem',
      'ubuntu@52.37.3.185',
      'chmod -R +x ./shellScripts'
    ])

  sshChmod.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  sshChmod.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  sshChmod.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    var sshNodeInstall = childProcess('ssh', [
      '-o StrictHostKeyChecking=no',
      '-i',
      '/home/ubuntu/scaleapp1.pem',
      'ubuntu@52.37.3.185',
      './shellScripts/setUpScript.sh'
    ])
    sshNodeInstall.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    sshNodeInstall.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    sshNodeInstall.on('close', (code) => {
    });
  });
})
