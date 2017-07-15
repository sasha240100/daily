import {camera} from '../camera';

const listener = new THREE.AudioListener();
camera.native.add(listener);

// create a global audio source
export const sound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
audioLoader.load('./assets/background.mp3', buffer => {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(1);
	// sound.play();
});
