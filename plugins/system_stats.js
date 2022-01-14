/*Copyright (C) 2021 yasas.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

const rider = require('rider-public');
const Amdi = QueenAmdi.events
const Build = QueenAmdi.build
const {MessageType, MessageOptions, Mimetype} = require('@blackamda/queenamdi-web-api');
const {spawnSync} = require('child_process');
const chalk = require('chalk');
const axios = require('axios');
const fs = require('fs');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('system_stats');

var SYSDTXT = ''
if (Build.LANG == 'SI') SYSDTXT = '💻 පද්ධතිය'
if (Build.LANG == 'EN') SYSDTXT = '💻 sytem'

var VER = ''
if (Build.LANG == 'SI') VER = '🧬 Version'
if (Build.LANG == 'EN') VER = '🧬 Version'

var MSG = ''
if (Build.ALIVEMSG == 'default') MSG = '```Hey There! Bot Online now. 🇱🇰🎭```\n\n*Developer:* ```Yasas dileepa```\n\n*Youtube channel :* https://tinyurl.com/y4y4wnyp *\n\n```Thank You For Using GOST RIDER🇱🇰```'
else MSG = Build.ALIVEMSG


Amdi.operate({pattern: 'alive', fromMe: Work_Mode, desc: Lang.ALIVE_DESC,  deleteCommand: false}, (async (message, match) => {
    await QueenAmdi.amdi_setup()
    var logo = await axios.get (Build.ALIVE_LOGO, {responseType: 'arraybuffer'})
    var PIC = Buffer.from(logo.data)

    const media = await message.client.prepareMessage(message.jid, PIC, MessageType.image, { thumbnail: PIC })

    var BUTTHANDLE = '';
    if (/\[(\W*)\]/.test(Build.HANDLERS)) {
        BUTTHANDLE = Build.HANDLERS.match(/\[(\W*)\]/)[1][0];
    } else {
        BUTTHANDLE = '.';
    }
        
    const buttons = [
        {buttonId: BUTTHANDLE + 'qaversion', buttonText: {displayText: VER }, type: 1},
        {buttonId: BUTTHANDLE + 'qasysstats', buttonText: {displayText: SYSDTXT }, type: 1}
    ]
    const buttonMessage = {
        contentText: MSG,
        footerText: ' © Gost Rider',
        buttons: buttons,
        headerType: 4,
        imageMessage: media.message.imageMessage    
    }
    await message.client.sendMessage(message.jid, buttonMessage, MessageType.buttonsMessage);
}))

Amdi.operate({pattern: 'qasysstats', fromMe: Work_Mode, desc: Lang.SYSD_DESC, dontAddCommandList: true,  deleteCommand: false}, (async (message, match) => {
    await QueenAmdi.amdi_setup()
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text, {quoted: message.data}
    );
}));

Amdi.operate({pattern: 'qaversion', fromMe: Work_Mode, desc: Lang.BOT_V, dontAddCommandList: true,  deleteCommand: false}, (async (message, match) => {
    await RIDER.rider_setup()
    await message.client.sendMessage(message.jid, 
        `*🧬 Gost_Rider Version 🧬*\n\n` + 
        '```Installed version :```\n' +
        Lang.version + 
        `\n\nCheck official website : www.github.com/yasasdileepa/`
   , MessageType.text, {quoted: message.data});
    
}));
