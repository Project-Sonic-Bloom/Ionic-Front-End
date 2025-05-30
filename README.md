# Ionic-Front-End

### Entire project system architecture
![Final Year Project - Updated System architecture](https://github.com/user-attachments/assets/ad12e301-1f62-47b6-9c84-c940b18fe6f8)

## Quick start guide to runnig the app

### Prerequisites
Before starting, ensure you have:
- Node.js installed (v16 or later recommended)
- npm (comes with Node.js) or yarn
- VS Code (or alternative IDEs)
- A Git install
- A google cloud API key & map ID

### Install Ionic Framework, if you don't have it already
> npm install -g @ionic/cli

### Open the command prompt and clone this repository by running
> git clone https://github.com/Project-Sonic-Bloom/Ionic-Front-End

### Add environment variables
Open vscode
> code .

Open the folder Ionic-Front-End\Sonic-Bloom-Client\src\environments
Then create the file environments.prod.ts with the contents:

> export const environment = {
>  production: true,
>  
>  maps_key: 'placeholder'     <---- //Replace placehoder with your google cloud API in here
> };

Now open Ionic-Front-End\Sonic-Bloom-Client\src\main.ts
edit the line:
> script.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.maps_key + '&libraries=marker&callback=Function.prototype&map_ids=placeholder';    //Replace placeholder with your mapID

### Install dependencies
> cd ./Sonic-Bloom-Client
> npm install --legacy-peer-deps

### Run the app
> Ionic serve

### Development environment versions
Node version: v22.11.0
Npm version: npm: '10.9.0'
