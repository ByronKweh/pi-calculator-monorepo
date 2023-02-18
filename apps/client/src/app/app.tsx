import { applyDecorators } from '@nestjs/common';
import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to Naluri!</h1>
      </header>
      <main>
        <h2> Current Pi Value:</h2>
        <h2>Circumference : </h2>
       <h2> <button>Increment pi value</button></h2>
      </main>
    </div>
  );
}

export default App;
