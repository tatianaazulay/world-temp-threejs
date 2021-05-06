// Three.js visualisation of world temperatures written by Tatiana Azulay
// ====================================================================
// ====================================================================
// SCENE
var scene = new THREE.Scene();
scene.background = new THREE.Color( 'black' );
// ====================================================================
// ====================================================================
//CREATE AND ADD TO THE SCENE THE PLANE
function createPlane(){
  var planeGeometry = new THREE.PlaneGeometry(400, 200, 70,70);//width,height,widthSegments,heightSegments. 
  var texture = new THREE.TextureLoader().load( '/earth-map1.jpg' );
  var planeMaterial = new THREE.MeshLambertMaterial( { map: texture, wireframe: true} );
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // rotate and position the plane
  plane.rotation.x = -Math.PI/2;//
  plane.position.set(0,0,0);

  // add the plane to the scene
  scene.add(plane);
}
createPlane();


// ====================================================================
// ====================================================================
//CREATE AND ADD TO THE SCENE TEMPERATURE TOWER

//Dimentions of the temperature tower
var baseWidth=5;
var topWidth=3;
var mainHeight=40;
var topHeight =10;
// ====================================================================
// ====================================================================
// The center of the temperature tower is the origin, so, for example, the x coordinates go
// from -width_of_the_base*0.5 to +width_of_the_base*0.5 
function createBaseGeometry (baseWidth, topWidth, mainHeight) {
    var geom = new THREE.Geometry();
    var w1 = 0.5*baseWidth;
    var w2 = 0.5*topWidth;
    // 8 vertices
    geom.vertices.push(
    new THREE.Vector3(-w1,0,w1),//0
    new THREE.Vector3(w1,0,w1),//1
    new THREE.Vector3(w1,0,-w1),//2
    new THREE.Vector3(-w1,0,-w1),//3
    new THREE.Vector3(-w2,mainHeight,w2),//4
    new THREE.Vector3(w2,mainHeight,w2),//5
    new THREE.Vector3(w2,mainHeight,-w2),//6
    new THREE.Vector3(-w2,mainHeight,-w2),//7
    );
   
    // create faces
    geom.faces.push(
       new THREE.Face3(0,1,4),
       new THREE.Face3(1,5,4),
       new THREE.Face3(1,2,5),
       new THREE.Face3(5,2,6),
       new THREE.Face3(6,2,3),
       new THREE.Face3(6,3,7),
       new THREE.Face3(3,0,4),
       new THREE.Face3(3,4,7)
       );
    geom.computeFaceNormals();
    return geom;
}

function createTopGeometry(topWidth, topHeight) {
   var geom = new THREE.Geometry();
   var w2 = 0.5*topWidth;
   // add the base
   geom.vertices.push(new THREE.Vector3(-w2, 0, +w2));//0
   geom.vertices.push(new THREE.Vector3(+w2, 0, +w2));//1
   geom.vertices.push(new THREE.Vector3(+w2, 0, -w2));//2
   geom.vertices.push(new THREE.Vector3(-w2, 0, -w2));//3
   geom.vertices.push(new THREE.Vector3(0, topHeight, 0));//4
   // now that we've got the vertices we need to define the faces.
   geom.faces.push(new THREE.Face3(0, 1, 4));
   geom.faces.push(new THREE.Face3(1,2,4));
   geom.faces.push(new THREE.Face3(2,3,4));
   geom.faces.push(new THREE.Face3(3,0,4));
   // calculate the normals for shading
   geom.computeFaceNormals();
   return geom;
   }
var baseGeom, baseMaterial, baseMesh, topGeom, topMaterial, topMesh; 
function createTower() {
  baseGeom=createBaseGeometry(baseWidth, topWidth, mainHeight);
  baseMaterial =new THREE.MeshPhongMaterial({color: 0xc9c92b, shininess: 50});//Phong material for shiny surfaces(like mirrors)
  baseMesh=new THREE.Mesh( baseGeom, baseMaterial );
  scene.add(baseMesh);
  // ================================================================
  topGeom = createTopGeometry (topWidth, topHeight);
  topMaterial= new THREE.MeshPhongMaterial({color: 0xc9c92b, shininess: 50});
  topMesh=new THREE.Mesh( topGeom, topMaterial );
  //Mesh.position property with a method set(x,y,z) is used to change position of the Top
  topMesh.position.set(0, mainHeight, 0);
  scene.add(topMesh);
}
createTower();


// ====================================================================
// ====================================================================
//CREATE AND ADD TO THE SCENE 3D MESHES FOR REPRESENTING DATA POINTS
//var path;//global variable to store path for the data to be rendered

//this function fetches data from a json file and adds to the scene 3D meshes representing this data
function getData(path){
  fetch(path).then(async data => {
    let myjson = await data.text();
    myjson = JSON.parse(myjson);//A Javascript object
  
    for(let i = 0; i < myjson.length; i++) {
      let city = myjson[i];
  
      let material = new THREE.MeshBasicMaterial( {color: 'white'} );
      let geometry = new THREE.BoxGeometry( 1, city.temp, 1 );
      let mesh = new THREE.Mesh( geometry, material );
      
      let latitude = city.lat;
      let longitude = city.long;
      //console.log(city.city, city.lat, city.long)
      let normalizedLatitude = 2.0 * (((latitude + 90.0) / 180.0) - 0.5);
      let normalizedLongitude = 2.0 * (((longitude + 180.0) / 360.0) - 0.5);
      let x_location = normalizedLongitude * 200.0;
      let z_location = -(normalizedLatitude * 100.0);
      let y_location= city.temp/2;//makes its y position half its height, so it keeps on the grid no matter what size.
      mesh.position.set(x_location, y_location, z_location);
      scene.add( mesh );
    }
  })
}

getData("/cities1750.json");
// ====================================================================
// ====================================================================
// CAMERA
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 100, 200);

// ====================================================================
// ====================================================================
// CREATE AND ADD TO THE SCENE LIGHT
//light that comes from one direction(ike the sun light), constructor accepts the light color
var light = new THREE.DirectionalLight(0xffffff, 1);//by default it radiates rays to the (0,0,0) position and comes from the top of the scene( yellow 0xfcba03)
light.position.setScalar(10);
scene.add(light);

// ====================================================================
// ====================================================================
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ====================================================================
// ====================================================================
// ORBITCONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// ====================================================================
// ====================================================================
//Add animation by making the temperature tower rotate around the y axis, adding 0.01 in each step.
function render() {
  baseMesh.rotation.y += 0.01;
  topMesh.rotation.y += 0.01;
  renderer.render( scene, camera );
  requestAnimationFrame( render );
}
// ====================================================================
// ====================================================================
render();
// ====================================================================
// ====================================================================

// global object variable sceneParams contains ONE parameter: Year, with initial value "year_1750"
var sceneParams = {YEAR: "year_1750"};
// ====================================================================
// ====================================================================
//FUNCTION redrawScene REBUILDS AND REDRAWS THE SCENE
function redrawScene() {
   //clear THREE.JS scene
   while(scene.children.length > 0){ 
    scene.remove(scene.children[0]);
    }
    createPlane();
    createTower();
    if (sceneParams.YEAR==="year_1750"){getData("/cities1750.json");}
    if (sceneParams.YEAR==="year_1760"){getData("/cities1760.json");}
    if (sceneParams.YEAR==="year_1770"){getData("/cities1770.json");}

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.setScalar(10);
    scene.add(light);
    render();
  }

// ====================================================================
// ====================================================================
// Create a new dat.GUI object
var gui = new dat.GUI();
gui.add(sceneParams,'YEAR',["year_1750","year_1760","year_1770"]).onChange(redrawScene);