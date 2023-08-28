// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.css';
import { Hello } from './components/hello';
import { Input } from './components/input';
import { SolarSystem } from './components/solar-system';
import { Planet } from './components/planet';
import {Joke} from "./components/joke";

// export function App() {
//   return <div>Hello world!</div>;
// }

export const App = () => {
  const [name, setName] = useState('');
  return (
    <div className={styles.example}>
      <div>
        <Hello name={name} />
      </div>
      <div>
        <Input
          onInputChange={(value) => {
            // console.log(value);
            setName(value);
          }}
        />
      </div>
      <div>
        <SolarSystem />
      </div>
      <div>
        <Planet />
      </div>
        <div>
            <Joke />
        </div>
    </div>
  );
};

export default App;
