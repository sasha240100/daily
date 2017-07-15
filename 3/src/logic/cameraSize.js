import {app} from '../app';
import {resize} from '../modules';
import {orthoCamera} from '../camera';
// import {testTexture} from '../elements/testTexture';
import {material} from '../materials/lines';

const getSize = () => app.get('renderer').getSize();

function setCameraSize() {
  const {width, height} = getSize();
  const {native} = orthoCamera;

  native.left = - width / 2;
  native.right = width / 2;
  native.top = - height / 2;
  native.bottom = height / 2;

  // testTexture.scale.set(width, height, 1);
  material.uniforms.resolution.value.set(width, height);

  native.updateProjectionMatrix();
}

setCameraSize();
resize.addCallback(setCameraSize);

console.log(orthoCamera);
