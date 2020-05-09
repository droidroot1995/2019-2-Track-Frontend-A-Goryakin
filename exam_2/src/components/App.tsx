import React from 'react';
import TranslateForm from './TranslateForm'
import TranslatorHeader from './TranslatorHeader'
import styles from '../styles/App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <TranslatorHeader/>
      <TranslateForm />
    </div>
  );
}

export default App;
