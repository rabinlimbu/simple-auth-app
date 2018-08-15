import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import App from './js/App'
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './js/registerServiceWorker'
import store, { history } from "./js/store/index"
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>, 
		document.getElementById('root')
	);
registerServiceWorker();