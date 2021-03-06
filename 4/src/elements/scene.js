import {app} from '../app';
import {assetsLoader} from '../modules';

import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

class MTLModule {
  constructor(url, fix) {
    const loader = new THREE.MTLLoader();

    this.bridge = {
      mesh(mesh) {
        this.wait(new Promise(resolve => {
          loader.load(url, function(materials) {
            materials.preload();

            mesh.traverse(child => {
              if (!child.material) return;

              const name = child.material.name;
              const material = materials.materials[name];

              fix(material, name);
              child.material = material;
            });

            resolve();
          });
        }));

        return mesh;
      }
    };
  }
}

assetsLoader.expect('scene');

export const scene = new WHS.Importer({
  loader: new THREE.OBJLoader(),
  url: './assets/obj/scene.obj',

  parser(group) {
    assetsLoader.resolve('scene');
    return this.applyBridge({mesh: group}).mesh;
  },

  modules: [
    new MTLModule('./assets/obj/scene.mtl', (material, name) => {
      material.map = WHS.TextureModule.load(`./assets/tex/${name}Ambient_Occlusion.jpg`);
    })
  ],

  scale: [0.1, 0.1, 0.1]
});

const state = app.use('state');

assetsLoader.on('complete', () => {
  state.to('preparingAudio');
})
