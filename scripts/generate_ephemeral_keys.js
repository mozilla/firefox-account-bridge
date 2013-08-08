var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var existsSync = fs.existsSync || path.existsSync;

var VAR = path.join(__dirname, '..', 'server', 'var');
var CERT = path.join(VAR, 'root.cert');

function exec(file, args, next) {
  child_process.exec([file, args].join(' '), function(err, stdout, stderr) {
    if (err) throw err;
    if (stderr) console.error(stderr);
    next && next(stdout);
  });
}


// if keys already exist, do nothing
if (existsSync(CERT)) {
  process.exit(0);
}

var GENERATE_KEYPAIR = path.join(__dirname, '../node_modules/.bin/generate-keypair');
var CERTIFY = path.join(__dirname, '../node_modules/.bin/certify');

if (!existsSync(GENERATE_KEYPAIR)) {
  console.error('cannot find generate-keypair from jwcrypto. try: npm install');
  process.exit(1);
}

if (!existsSync(CERTIFY)) {
  console.error('cannot find certify from jwcrypto. try: rm -rf node_modules && npm install');
  process.exit(1);
}

console.log('*** Generating ephemeral keys used for testing ***');

exec(GENERATE_KEYPAIR, '-k 256 -a rsa', function(stdout) {
  if (stdout) console.log(stdout);
  if (!existsSync(VAR)) fs.mkdirSync(VAR);
  exec(CERTIFY, '-s key.secretkey -p key.publickey', function(cert) {
    fs.writeFileSync(CERT, cert);
    fs.unlinkSync('key.publickey');
    fs.renameSync('key.secretkey', path.join(VAR, 'root.secretkey'));
  });
});
