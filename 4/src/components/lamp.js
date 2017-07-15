import {app} from '../app';

export class Lamp extends WHS.MeshComponent {
  // static defaults = {
  //   width: 10
  // };

  constructor(params) {
    super(params, Object.assign(WHS.MeshComponent.defaults, {
      width: 100,
      sideWidth: 20,
      radius: 0.5,
      offset: 0,
      color: 0x333333,
      angleOffset: 0
    }));

    this.manager.require('state', () => new WHS.StateModule());
    const state = this.manager.use('state');

    this.moveTime = 0;
    this.moveDelay = 0;

    state.set({
      width: this.params.width,
      curve: this.params.curve,
      offset: this.params.offset
    });

    state.update({
      width: width => {
        this.updateGeometries(
          this.buildGeometryCurves({
            width,
            radius: this.params.radius,
            sideWidth: this.params.sideWidth,
            curve: state.get('curve'),
            offset: state.get('offset')
          })
        );
      },

      offset: offset => {
        this.updateGeometries(
          this.buildGeometryCurves({
            width: state.get('width'),
            radius: this.params.radius,
            sideWidth: this.params.sideWidth,
            curve: state.get('curve'),
            offset: offset
          })
        );
      }
    });

    // state.set({width: 10});
  }

  updateGeometries({lampGeometry, lampLeftGeometry, lampRightGeometry}) {
    this.mesh.geometry.dispose();
    this.sideLeft.geometry.dispose();
    this.sideRight.geometry.dispose();

    this.mesh.geometry = lampGeometry;
    this.sideLeft.geometry = lampLeftGeometry;
    this.sideRight.geometry = lampRightGeometry;
  }

  build({width, sideWidth, radius, curve, offset, color}) {
    const materials = {
      lamp: new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
        // wireframe: true
      }),

      side: new THREE.MeshBasicMaterial({
        color: 0x333333,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
        // wireframe: true
      })
    };

    this.lampMaterial = materials['lamp'];
    this.sideMaterial = materials['side'];

    const {
      lampLeftGeometry,
      lampRightGeometry,
      lampGeometry
    } = this.buildGeometryCurves({width, radius, sideWidth, curve, offset});

    const makeLampSide = geometry => WHS.MeshComponent.from(
      new THREE.Mesh( // mesh
        geometry,
        materials['side']
      )
    );

    this.mesh = WHS.MeshComponent.from(
      new THREE.Mesh(
        lampGeometry,
        materials['lamp']
      )
    )

    this.sideLeft = makeLampSide(lampLeftGeometry);
    this.sideRight = makeLampSide(lampRightGeometry);

    this.mesh.add(this.sideLeft);
    this.mesh.add(this.sideRight);

    // console.log(this.mesh.native.layers);

    this.light = new WHS.PointLight({
      intensity: 0, // 0.05
      distance: 50,
      decay: 2
    });

    this.light.native.color = this.lampMaterial.color;

    this.mesh.native.layers.enable(1);
    this.mesh.add(this.light);

    this.lObject = new THREE.Object3D();
    this.lObject.add(this.mesh.native);

    this.object = new THREE.Object3D();
    this.object.add(this.lObject);

    this.angle = this.params.angleOffset;

    this.flyLoop = new WHS.Loop(() => {
      this.lObject.position.set(
        Math.sin(this.angle),
        Math.cos(this.angle),
        Math.sin(this.angle)
      );

      this.angle += 0.02;
    });

    app.addLoop(this.flyLoop);

    return this.object;
  }

  buildGeometryCurves({width = 100, radius, sideWidth, curve, offset = 0}) {
    const dimension = 64;
    const sideDimension = +(sideWidth / 100 * dimension * 0.5).toFixed();
    const lampDimension = dimension - (sideDimension * 2);

    const interpolation = 2 * 200; // 30 / 2 * 2 * 100 = 3000 // width / sideWidth *
    const sideSize = +(interpolation * sideWidth / 100 * 0.5).toFixed(); // 1000 * 2 / 30 = 66.6 => 67

    const cutPoints = [];

    for (let i = 0; i < interpolation; i++) {
      let u = (i / interpolation) * width / 100 + offset;

      // while (u > 1 && u < 0) {
      //   if (u > 1) u = u - 1;
      //   else u = u + 1;
      // }

      u = u - Math.floor(u);

      // console.log(u);

      // if (u >= 0 && u <= 1) {
        cutPoints.push(
          curve.getPointAt(u)
        );
      // }
    }

    if (cutPoints.length <= 2) {
      return {
        lampLeftGeometry: new THREE.Geometry(),
        lampRightGeometry: new THREE.Geometry(),
        lampGeometry: new THREE.Geometry()
      }
    }

    const curveCut = new THREE.CatmullRomCurve3(cutPoints);

    const points = curveCut.getPoints(interpolation);

    let leftVerts = points.slice(0, sideSize); // 0 - 66
    let lampVerts = points.slice(sideSize, interpolation - sideSize); // 67 - 2+++
    let rightVerts = points.slice(interpolation - sideSize, interpolation);

    leftVerts[leftVerts.length - 1] = lampVerts[0];
    rightVerts[0] = lampVerts[lampVerts.length - 1];

    const curveLamp = new THREE.CatmullRomCurve3(lampVerts);
    const curveLeft = new THREE.CatmullRomCurve3(leftVerts);
    const curveRight = new THREE.CatmullRomCurve3(rightVerts);

    const lampLeftGeometry = new THREE.TubeBufferGeometry(curveLeft, sideDimension, radius, 32, false);
    const lampRightGeometry = new THREE.TubeBufferGeometry(curveRight, sideDimension, radius, 32, false);
    const lampGeometry = new THREE.TubeBufferGeometry(curveLamp, lampDimension, radius, 32, false);

    return {
      lampLeftGeometry,
      lampRightGeometry,
      lampGeometry
    };
  }

  blink(time = 300) {
    const isOn = this.mesh.material.color.getHex() == 0xffffff;
    const destColor = isOn ? 0xbbbbbb : 0xffffff;
    const originColor = !isOn ? 0xbbbbbb : 0xffffff;

    this.mesh.material.color.setHex(destColor);
    setTimeout(() => this.mesh.material.color.setHex(originColor), time / 3);
    setTimeout(() => this.mesh.material.color.setHex(destColor), time);
  }

  fly(isFly) {
    if (isFly) this.flyLoop.start();
    else this.flyLoop.stop();
  }
}
