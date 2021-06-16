# labelmaker-appliance

Format and print labels from a web app. Built to make it easier to quickly make nice labels in a shop.

# Installation

For my use case I'm running this on a Raspberry Pi and printing to a Dymo label maker, so I need to install CUPS and the printer driver:

```
sudo apt install cups printer-driver-dymo libcups2-dev
sudo su
curl https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-armv6l.tar.gz | tar --strip-components 1 -xvz -C /usr/local --exclude='CHANGELOG.md' --exclude='LICENSE' --exclude='README.md'
npm install
```

PM2 can be used to start the web app on boot:

```
sudo npm install -g pm2
pm2 startup
# Run the command that is printed
pm2 start index.js
pm2 save
```
