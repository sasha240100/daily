
const t = 10;
const ty = 40;

export const lampData = {
  'beforeScene': {
    position: [
      new THREE.Vector3(-10, 40, 10),
      new THREE.Vector3(-t, t + ty, t),
      new THREE.Vector3(-t, t + ty, -t),
      new THREE.Vector3(t, t + ty, -t)
    ],

    rotation: [
      new THREE.Euler(),
      new THREE.Euler(),
      new THREE.Euler(),
      new THREE.Euler(),
    ]
  },

  'scene': {
    position: [
      new THREE.Vector3(-10, 10, 10),
      new THREE.Vector3(16, 13, -8),
      new THREE.Vector3(13, 15, 7),
      new THREE.Vector3(-6, 4, -7)
    ],

    rotation: [
      new THREE.Euler(0, Math.PI / 4, Math.PI / 4),
      new THREE.Euler(0, Math.PI / 3, 0),
      new THREE.Euler(0, - Math.PI / 12, Math.PI / 2),
      new THREE.Euler(0, Math.PI / 6, - Math.PI / 12),
    ]
  }
};
