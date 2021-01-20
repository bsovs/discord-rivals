
const reply = require("../../../services/reply");
const links = require("../links");

const _ = require('lodash');
const assert = require('assert');
const chai = require('chai'),
    spies = require('chai-spies');
const should = chai.should();
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const spy = require("sinon/lib/sinon/spy");
chai.should();
chai.use(sinonChai);
chai.use(spies);

//INIT CONSTANTS
let message, client;

describe('links Unit Tests', function () {

    beforeEach(function () {
        //refresh inputs
        chai.spy.restore();

        message = {channel: {send: null}, reply: null, delete: null};
        message.channel.send = (toSend) => toSend;
        message.reply = (toSend) => new Promise(resolve => resolve(toSend));
        message.delete = (toDelete) => toDelete;

        const testCommand = '!links';
        message.content = testCommand;
        message.cleanContent = testCommand;
    });

    it('should return a message', function () {
        //INPUT
        const message_args = [];

        //MOCK
        chai.spy.on(reply, 'basic');

        //EXECUTE
        links.execute(message, message_args);

        //OUTPUT
        expect(reply.basic).to.have.been.called(1);
        expect(reply.basic).to.have.been.called.with(message, `Spreadsheet: https://docs.google.com/spreadsheets/d/1sQPxsiRaFooKEptLHMhuoIEj1lgR1GL9QN3ax9i5OAg/edit#gid=289022380`);
    });
});