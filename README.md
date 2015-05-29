# rqmailer
rqmailer is a email gateway for the RedQueen network.  Currently it only supports a whitelist of email addresses. 

## Usage
* Message like this sent to [RedQueen](https://github.com/tylercrumpton/red-queen)
```
{
   "destination": "rqmailer",
   "data": {
       "body": "pizza!",
       "to": "awesome@awesomesauce.com",
       "subject": "re: kt"
   }
}
```
* more is needed here

## Software
* [nodejs](https://nodejs.org/) - I mean?
* [nodemailer](https://www.npmjs.com/package/nodemailer) - email library
* [nodemailer-smtp-transport](https://github.com/andris9/nodemailer-smtp-transport)  - basic smtp transport for nodemailer
* [mandrill](https://mandrill.com/) - smtp agent 
* [nano](https://github.com/dscape/nano) - couchdb library
