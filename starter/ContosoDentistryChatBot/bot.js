// // Copyright (c) Microsoft Corporation. All rights reserved.
// // Licensed under the MIT License.

// const { ActivityHandler, MessageFactory } = require('botbuilder');

// const { QnAMaker } = require('botbuilder-ai');
// const DentistScheduler = require('./dentistscheduler');
// const IntentRecognizer = require("./intentrecognizer")

// class DentaBot extends ActivityHandler {
//     constructor(configuration, qnaOptions) {
//         // call the parent constructor
//         super();
//         if (!configuration) throw new Error('[QnaMakerBot]: Missing parameter. configuration is required');

//         // create a QnAMaker connector
//         try {
//             this.qnaMaker = new CustomQuestionAnswering({
//                 knowledgeBaseId: process.env.ProjectName,
//                 endpointKey: process.env.LanguageEndpointKey,
//                 host: process.env.LanguageEndpointHostName
//             });
//         } catch (err) {
//             console.warn(`QnAMaker Exception: ${ err } Check your QnAMaker configuration in .env`);
//         }
       
//         // create a DentistScheduler connector
      
//         // create a IntentRecognizer connector


//         this.onMessage(async (context, next) => {
//             if (!process.env.ProjectName || !process.env.LanguageEndpointKey || !process.env.LanguageEndpointHostName) {
//                 const unconfiguredQnaMessage = 'NOTE: \r\n' +
//                     'Custom Question Answering is not configured. To enable all capabilities, add `ProjectName`, `LanguageEndpointKey` and `LanguageEndpointHostName` to the .env file. \r\n' +
//                     'You may visit https://language.cognitive.azure.com/ to create a Custom Question Answering Project.';

//                 await context.sendActivity(unconfiguredQnaMessage);
//             } else {
//                 console.log('Calling CQA');

//                 const enablePreciseAnswer = process.env.EnablePreciseAnswer === 'true';
//                 const displayPreciseAnswerOnly = process.env.DisplayPreciseAnswerOnly === 'true';
//                 const response = await this.qnaMaker.getAnswers(context, { enablePreciseAnswer: enablePreciseAnswer });

//                 // If an answer was received from CQA, send the answer back to the user.
//                 if (response.length > 0) {
//                     var activities = [];

//                     var answerText = response[0].answer;

//                     // Answer span text has precise answer.
//                     var preciseAnswerText = response[0].answerSpan?.text;
//                     if (!preciseAnswerText) {
//                         activities.push({ type: ActivityTypes.Message, text: answerText });
//                     } else {
//                         activities.push({ type: ActivityTypes.Message, text: preciseAnswerText });

//                         if (!displayPreciseAnswerOnly) {
//                             // Add answer to the reply when it is configured.
//                             activities.push({ type: ActivityTypes.Message, text: answerText });
//                         }
//                     }
//                     await context.sendActivities(activities);
//                     // If no answers were returned from QnA Maker, reply with help.
//                 } else {
//                     await context.sendActivity('No answers were found.');
//                 }
//             }

//             // By calling next() you ensure that the next BotHandler is run.
//             await next();
//     });

//         this.onMembersAdded(async (context, next) => {
//         const membersAdded = context.activity.membersAdded;
//         //write a custom greeting
//         const welcomeText = '';
//         for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
//             if (membersAdded[cnt].id !== context.activity.recipient.id) {
//                 await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
//             }
//         }
//         // by calling next() you ensure that the next BotHandler is run.
//         await next();
//     });
//     }
// }

// module.exports.DentaBot = DentaBot;
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
