import Textlocal from 'textlocal-promise';
import moment from 'moment'

// api-key
const textlocal = new Textlocal({ apikey: 'cUVdxCZshK8-lat56zTIx1LG189Mc73t0lnlBgguMP' });
 
// username & hash
// const textlocal = new Textlocal({ username: 'din_hazan@hotmail.com', hash: 'my-hash' });
 
// username & password
// const textlocal = new Textlocal({ username: 'my-user', password: 'my-pass' });
 
 function sendMessage(customer, businessName) {

 
// Set the response format (json or xml)
textlocal.setFormat('json');
 
// Set the SMS message sender
textlocal.setSender(businessName);
 
 
// Send an SMS
const message = `Hello ${customer.name}! You have an appointment schedulled at ${moment(customer.time).format('llll')}.
                    For more information: http://schedullix.herokuapp.com/#/${businessName}`;
const numbers = [+('972' + customer.phone.toString())];
const optionalParams = { custom: 'custom field' };
return textlocal.sendSMS(message, numbers, optionalParams)
  .then(data => processSuccess(data)) // status === 'success'
  .catch(error => processFail(error)); // status === 'failure'
 
 }

 export default {
     sendMessage
 }
 
// Method chaining
// const textlocal = new Textlocal({ apikey: 'my-api-key' });
// textlocal.setFormat('xml').setSender('MrMaximus').sendSMS(message, numbers, optionalParams);