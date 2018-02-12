## Prepare
`npm install nodemon babel-cli babel-preset-es2015 babel-preset-stage-0 -y`
## Install express.js
`npm install express --save`__
`npm install express@5.0.0-alpha.6 --save`__
## Check for all express.js versions in json format
`npm view express versions --json`
## Use middleware
 `npm instal morgan --save`__
 `npm install ejs --save`__
 `npm install body-parser`
###### body-parser save all the form into a object called body, which can be ###### used for post

## Socket I/O
There are two parts in socket I/O: Server side and Client side
###### Install
`npm install socket.io --save`
Than config the soket in client and server side.

## JWT
## HS256: symmetric	algorithm
## RS256: Rivest-Shamir-Adleman, needs private and public keys
sign: private key__
verify: public key__
1). Generate private key: `ssh-keygen -t rsa -b 2048 -f private.key`
2). Then generate public key depends on the private.key: `openssl rsa -in private.key -pubout -outform PEM -out public.key`
