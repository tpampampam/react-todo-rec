import React from 'react';
import PageTitle from './components/PageTitle'
import AppHeader from './components/AppHeader';
import styles from './styles/modules/app.module.scss'
import AppContent from './components/AppContent';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>Todo list</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader></AppHeader>
          <AppContent/>
        </div>
      </div>
      <Toaster 
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1.4rem'
        }
      }}/>
    </>
  );
}

export default App;
