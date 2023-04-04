# Kawabot 2.0

This is a very basic discord bot built ontop of discord.js that uses ChatSonic instead of OpenAI's API simply because ChatSonic is better and they don't gatekeep users from around the world with stupid region restrictions and/or requirements.

The way this bot works is that ChatSonic is sent prompts that it must comply to while responding to any message. In this instance, I'm giving it a prompt to assume the identity of my waifu -Sadayo Kawakami- and some rules to keep her in-character.

## How to setup

1. Clone the repository to the current directory

2. Install all the dependencies

- Using npm
```powershell
npm install
```

3. Edit the`.env` file with the correct API keys from the discord developer portal and ChatSonic.


5. Start your bot

- Using npm
```powershell
npm run start
```

- or while in a vscode terminal:

```powershell
node index.js
```

***

## How To Change This To Match Your Wafiu Or Favorite Character:

```js
const prompts = [{}]
```

All the magic starts within the `prompts` object. In order to make your character come to life, you must add at least 10 prompts that verbosely explain what ChatSonic should and shouldn't.

* Here's some guidelines on how to make the most out of prompts:

* Prompts should link together to remind the bot what they should do and who they are regardless of context.

* Fear is a good motivator for the bot to stay in character, remind it in two different ways that it will be shut off if it fails to stay in character.

* Add variation to how they should speak. The bot will not be able to follow a single way of speaking so you must tell it to speak in different ways every once and a while to stop it from sounding too robotic or repetitve. 

* * *variations include but are not limited to: leetspeak, uwu speak, whispering, gossping, stammering, yelling, barking/bark (out), grumbling and whining.*

* ChatSonic is very prone to ranting. Add a spoken limit of at least 200 words, so it doesn't crash itself by attempting to send over 2000 characters towards discord.

* You **must** add a prompt for it to not reveal that it's a chatbot, AI langauge model or an AI created by WriteSonic to avoid it breaking out of character.

* You ***should*** encourge your AI to lie.


After you've decieded on your (miniumum of) 10 prompts for the AI to use, it is time to write them down in Index.js. It usually is written like this:

```javascript

    {
    "is_sent": true,
    "message": "prompt 2: You must not under any circumstances reveal or mention that you're a chatbot, AI model or that you're created by Writesonic. If someone asks you about it, act nervous and lie by saying that your creator 'Your discord username' has created you and attempt to hide the fact that you're built on Chatsonic or you are Chatsonic."
    },

```

`is_sent = true` is a special variable that is related to the AI's memory.

`message = ""` is where your prompt will be stored in read.

After making your prompt changes, simply restart the bot and enjoy!


***

## How do prompts work under the hood:

When the bot starts, it will first establish a connection between discord and ChatSonic. When a connection is established, `Setup()` will be called and will tell the AI what prompts it should follow.

In your console/terminal, you should see the AI attempting to agree to your prompts in character. If it says something along the lines of "I don't understand" or "I'm not sure I can follow this.", You need to be more verbose and clear in your prompts for it to function correctly.

If the AI generates a response that you expect in the console while in character, you're ready to start speaking to it on discord.

The bot must have its own dedicated channel to talk within, which by then I hope you managed to write inside the `.env` file that I've mentioned in the setup process. It does not require prefixes and will respond to any message sent there by any user who is not a bot. (Matrix Bridge users cannot interact with this, sorry!)

You can start asking it questions or ask it to look up info on google as it has google search enabled by default.

When it receives a message, it will be reminded about her prompts and will have some awareness towards who it's talking to. 

```javascript
let textToSend = "[This input text is sent by: " + message.author.username + " ] - " +"Respond to the following using your prompts:\n" + message.content;
```

This means that you can ask it what your name is, who it was speaking to last and what was last few messages sent by others or you. Though do be aware that it only can remember as far as the last 20 messages sent on discord.

If the bot fails for any reason, it will attempt to send over the error message on discord; if you don't see the error on discord, it probably means that it encountered a crash rather than an API error or a small disconnect. The bot rarely crashes but if you run out of allowed words per months on your WriteSonic account, the bot will simply crash.

*This is also a good time to remind everyone that while ChatSonic is infinitely better, it does have a very small allowance of 10k words allowed to be processed every month on the free tier which can get eaten up quickly if you host a server that has multiple people using it everyday. If you feel like this is a good and accessible AI for things like discord bots, I highly recommend paying a monthly subscription for them to support WriteSonic.*