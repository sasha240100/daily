import createBackground from 'three-vignette-background';
import {app} from '../app';
import {resize} from '../modules';

class Background extends WHS.MeshComponent {
  build() {
    return createBackground({
      aspect: window.innerWidth / window.innerHeight,
      grainScale: window.innerHeight / window.innerWidth * 0.001
    });
  }

  style(opt) {
    this.native.style(opt);
  }
}

app.add(new Background()).then(bg => {
  resize.addCallback(() => {
    bg.style({
      aspect: window.innerWidth / window.innerHeight,
      grainScale: window.innerHeight / window.innerWidth * 0.001
    })
  })
});
