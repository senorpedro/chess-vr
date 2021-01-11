import 'aframe';
// import 'aframe-teleport-controls';
import 'aframe-environment-component';
import App from './svelte-components/App.svelte';

import './aframe-components';

const app = new App({ target: document.body });

export default app;