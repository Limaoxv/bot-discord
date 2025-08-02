const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`🤖 Bot online como ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!jogar')) {
        const args = message.content.split(' ').slice(1);
        let jogo = args.join(' ');

        if (!jogo) {
            return message.reply('Use: `!jogar nome-do-jogo`');
        }

        if (message.content.includes('@everyone')) {
            message.channel.send(`🎮 ${message.author} chamou todo mundo para jogar **${jogo.replace('@everyone', '').trim()}**!`);
        } else if (message.content.includes('@here')) {
            message.channel.send(`🎮 ${message.author} chamou a galera para jogar **${jogo.replace('@here', '').trim()}**!`);
        } else {
            message.channel.send(`🎮 ${message.author} quer jogar **${jogo}**!`);
        }
    }
});

client.login(process.env.TOKEN);