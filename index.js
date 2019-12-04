'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'My Calci';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Welcome to My Calci. You can say add 2 and 7, or multiply 5 and 9';
        //welcome screen message
        let displayText = "Welcome to My Calci"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers
const AddIntentHandler = {
  canHandle(handlerInput)  {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AddIntent'
  },
  handle(handlerInput){
    let speechText = '';
    let displayText = '';
    let intent = handlerInput.requestEnvelope.request.intent;
    let firstnumber = intent.slots.firstnumber.value;
    let secondnumber = intent.slots.secondnumber.value;

    if (firstnumber && secondnumber) {
        //Perform operation
        let result = parseInt(firstnumber) + parseInt(secondnumber);
        speechText = `The result of ${firstnumber} plus ${secondnumber} is ${result}`;
        displayText = `${result}`;

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(appName, displayText)
        .withShouldEndSession(true)
        .getResponse();   

    } else{
      //Ask for the required input
      return  handlerInput.responseBuilder
      .addDelegateDirective(intent)
      .getResponse(); 
    }

  }
};

const SubtractIntentHandler = {
    canHandle(handlerInput)  {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SubtractIntent'
    },
    handle(handlerInput){
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let firstnumber = intent.slots.firstnumber.value;
      let secondnumber = intent.slots.secondnumber.value;
  
      if (firstnumber && secondnumber) {
          //Perform operation
          let result = parseInt(secondnumber) - parseInt(firstnumber);
          speechText = `The result of ${secondnumber} minus ${firstnumber} is ${result}`;
          displayText = `${result}`;
  
          return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(appName, displayText)
          .withShouldEndSession(true)
          .getResponse();   
  
      } else{
        //Ask for the required input
        return  handlerInput.responseBuilder
        .addDelegateDirective(intent)
        .getResponse(); 
      }
  
    }
  };

  const MultiplyIntentHandler = {
    canHandle(handlerInput)  {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MultiplyIntent'
    },
    handle(handlerInput){
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let firstnumber = intent.slots.firstnumber.value;
      let secondnumber = intent.slots.secondnumber.value;
  
      if (firstnumber && secondnumber) {
          //Perform operation
          let result = parseInt(firstnumber) * parseInt(secondnumber);
          speechText = `The result of ${firstnumber} multiplied by  ${secondnumber} is ${result}`;
          displayText = `${result}`;
  
          return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(appName, displayText)
          .withShouldEndSession(true)
          .getResponse();   
  
      } else{
        //Ask for the required input
        return  handlerInput.responseBuilder
        .addDelegateDirective(intent)
        .getResponse(); 
      }
  
    }
  };

  const DivideIntentHandler = {
    canHandle(handlerInput)  {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DivideIntent'
    },
    handle(handlerInput){
      let speechText = '';
      let displayText = '';
      let intent = handlerInput.requestEnvelope.request.intent;
      let firstnumber = intent.slots.firstnumber.value;
      let secondnumber = intent.slots.secondnumber.value;
  
      if (firstnumber && secondnumber) {
          //Perform operation
          let result = parseInt(firstnumber) / parseInt(secondnumber);
          result = +result.toFixed(2); // two decimal places
          speechText = `The result of ${firstnumber} divided by ${secondnumber} is ${result}`;
          displayText = `${result}`;
  
          return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(appName, displayText)
          .withShouldEndSession(true)
          .getResponse();   
  
      } else{
        //Ask for the required input
        return  handlerInput.responseBuilder
        .addDelegateDirective(intent)
        .getResponse(); 
      }
  
    }
  };
  
  
//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'You can say add 5 and 7 or divide 63 by 7 ';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         AddIntentHandler,
                         SubtractIntentHandler,
                         MultiplyIntentHandler,
                         DivideIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
