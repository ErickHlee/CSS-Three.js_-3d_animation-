# CSS-Three.js_(Animação 3D)
Video referência: https://www.youtube.com/watch?v=zNXQS2DfckU

Index:
1) Baixando o modelo 3D
2) Estilizando no CSS
3) Configuração JavaScript
4) Configuração da animação
----

# Aviso! 
# Para o funcionamento do modelo3D, é necessário usar o LiveServer. Sem o uso do LiveServer, o modelo não vai aparecer.

# 1) Baixando o modelo 3D:
URL para baixar o modelo: https://sketchfab.com/feed
> Recomendado baixar modelos que tenham animações

# 2) Estilizando no CSS:
Dentro do HTML, precisa criar um div com a nomeclatura da sua preferência. Em seguida, o link do javascript
``` html
<div id="container3D"></div>
<script type="module" src="script.js"></script>
```

```CSS
#container3D {
    position: fixed;
    inset: 0;  /* Em relação ao Div pai, terá X px de distância em todas as direções. W3school tem mais informação.*/
    z-index: 100; /* Certificar que este elemento não fique por trás de outros elementos. */
    pointer-events: none; /* Ao passar o mouse por cima, faça nada. */
    /* background-color: red; */
}
```

# 3) Configuração JavaScript;
> URL para saber mais sobre Three.js: https://www.skypack.dev/view/three / https://www.skypack.dev/docs
> E para a configuração do modelo 3D, basta acessar o 'script.js'. Os códigos foram comentados para o melhor entendimento de cada elemento.
----
1) Importando as bibliotecas:
    ```js
    import * as THREE from 'https://cdn.skypack.dev./three@0.129.0/build/three.module.js';
    import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
    ```

2) Iniciando a camera do Three.js:
    ```js
    const camera = new THREE.PerspectiveCamera(
    10, // O ângulo da visão em perspectiva X, Y e Z
    window.innerWidth / window.innerHeight, // O tamanho do elemento na sua tela
    0.1, // A distância mais próxima na sua tela
    1000  // A distância mais afastada da sua tela
    );

    camera.position.z = 13; // Movimentando a distância do NOSSO olhar em relação à coordenada Z
    ```

3) Iniciando a cena:
    ```js
    camera.position.z = 13; // Movimentando a distância do NOSSO olhar em relação à coordenada Z
    const loader = new GLTFLoader();
    loader.load('/demon_bee_full_texture.glb', //carregue a imagem que você baixou
    function (gltf) {  // A função vai ativar o carregamento der certo
        bee = gltf.scene; // a variável 'bee' vai pegar todas as informações do modelo bee e colocar dentro do '.scene'
        scene.add(bee); // Como explicado antes, a '.scene' é onde vai estar armazenado todas as informações do modelo 3D para aparecer na tela
    },
    function (xhr) {}, // A função vai ativar após o carregamento, que tem a responsabilidade de deixar o bee funcionando
    function (error) {} // A função vai ativar quando algum erro acontecer
    );
    ```

4) Renderizando o 3D para HTML:
    ```js
    // Agora que configuramos o '.scene' para que o 'bee' apareça, vamos desenhar fisicamente.
    const renderer = new THREE.WebGLRenderer({alpha: true}); //pegamos a API para desenhar
    // Depois de testar se o site está funcionando, você vai perceber que a tela do site vai estar preto, isso acontece por que o 'background-color' está preto por natural, para tirar isso, coloque '{alpha: true}'
    renderer.setSize(window.innerWidth, window.innerHeight); // Determinando o tamanho do desenho
    document.getElementById('container3D').appendChild(renderer.domElement); //Colocando dentro da div 'container3D'

    const reRender3D = () => { // Grupo responsável por fazer o modelo 3D atualizar constantemente
    // a 'function (gltf)' é apenas um loader do modelo3D, então ele só vai rodar uma vez e cabou
    requestAnimationFrame(reRender3D); // Este código é responsável por repetidamente executar esta função
    renderer.render(scene, camera); // Código responsável pela concetrização do desenho no canva
    };
    reRender3D();
    ```

5) Adicionando a luz:
    ```js
    // Chegando nesse etapa, você vai preceber que a abelha vai aparecer, mas vai estar escuro

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    // > .AmbientLight(A cor da luz, a intensidade da luz)
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1); // Direcionamento da luz como a iluminação do sol
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    // COMENTADO APENAS PARA SABER A POSIÇÃO DO CÓDIGO

    // const reRender3D = () => {
    // requestAnimationFrame(reRender3D);
    // renderer.render(scene, camera);
    // mixer.update(0.02);
    // };
    ```
# 4) Configuração da animação:
----
6) Mudando a posição do modelo:
    ```js
    // Apenas fazer a modificação com o código novo dentro da 'function (gltf)'

    let mixer;
    loader.load('/demon_bee_full_texture.glb',
    function (gltf) { 
        bee = gltf.scene;
        bee.position.y = -1; // Medidas temporárias
        bee.rotation.y = -0.5; // Medidas temporárias
        scene.add(bee);
        
        mixer = new THREE.AnimationMixer(bee)
        mixer.clipAction(gltf.animations[0]).play();
    },
    )

    const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    // Verificar se o mixer está sendo inicializado, depois atualiza o model em 0.02s
    if (mixer) mixer.update(0.02);
    };
    reRender3D();
    ```

7) Criando animação ao scroll:
    ```js
    import { gsap } from 'https://con.skypack.dev/gsap'

    // AVISO! Na sessão do HTML, você pode ver que as páginas (banner, intro, description, contact) foram foram definidos como ID. Eles são importantes para a animação com scroll.
    loader.load('/demon_bee_full_texture.glb',
    function (gltf) { 
        bee = gltf.scene;
        scene.add(bee);
        
        mixer = new THREE.AnimationMixer(bee)
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    );

    // COMENTADO APENAS PARA SABER A POSIÇÃO DO CÓDIGO

    // const reRender3D = () => {
    // requestAnimationFrame(reRender3D);
    // renderer.render(scene, camera);
    // mixer.update(0.02);
    // };

    let arrPositionModel = [
    {
        id: 'banner',
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
    {
        id: 'intro',
        position: { x: 1.5, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: 'description',
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: 'contact',
        position: { x: 1, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    }
    ];

    const modelMove = () => {
    const sections = document.querySelectorAll('.section'); // Capturar toda class chamada 'section'
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        // bee.position.x = new_coordinates.position.x;
        // bee.position.y = new_coordinates.position.y;
        // bee.position.z = new_coordinates.position.z;
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }

    window.addEventListener('scroll', () => {   // Capturar o momento em que o user dá scroll
    if (bee) {
        modelMove();
    }
    }); 
    ```
