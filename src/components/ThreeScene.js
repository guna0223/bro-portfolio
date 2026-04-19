import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './ThreeScene.css';

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0f14, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Particles ──
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [
      new THREE.Color('#7a5d6d'),
      new THREE.Color('#c09e9c'),
      new THREE.Color('#d4b5b0'),
      new THREE.Color('#9e7080'),
      new THREE.Color('#f0e0dc'),
    ];
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Floating rings ──
    const rings = [];
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x7a5d6d, wireframe: true, transparent: true, opacity: 0.15 });
    [5, 8, 12].forEach((r, i) => {
      const geo = new THREE.TorusGeometry(r, 0.03, 8, 80);
      const mesh = new THREE.Mesh(geo, ringMat.clone());
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      scene.add(mesh);
      rings.push({ mesh, speed: 0.0008 + i * 0.0003 });
    });

    // ── Central icosphere ──
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 2);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x7a5d6d,
      emissive: 0x3a1a2a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ── Lights ──
    const amb = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(amb);
    const pt1 = new THREE.PointLight(0xc09e9c, 2, 40);
    pt1.position.set(8, 8, 8);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0x7a5d6d, 1.5, 30);
    pt2.position.set(-10, -5, 5);
    scene.add(pt2);

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ──
    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      ico.rotation.x = t * 0.2;
      ico.rotation.y = t * 0.35;
      ico.rotation.z = t * 0.15;

      rings.forEach(({ mesh, speed }, i) => {
        mesh.rotation.x += speed;
        mesh.rotation.z += speed * 0.7;
      });

      // Smooth camera parallax
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Breathe ico
      const s = 1 + Math.sin(t * 0.8) * 0.06;
      ico.scale.set(s, s, s);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="three-scene" ref={mountRef} />;
}
