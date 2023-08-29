import {useState} from "react";
import styles from "../../app.module.css";
import {Hello} from "../../components/hello";
import {Input} from "../../components/input";
import {SolarSystem} from "../../components/solar-system";
import {Planet} from "../../components/planet";
import {Joke} from "../../components/joke";
import {StarWars} from "../../components/star-wars";

export const Home = () => {
    const [name, setName] = useState('');
    return (
        <div className={styles.example}>
            <div>
                <Hello name={name}/>
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
                <SolarSystem/>
            </div>
            <div>
                <Planet/>
            </div>
            <div>
                <Joke/>
            </div>
            <div>
                <StarWars/>
            </div>
        </div>)
};