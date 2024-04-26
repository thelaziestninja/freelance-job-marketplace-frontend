import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "../src/styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { store, persistor } from './app/store'; // import store and persistor
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { BrowserRouter as Router } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root')!);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Router>
//           <App />
//         </Router>
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );
