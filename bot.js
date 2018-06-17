var Discord = require('discord.js');

var bot = new Discord.Client();

bot.on('ready', () => {
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
    if (message.content.substring(0, 1) == '!') {
        let args = message.content.substring(1).split(' ');
        let cmd = args[0];
       
        //args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                message.channel.send("PONG");
               	break;
            // !roll
            case 'roll':
            	//message.channel.send("roulage de dey");
            	//
                try{
                    let request = args[1].split('+');
                let output = "";
                let total = 0;

                request.forEach(function(element) {

                    let test = element.split('d');
                    let nbDices = test[0];
                    let valueDices = test[1];
                    
                    if(valueDices === undefined){
                        total += parseInt(nbDices);
                    } else {
                        for (let i = 0; i < nbDices; i++) {
                            let result=Math.floor(Math.random() * valueDices) + 1;
                            total += result;

                            output = output.concat(" "+result+" ");
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

                message.channel.send("You rolled... "+total+" ("+output+")");
                }
                catch(e) {
                    message.channel.send("Invalid syntax; `!roll <count>d<sides>[+]<modifier>`");
                }
                
            	break;
            case 'maxwarp':
            	message.channel.send("Is the best(est)");
            	break;
            default:
				message.channel.send("This command existn't...");
				break;
         }
     }
});


bot.login("Mzk2NzE0MzgzODY4MTY2MTQ1.DSliaA.cV5JZacxM859eZAQpUiRWRKHxPw");