var renderer, scene, camera, composer, circle, skelet, particle, particlesCounts = 100;

window.onload = function () {
  fetch("https://raw.githubusercontent.com/YDrall/my-landing-page/main/config.json").then((response) => response.json())
    .then((json) => {
      particlesCounts = JSON.parse(json?.contrib)?.viewer?.contributionsCollection?.contributionCalendar?.totalContributions;
    })
    .catch(err => { console.log(err) })
    .finally(() => start());
}

function start() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  particle = new THREE.Object3D();

  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(2, 0);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < particlesCounts; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  var mat2 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide

  });



  var ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);


  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  renderer.clear();

  renderer.render(scene, camera)
};
