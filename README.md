# CSS-Three.js_(Animação 3D)

Index:
1) Baixando o modelo 3D
2) Estilizando no CSS
3) Configuração JavaScript
4) Configuração da animação

1) Baixando o modelo 3D:
URL para baixar o modelo: https://sketchfab.com/feed
# Recomendado baixar modelos que tenham animações

2) Estilizando no CSS:
Dentro do HTML, precisa criar um div com a nomeclatura da sua preferência. Em seguida, o link do javascript
Meu caso:
```
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

3) Configuração JavaScript;
URL para saber mais sobre Three.js: https://www.skypack.dev/view/three / https://www.skypack.dev/docs
O Three.js disponibiliza uma biblioteca externa para dar import no seu js.
``` js
import * as THREE from 'https://cdn.skypack.dev./three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
```
E para a configuração do modelo 3D, basta acessar o 'script.js'. Os códigos foram comentados para o melhor entendimento de cada elemento.

