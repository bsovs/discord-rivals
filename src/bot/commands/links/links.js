const reply = require('../../services/reply');

module.exports = {

    name: 'links',               
    description: 'Get links to spreadsheets and other resources',

    execute(message, args) {
        
		// do stuff here
        // args is an array of words that came after the command ex. ['abc', '123']
        // message variable is used to get properties from the message. learn more at https://discord.js.org/#/docs/main/stable/class/Message
        
        reply.basic(message, `Spreadsheet: https://docs.google.com/spreadsheets/d/1sQPxsiRaFooKEptLHMhuoIEj1lgR1GL9QN3ax9i5OAg/edit#gid=289022380` );
		
		//check out services/reply.js for list of available reply methods
    }
};
