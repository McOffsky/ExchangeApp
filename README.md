## EXCHANGE APP
(there should be description of Exchange App, and it should be so epic, that Spielberg would want to buy rights to movie adaptation)

Build on ReactJS.

#### HOW TO RUN IT?

Requirements:
- Docker
- Docker Compose

Copy .env.dist to .env and, if needed, update value for `REACT_APP_EXCHANGE_WEBSERVICE_URL` to point to Exchnage webservice. Then run `make dev` to launch local environment.
First launch may take few minutes to automatic `npm install`.  

Makefile commands:
- `make dev` will start dev environment, and bind to port 3000
- `make bash` will attach to node container, where you can run `npm` commands
- `make build-prod` will build prod image
- `make run-prod` will build prod image and run it on port 3000
- `make tests` will execute tests on application