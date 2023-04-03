const { client } = require("../index.js");
const https = require('https');
const domain = process.env.PUSH_URL


client.on("ready", async () => {
    
 let check = true;
        setInterval(function() {
            if(check){
                try{
                    https.get(`${domain}`, () =>{
                        // Don't really need to do anything, just want to make sure that this will actually keep an uptime.
                    });
                } catch (error){
                    check = false;
                }
            }
        }, 4 * 10000);
    
    console.log("Bot Ready...");
})
