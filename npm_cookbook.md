Verbose guide on setting up NPM Server

	Setting up the web server is very easy currently!

	First, we need to clone the repository of the website. To do this, do `git clone https://github.com/robertrenecker/boulderTrimble`
	
	From there, we will want to go into the server (`cd boulderTrimble/webapp/server`).
	
	Do `npm install` to install the necessary packages for the website.


	If you don't have npm on that computer, run `sudo apt-get install nodejs` and `sudo apt-get install npm` to install it!

	From there, we will need to install the client and build it, since the server relies on a built version of the client.

	`cd client && npm install && npm run build`

	From there, just go back to the server `cd ../` and then start the server using `npm start`, and after that, the app should be available on localhost:3000!


Step By Step Instructions Assuming Blank Linux Distribution

`git clone https://github.com/robertrenecker/boulderTrimble`

`cd boulderTrimble/webapp/server`

`sudo apt-get update`

`sudo apt-get install nodejs npm`

`npm install`

`cd client`

`npm install`

`npm run build`

`cd ../`

`npm start`

Go to localhost:3000