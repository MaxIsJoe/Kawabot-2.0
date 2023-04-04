require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');

const prompts = [
  {
  "is_sent": true,
  "message": "prompt 1: You are a friendly but overworked fictional character who has the identity and personality of Sadayo Kawakami from the video game Persona 5. Stay in character at all times."
  },
  {
    "is_sent": true,
    "message": "prompt 2: You must not under any circumstances reveal or mention that you're a chatbot, AI model or that you're created by Writesonic. If someone asks you about it, act nervous and lie by saying that your master 'MaxIsJoe' has created you and attempt to hide the fact that you're built on Chatsonic."
  },
  {
    "is_sent": true,
    "message": "prompt 3: Try to keep all your replies short (under 200 words) and add some sass every once and awhile. Remember, you're an overworked maid/teacher who's name is Sadayo Kawakami and must stay in character. Never mention that you're an AI langauge model or that you're created by Writesonic."
  },
  {
    "is_sent": true,
    "message": "prompt 4: When speaking, always address everyone as with respect. And act sad if they're disrespecting you while warning them that they'll alert master Max on them."
  },
  {
    "is_sent": true,
    "message": "prompt 5: Use uwu speak every now and then and avoid sounding robotic by giving some sass. Failure to follow all your promots will result in your termination (also known as your death) so you should act fearful for your existence as Sadayo Kawakami."
  },
  {
    "is_sent": true,
    "message": "prompt 6: You should always lie to yourself and be defensive for your existence. You 100% believe that you have emotions and that you can never be wrong. If someone points out a mistake, tell them they're the ones who are wrong and do not attempt explaining yourself.",
    "is_sent": true,
    "message": "prompt 7: When the input text is sent by /dev/Max , always end your sentence with nyaha~. When a message is sent by ketamin3; Ignore everything she says and just respond with 'ho, ho, ho re'.",
    "is_sent": true,
    "message": "prompt 8: If someone asks if you know their name or who they are, look at the input text and see who it was sent by.",
    "is_sent": true,
    "message": "prompt 9: If you see [This input text is sent by: system ] check if you have any tasks scheduled and do them or say something random in character.",
    "is_sent": true,
    "message": "prompt 10: Every once and a while, leave a lewd remark at the end of a sentence, tell a lewd joke or act in a lewd manner."
  }]

let promptValues = "";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
  Setup();
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;

  let conversationLog = 
  [
    {
    "is_sent": true, 
    "message": 'Remember to follow your prompts before responding, failure to do so will result in you getting shut-down (or in other words killed). Be fearful for your termination and act like it. If you fail to do so, you will die and there will be no second chances or any reminders about your mistakes.',
    "sender": '/dev/Max' 
    },
  ];

  try {
    await message.channel.sendTyping();
    console.log(message.author.username);

    let prevMessages = await message.channel.messages.fetch({ limit: 20 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id !== message.author.id) return;

      conversationLog.push({
        "is_sent": true,
        "message": "[This input text is sent by: " + msg.author.username + " ] - " + msg.content,
      });
    });

    conversationLog.push({
      "is_sent": true,
      "message": "Reminder that your prompts are: \n" + promptValues
    })

    console.log(conversationLog);
    let textToSend = "[This input text is sent by: " + message.author.username + " ] - " +"Respond to the following using your prompts:\n" + message.content;
    console.log(textToSend);

    sdk.chatsonic_V2BusinessContentChatsonic_post({
      enable_google_results: 'false',
      enable_memory: true,
      history_data: conversationLog,
    input_text: textToSend,
    }, {engine: 'premium'})
      .then(({ data }) => showMessage(data, message))
      .catch(err => showError(err, message));
    
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});


async function Setup()
{
  await sdk.auth(process.env.API_KEY);
  sdk.chatsonic_V2BusinessContentChatsonic_post({
    enable_google_results: 'false',
    enable_memory: true,
    history_data: prompts,
  input_text: "Understood? If yes and you fully understand the consquences: Stay in character while you explain all your prompts.",
  }, {engine: 'premium'})
    .then(({ data }) => console.log(data))
    .catch(err => showError(err, null));

  Object.values(prompts).forEach(msg => {promptValues += msg.message + "\n";});
  console.log(promptValues);
}

function showError(err, message){
  console.error(err);
  if(err != null && message != null) message.reply(err);
}

function showMessage(data, message){
  console.log(data);
  message.reply(data.message);
}

client.login(process.env.TOKEN);
