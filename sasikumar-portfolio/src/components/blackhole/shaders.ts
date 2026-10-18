/**
 * GLSL Shaders for Black Hole Accretion Disk, Photon Ring, and Cosmic Atmosphere.
 * Strict monochrome palette: jet black (#000000), chrome silver (#cbd5e1),
 * metallic white (#ffffff), charcoal (#1e293b).
 */

// 1. Accretion Disk Particle Shader
export const AccretionParticleShader = {
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uPixelRatio;

    attribute float aSize;
    attribute float aSpeed;
    attribute float aRadius;
    attribute float aAngle;
    attribute float aElevation;
    attribute float aBrightness;

    varying float vBrightness;
    varying float vDistToCenter;

    void main() {
      // Keplerian-like differential rotation: inner orbits rotate faster
      float orbitalSpeed = aSpeed * (3.5 / sqrt(max(aRadius, 1.2)));
      float currentAngle = aAngle + uTime * orbitalSpeed;

      // Slight inward logarithmic spiral drift
      float r = aRadius;

      // Position on equatorial disk with subtle organic vertical turbulence
      float x = cos(currentAngle) * r;
      float z = sin(currentAngle) * r;
      float y = aElevation * sin(currentAngle * 2.5 + uTime * 0.8) * (r * 0.12);

      // Relativistic gravitational lensing arc simulation:
      // Particles behind the black hole (z < 0) are warped upward/downward by gravity
      if (z < 0.0 && r < 5.5) {
        float warpFactor = (1.0 - abs(z) / 5.5) * (1.8 / max(r, 1.2));
        y += warpFactor * sign(y == 0.0 ? 1.0 : y) * 0.7;
      }

      vec4 mvPosition = modelViewMatrix * vec4(x, y, z, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Distance attenuation for particle size
      gl_PointSize = aSize * uPixelRatio * (28.0 / -mvPosition.z);
      gl_PointSize = clamp(gl_PointSize, 1.0, 64.0);

      vBrightness = aBrightness * (1.0 + 0.3 * sin(uTime * 3.0 + aAngle * 4.0));
      vDistToCenter = r;
    }
  `,
  fragmentShader: /* glsl */ `
    varying float vBrightness;
    varying float vDistToCenter;

    void main() {
      // Radial distance inside the point sprite
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft Gaussian-like glow falloff
      float strength = pow(1.0 - dist * 2.0, 2.2);

      // Monochrome intensity: pure white core with metallic silver edge
      vec3 coreColor = vec3(1.0, 1.0, 1.0);
      vec3 silverColor = vec3(0.82, 0.86, 0.92);
      vec3 color = mix(silverColor, coreColor, strength);

      // Higher brightness near the photon sphere (inner boundary)
      float innerBoost = smoothstep(5.0, 2.0, vDistToCenter) * 0.5;
      float finalAlpha = (strength * vBrightness + innerBoost) * 0.85;

      gl_FragColor = vec4(color, clamp(finalAlpha, 0.0, 1.0));
    }
  `,
};

// 2. Photon Ring / Einstein Lensing Horizon Shader
export const PhotonRingShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    void main() {
      // Distance from center of disk
      float dist = length(vUv - vec2(0.5)) * 2.0;

      // Event horizon boundary is exactly at dist = 0.55
      float innerVoid = smoothstep(0.52, 0.55, dist);
      
      // Razor-sharp blinding photon ring right at the edge
      float ring = smoothstep(0.53, 0.56, dist) * smoothstep(0.68, 0.56, dist);
      float outerHalo = smoothstep(0.56, 0.95, dist) * (1.0 - smoothstep(0.56, 1.0, dist));

      // Shimmering metallic turbulence
      float shimmer = 0.9 + 0.1 * sin(uTime * 4.0 + atan(vPosition.y, vPosition.x) * 12.0);

      vec3 chromeWhite = vec3(1.0, 1.0, 1.0);
      vec3 silver = vec3(0.85, 0.88, 0.94);
      vec3 charcoal = vec3(0.12, 0.14, 0.18);

      vec3 col = mix(charcoal, silver, outerHalo);
      col = mix(col, chromeWhite, ring * 1.4);

      float alpha = (ring * 1.5 + outerHalo * 0.4) * innerVoid * shimmer;
      if (alpha < 0.01) discard;

      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
    }
  `,
};

// 3. Perspective Reflective Floor Particle Shader
export const FloorParticleShader = {
  vertexShader: /* glsl */ `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSpeed;

    attribute float aSize;
    attribute float aOffset;
    attribute vec3 aInitialPos;

    varying float vAlpha;
    varying float vZDist;

    void main() {
      vec3 pos = aInitialPos;

      // Continuous forward movement along Z toward viewer
      // Bounds: Z from -35.0 to 12.0
      float zRange = 47.0;
      float zOffset = mod(uTime * uSpeed + aOffset, zRange);
      pos.z = -35.0 + zOffset;

      // Subtle horizontal perspective wave
      pos.y += sin(pos.x * 0.15 + uTime * 0.6) * 0.08;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Attenuation with distance
      gl_PointSize = aSize * uPixelRatio * (22.0 / -mvPosition.z);
      gl_PointSize = clamp(gl_PointSize, 1.0, 32.0);

      // Depth fade: fade out when too far (near horizon) and when past camera
      float distFade = smoothstep(-35.0, -18.0, pos.z) * (1.0 - smoothstep(6.0, 12.0, pos.z));
      
      // Central reflection channel: particles aligned under the black hole (x near 0) shine brighter
      float centerGlow = 1.0 + 1.2 / (1.0 + abs(pos.x) * 0.35);

      vAlpha = distFade * 0.75 * centerGlow;
      vZDist = pos.z;
    }
  `,
  fragmentShader: /* glsl */ `
    varying float vAlpha;
    varying float vZDist;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float strength = pow(1.0 - dist * 2.0, 2.0);

      // Chrome silver to pure white reflection
      vec3 silverColor = vec3(0.78, 0.82, 0.88);
      vec3 whiteColor = vec3(1.0, 1.0, 1.0);
      vec3 finalColor = mix(silverColor, whiteColor, strength * 0.6);

      gl_FragColor = vec4(finalColor, strength * vAlpha);
    }
  `,
};
