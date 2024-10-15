import * as THREE from 'https://cdn.skypack.dev./three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10, // O ângulo da visão em perspectiva X, Y e Z
    window.innerWidth / window.innerHeight, // O tamanho do elemento na sua tela
    0.1, // A distância mais próxima na sua tela
    1000  // A distância mais afastada da sua tela
);

camera.position.z = 13; // Movimentando a distância do NOSSO olhar em relação à coordenada Z

const scene = new THREE.Scene();
let bee;
const loader = new GLTFLoader();
loader.load('/demon_bee_full_texture.glb', //carregue a imagem que você baixou
    function (gltf) {  // A função vai ativar o carregamento der certo
        bee = gltf.scene; // a variável 'bee' vai pegar todas as informações do 'bee' e colocar dentro do '.scene'
        bee.position.y = -1;
        bee.rotation.y = 1.5;
        scene.add(bee); // Como explicado antes, a '.scene' é onde vai estar armazenado todas as informações do modelo 3D para aparecer na tela
    },
    function (xhr) {}, // A função vai ativar após o carregamento, que tem a responsabilidade de deixar o bee funcionando
    function (error) {} // A função vai ativar quando algum erro acontecer
);
// Agora que configuramos o '.scene' para que o 'bee' apareça, vamos desenhar fisicamente.
const renderer = new THREE.WebGLRenderer({alpha: true}); //pegamos a API para desenhar
// Depois de testar se o site está funcionando, você vai perceber que a tela do site vai estar preto, isso acontece por que o 'background-color' está preto por natural, para tirar isso, coloque '{alpha: true}'
renderer.setSize(window.innerWidth, window.innerHeight); // Determinando o tamanho do desenho
document.getElementById('container3D').appendChild(renderer.domElement); //Colocando dentro da div 'container3D'
// Com isso, já podemos verificar se algo já está funcionando, claro que o código não está 100%

// Por fim, vamos desenhar no canvas o nosso modelo3D e... nada aconteceu. O motivo disso é que, este código está rentando pegar o código incompleto do 'function (gltf)'
// Para corrigir isto, vamos substituir este código abaixo por um outro código:

// > renderer.render(scene, camera);

// Em vez de fazer com que o código chame apenas uma vez, vamos fazer um código em que constantemente chame o código para atualizar constantemente

const reRender3D = () => {
    requestAnimationFrame(reRender3D); // Este código é responsável por repetidamente executar esta função
    renderer.render(scene, camera);
};
reRender3D();

// Se você fez o código até aqui e a imagem da abelha (escura) apareceu no site, você está indo no caminho certo! Só precisamos colocar iluminação

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
// > .AmbientLight(A cor da luz, a intensidade da luz)
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1); // Direcionamento da luz como a iluminação do sol
topLight.position.set(500, 500, 500);
scene.add(topLight);

// -> Configurando a posição do bee no function (gltf)

