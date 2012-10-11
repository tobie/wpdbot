var jerk = require("jerk");
var fs = require("fs");
//var template = require("./lib/template");
var url = require("url");
var options = JSON.parse(fs.readFileSync("./options.json"));
var commands = JSON.parse(fs.readFileSync("./commands.json"));

for (k in commands) {
  var lc = k.toLowerCase();
  if (lc !== k) {
    commands[k.toLowerCase()] = commands[k];
    delete commands[k];
  }
}

jerk( function( j ) {
  j.watch_for(new RegExp("^!(\\S+)(?:\\s+(\\S+))?", 'i'), function(message) {
    var nick = message.match_data[2] || message.user,
        cmd = (message.match_data[1] || '').toLowerCase(),
        msg = commands[cmd];
    if (msg) {
      message.say(nick + ": " + msg);
    } else {
      message.say("I'm sorry, " + message.user + ", I do not understand \"" + cmd + "\".");
    }
  });

  j.watch_for(/^wpd\s+(.*)$/, function(message) {
    var terms = message.match_data[1];
    u = url.format({
      protocol: 'http',
      host: 'docs.webplatform.org',
      path: 'w/index.php',
      query: {
        title: "Special:Search",
        fulltext: "Search",
        search: terms
      }
    });
    message.say(message.user + ', here is the result of your search for "' + terms + '": ' + u);
  });
}).connect(options);
