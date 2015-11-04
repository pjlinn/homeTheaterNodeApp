
1. Mongod must be running. Doesn't happen automatically and when you use the command 'mongod' you get an error. 
	- Run this in a terminal window to get it going: mongod --config /usr/local/etc/mongod.conf
	- Also had these notes: 
		To have launchd start mongodb at login:
		  ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
		Then to load mongodb now:
		  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
		Or, if you don't want/need launchctl, you can just run:
		  mongod --config /usr/local/etc/mongod.conf

2. Start the service: nodemon path/bin/www

3. Add data: jasmine-node path/spec/createComponents_spec.js

4. Navigate to localhost:3000/home