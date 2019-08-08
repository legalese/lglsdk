// preconditions
// no lglconfig.json present
//
// lgl init email@address
//
// opens a URL in the browser against ... auth0?
// that does an auth0 loop to return both email address and user_id key?
// save the user_id to lglconfig?
//
// the API backend will query auth0 to confirm that the email address and user_id being handed to us by the lgl client are legit.
//
// our endpoint needs a webhook that
// - creates a user in our db backend to note that this user has created an account against both auth0 and legalese
// - creates a customer against stripe unless that email address has been seen before
//

