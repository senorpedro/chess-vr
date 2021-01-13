import 'aframe';
import 'aframe-environment-component';
import './aframe-components';

import App from './svelte-components/App.svelte';

const app = new App({ target: document.body });

export default app;