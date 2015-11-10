var child_process = require('child_process');
var parseLinkHeader = require('parse-link-header');
var readline = require('readline');

exports.main = function main() {
  var argv = process.argv.slice(2).concat(['-L', '-v']);
  var curl = child_process.spawn('curl', argv);
  attachListeners(0, curl, argv);
};

function attachListeners(i, curl, argv) {
  curl.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });

  var rl = readline.createInterface({
    input: curl.stderr,
  });

  rl.on('line', function(line) {
    if(line[0] !== '<') {
      return;
    }

    if(line.slice(0, '< Link: '.length) !== '< Link: ') {
      return;
    }

    var link = parseLinkHeader(line.slice('< Link: '.length));
    if(link.next) {
      curl.on('close', function(code) {
        if(code !== 0) {
          process.exit(code);
        }

        console.error('Request ' + i++ + ' done');
        console.log('\n');

        argv = argv.map(function(arg) {
          if(arg.indexOf('http') !== 0) {
            return arg;
          }
          return link.next.url;
        });
        curl = child_process.spawn('curl', argv);
        attachListeners(i, curl, argv);
      });
    }
  });
}
