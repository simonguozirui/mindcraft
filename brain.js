require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');

const { MuseClient, channelNames } = require('muse-js');

async function connectToMuse() {
    const client = new MuseClient();
    await client.connect();
    await client.start();
    
    const leftChannel = channelNames.indexOf('AF7'); // Left eye electrode
    const blinks = client.eegReadings
        .filter(r => r.electrode === leftChannel)
        .map(r => Math.max(...r.samples.map(Math.abs)))
        .filter(max => max > 500);

    blinks.subscribe(() => {
        console.log('Blink!');
        document.getElementById("world").click()
        // const clickEvent = new Event('keydown');
        // clickEvent.keyCode = 32; // Space key
        // document.dispatchEvent(clickEvent);
    });
}

window.connectToMuse = connectToMuse;
