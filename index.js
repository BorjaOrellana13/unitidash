const discord = require('discord.js');
const bot = new discord.Client();
const mongoose = require('mongoose');
const chalk = require('chalk');
const claudette = require('./module/links.js');
const fetch = require('node-fetch');
const config = require('./config.json');
const client = bot;

client.on('ready', async () => {
  const array = [
    {
      name: "Añade tu Proyecto 24/7",
      type: "WACHING"
    }
  ]

  setInterval(() => {
    function presence(){
      client.user.setPresence({
        status: "dnd",
        activity: array[Math.floor(Math.random() * array.length)],
      });
    }

    presence();    
  }, 5000);

  console.log(chalk.green(bot.user.tag));
})

mongoose
	.connect(process.env.MONGO,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
			autoIndex: false
		}
	)
	.then(() => {
		console.log(chalk.green('Conectado a MongoDB!'));
	})
	.catch(a => {
		console.log(chalk.red(a));
	});

setInterval(function() {
	claudette.find({}, function(err, docs) {
		if (err) console.log(err);
		if (!docs) return;
		docs.forEach(docs => {
			fetch(docs.link);
		});
	});
}, 30000);



require('./dashboard/server.js')(bot);
bot.login(process.env.TOKEN);
