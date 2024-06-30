import sweetalert2 from './sweet.js'
import App from './modules/app.js';
import './modules/drupalModuleInfo.js';
import './modules/selection.js';
import './modules/imgAnchorModal.js';
import  "./style.css";

window.sweetalert2 = window.Swal = window.sweetAlert = sweetalert2;
//run app
App();
