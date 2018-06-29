var Discord = require('discord.js');
var fs = require('fs');
var fileName = './config.json';
var config = require(fileName);
var bot = new Discord.Client();
var prefix = config.prefix;


bot.on('ready', () => {
    bot.user.setActivity(prefix + 'halp for command list')
    console.log("Logged in");
});

/*bot.on('message', message => {
    if (message.content === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});*/


let dice = {
    sides: 6,
    roll: function () {
        let randomNumber = Math.floor(Math.random() * this.sides) + 1;
        return randomNumber;
    }
}


bot.on('message', message => {
    if (message.content.substring(0, 1) == prefix) {
        let args = message.content.substring(1).split(' ');
        let cmd = args[0];

        //args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                message.channel.send("PONG");
                break;
                // !roll
            case 'roll':
                //message.channel.send("roulage de dey");
                //
                try {
                    let request = args[1].split('+');
                    let output = "";
                    let total = 0;

                    request.forEach(function (element) {

                        let test = element.split('d');
                        let nbDices = test[0];
                        let valueDices = test[1];

                        if (valueDices === undefined) {
                            total += parseInt(nbDices);
                        } else {
                            for (let i = 0; i < nbDices; i++) {
                                let result = Math.floor(Math.random() * valueDices) + 1;
                                total += result;

                                output = output.concat(" " + result + " ");
                            }


                        }
                    });
                    /*
                                    let nbDices = request[0];
                                    let valueDices = request[1];
                                    let total=0;
                                    //message.channel.send("rolling "+nbDices+" "+valueDices+" sided dice(s)");
                                    for (let i = 0; i < nbDices; i++) {
                                        let result=Math.floor(Math.random() * valueDices) + 1;
                                        total = total+result;
                                        if(i!=0)
                                            var output = output.concat(" + "+result);
                                        else
                                            var output = ""+result;
                                    }*/

                    message.channel.send("You rolled... " + total + " (" + output + ")");
                } catch (e) {
                    message.channel.send("Invalid syntax; `!roll <count>d<sides>[+]<modifier>`");
                }

                break;
            case 'maxwarp':
                message.channel.send("Is the best(est)");
                break;
            case 'halp':
                message.channel.send({
                    embed: {
                        color: 0x009900,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: "COMMANDS",
                        url: "https://github.com/Fulgryn/discord-bot",
                        description: "prefix = `" + prefix + "`",
                        fields: [{
                                name: "`" + prefix + "ping`",
                                value: "Verifies that I am online."
      },
                            {
                                name: "```" + prefix + "roll <count>d<sides>[+]<modifier>```",
                                value: "Rolls some dice."
      },
                            {
                                name: "`" + prefix + "maxwarp`",
                                value: "Saves Us All."
      },
                            {
                                name: "`" + prefix + "halp`",
                                value: "Displays just that. Yup."
      },
                                 {
                                name: "`" + prefix + "prefix <new prefix>`",
                                value: "Changes the prefix for bot commands."
      },
    ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: bot.user.avatarURL,
                            text: "© Pomme"
                        }
                    }
                });
                break;
            case 'prefix':
                if (args[1].length == 1) {
                    config.prefix = args[1];
                    prefix=config.prefix;
                    fs.writeFile(fileName, JSON.stringify(config, null, 2), function (err) {
                        if (err) return console.log(err);
                        console.log(JSON.stringify(config));
                        console.log('writing to ' + fileName);
                        bot.user.setActivity(prefix + 'halp for command list');
                        message.channel.send("prefix changed to `" + prefix + "`");
                    });

                } else {
                    message.channel.send("Your prefix is too long!");
                }


                break;
            default:
                message.channel.send("This command existn't...");
                break;
        }
    }
});


bot.login(config.token);
