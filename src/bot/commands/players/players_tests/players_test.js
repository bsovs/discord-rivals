
const reply = require("../../../services/reply");
const database = require('../../../../database');
const players = require("../players");

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

describe('players Unit Tests', function () {

    beforeEach(function () {
        //refresh inputs
        chai.spy.restore();

        message = {channel: {send: null}, reply: null, delete: null};
        message.channel.send = (toSend) => toSend;
        message.reply = (toSend) => new Promise(resolve => resolve(toSend));
        message.delete = (toDelete) => toDelete;

        const testCommand = '!players';
        message.content = testCommand;
        message.cleanContent = testCommand;
    });

    it('should return a message', async function () {
        //INPUT
        const message_args = [];
        const _players = [
            {
                "name": "foo",
                "value": "IGN: undefined\n            Rank: undefined\n            Roles: undefined\n            "
            }
        ];

        //MOCK
        chai.spy.on(reply, 'table');
        chai.spy.on(database, 'findAll', (str, val)=>Promise.resolve([{'Name':"foo"}]));

        //EXECUTE
        await players.execute(message, message_args);

        //OUTPUT
        expect(reply.table).to.have.been.called(1);
        expect(reply.table).to.have.been.called.with(message, _players, true, 'Players',
            'Participating players in Discord Rivals', null, null, 'blue');
    });
});