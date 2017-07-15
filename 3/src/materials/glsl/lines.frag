#define PHYSICAL

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

// custom
varying vec2 vUv;
uniform vec2 lines[linesCount*2];
uniform int lineMap[2];
uniform float lineWidth;
uniform vec3 color1;
uniform vec3 color2;
uniform float time;

#ifndef STANDARD
	uniform float clearCoat;
	uniform float clearCoatRoughness;
#endif

varying vec3 vViewPosition;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <lights_pars>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>


// float pow2(float num) {
//   return pow(num, 2.0);
// }

bool isSquareTriangle(float c, float a, float b) {
  return pow2(c) >= pow2(a) + pow2(b);
}

float drawLineRecursive(vec2 start, vec2 end, float limit, float alpha, float lineAlpha, float closedType, vec2 mUv) {
  float destAlpha = alpha;

  float a = distance(end, mUv);
  float b = distance(start, mUv);
  float c = distance(start, end);

  float p = (a + b + c) / 2.0;
  float s = sqrt(p * (p - a) * (p - b) * (p - c));
  float h = 2.0 * s / c;

  if (step(h, limit) == 1.0) {
    destAlpha = lineAlpha;
  };

  // if (closedType == 1.0) { // closed | none
  //   if (isSquareTriangle(a, b, c) || isSquareTriangle(b, a, c)) {
  //     destAlpha = alpha;
  //   }
  // } else if (closedType == 2.0) {
    if (isSquareTriangle(a, b, c)) {
      destAlpha = step(b, limit) == 1.0 ? lineAlpha : alpha;
    }

    if (isSquareTriangle(b, a, c)) {
      destAlpha = step(a, limit) == 1.0 ? lineAlpha : alpha;
    }
  // }

  return destAlpha;
}

float drawLine(vec2 start, vec2 end, float limit, float alpha, float lineAlpha, float closedType, vec2 mUv, vec2 offset) {
  if (start.x - 0.0 - offset.x + mUv.y + limit * 2.0 < mUv.x) return alpha;
  if (start.x - 0.9 - offset.x + mUv.y + limit * 2.0 > mUv.x) return alpha;
  if (mUv.x < 0.0 || mUv.x > 1.0 || mUv.y < 0.0 || mUv.y > 1.0) return alpha;
  // if (start.x + mUv.y - 1.0 - limit * 2.0 > mUv.x) return vec3(0.5);

  float destAlpha = alpha;

  if (end.y > 1.0 || end.x > 1.0) {
    vec2 rUv = mUv;

    rUv.y += 1.0;
    rUv.x += 1.0;

    destAlpha = drawLineRecursive(start, end, limit, alpha, lineAlpha, closedType, rUv);
  } else if (start.y > 1.0) {
    vec2 rUv = mUv;

    rUv.y += 1.0;
    rUv.x += 1.0;

    end += vec2(2.0);

    destAlpha = drawLineRecursive(start, end, limit, alpha, lineAlpha, closedType, rUv);

    end -= vec2(2.0);
    start -= vec2(2.0);
  }

  if (lineAlpha == destAlpha) return destAlpha;

  float a = distance(end, mUv);
  float b = distance(start, mUv);
  float c = distance(start, end);

  float p = (a + b + c) / 2.0;
  float s = sqrt(p * (p - a) * (p - b) * (p - c));
  float h = 2.0 * s / c;

  if (step(h, limit) == 1.0) {
    destAlpha = lineAlpha;
  };

  // if (closedType == 1.0) { // closed | none
  //   if (isSquareTriangle(a, b, c) || isSquareTriangle(b, a, c)) {
  //     destAlpha = alpha;
  //   }
  // } else if (closedType == 2.0) {
    if (isSquareTriangle(a, b, c)) {
      destAlpha = step(b, limit) == 1.0 ? lineAlpha : alpha;
      // destAlpha = alpha;
    }

    if (isSquareTriangle(b, a, c)) {
      destAlpha = step(a, limit) == 1.0 ? lineAlpha : alpha;
      // destAlpha = alpha;
    }
  // }

  return destAlpha;
}


void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	// .

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_flip>
	#include <normal_fragment>
	#include <emissivemap_fragment>
	// #include <envmap_fragment>

	// .

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_template>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;


	// vUv.y += 0.01;

	vec2 fUv = vUv;
  // vec3 color = vec3(0.0); // vec3(vUv.x, vUv.y, 1.0);
  vec2 offset = vec2(time - floor(time));

  fUv.x -= floor(fUv.x);
  fUv.y -= floor(fUv.y);

	diffuseColor.a = 0.0;

  for (int i = 0; i < linesCount; i++) {
    vec2 start = lines[i * 2] + offset;
    vec2 end = lines[i * 2 + 1] + offset;

    if (end.y > 2.0) {
      start -= floor(start / 2.0) * 2.0;
      end -= floor(end / 2.0) * 2.0;
    }

    diffuseColor.a = drawLine(
      start,
      end,
      lineWidth / 2.0,
      diffuseColor.a,
      1.0,
      2.0,
      fUv,
      offset
    );
  }

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
	// .
}
