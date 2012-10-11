var jerk = require("jerk");
var fs = require("fs");
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

var others = {
  wpd: function(rest) {
     u = url.format({
        protocol: 'http',
        host: 'docs.webplatform.org',
        path: 'w/index.php',
        query: {
          title: "Special:Search",
          fulltext: "Search",
          search: rest
        }
      });
      return 'Here is the result of your search for "' + rest + '": ' + u;
  },
  
  help: function() {
    var output = "Here's a list of all the commands I support: ";
    var c = Object.keys(commands);
    Object.keys(others).forEach(function(o) {
      c.push(o)
    });
    c.sort();
    var last = c.pop();
    
    output += c.join(', ');
    output += ", and " + last;
    output += ". You can message me privately to see what each one does.";
    return output;
  }
};

jerk( function( j ) {
  j.watch_for(new RegExp("^(?:([^!?:\\s]+):?)?\\s*!(?:(\\w+))(?:\\s+(.*)$)?", 'i'), function(message) {
    var nick = message.match_data[1] || message.user,
        cmd = (message.match_data[2] || '').toLowerCase(),
        rest = (message.match_data[3] || '').trim();
    
    if (others[cmd]) {
      message.say(nick + ": " + others[cmd](rest));
    } else if (commands[cmd]) {
      message.say(nick + ": " + commands[cmd]);
    } else {
      message.say("I'm sorry, " + message.user + ", I do not understand \"" + cmd + "\".");
    }
  });
}).connect(options);
