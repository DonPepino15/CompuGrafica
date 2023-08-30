/*
Author: Alejandro Lasso
Date creation: 23/08/23
Last Modification: 29/08/23
*/

//Creacion elementos
var Scene = null,
    camara = null,
    renderer = null,
    control = null,
    cube = null,
    torus = null,
    cone = null;
    maximo = 8;
    minimo = -8;

function StartScene() {

    //Scene,camara,render

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, //Angulo de visión (abajo o arriba)

        window.innerWidth / window.innerHeight, // Relacion de aspecto 16:9
        0.1, // Mas cerca
        1000); // Mas lejos

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //orbit controls

    control = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 5);
    control.update();

    // GRIDHELPER

    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    //axes
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    animate();
    onWindowResize();
}

function createGeometry(Form) {

    switch (Form) {
        case 'cube':
            // CUBE
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            cube.position.x = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);  //flor: Numero aleatorio ya que el ranom genera aleaotrio tambien pero puede ser decimal entonces podia chocar
            cube.position.z = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);
            
            break
        // TORUS
        case 'torus':
            const geometrytorus = new THREE.TorusGeometry(0.8, 0.1, 5, 20);
            const materialtorus = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            torus = new THREE.Mesh(geometrytorus, materialtorus); 
            scene.add(torus);

            torus.position.x = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);
            torus.position.z = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);


            break
        case 'cono':
            //CONO
            const geometrycone = new THREE.ConeGeometry(0.8, 0.8, 20);
            const materialcone = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
            cone = new THREE.Mesh(geometrycone, materialcone);
            scene.add(cone);

            cone.position.x = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);
            cone.position.z = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);

            break
    }






}

function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // torus.rotation.x -= 0.01;
    // torus.rotation.y -= 0.01;

    // cone.rotation.x +=0.01;
    // cone.rotation.y -=0.01;
}




window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);


}



