const defaults = Object.assign({}, WHS.MeshComponent.defaults, {
  geometry: {
    width: 100,
    height: 100,
    widthSegments: 10,
    heightSegments: 10
  }
});

const instructions = Object.assign({}, WHS.MeshComponent.instructions, {
  geometry: ['width', 'height', 'widthSegments', 'heightSegments']
});

export class PointGrid extends WHS.MeshComponent {
  constructor(params = {}) {
    super(params, defaults, instructions);
  }

  build({
    geometry: {width, height, widthSegments, heightSegments},
    material
  }) {
    return new THREE.Points(
      new THREE.PlaneBufferGeometry(
        width,
        height,
        widthSegments,
        heightSegments
      ),
      material
    )
  }
}
