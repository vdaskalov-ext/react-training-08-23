import {useLocation, useParams} from "react-router-dom";
import {usePlanetDetails} from "../../swapi/hooks";

export const PlanetDetails = () => {
    const {id} = useParams()
    const {state} = useLocation()
    const {planetDetails, loading, error} = usePlanetDetails(id)

    if (error) {
        return <div>Something went wrong</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (<div>
        <h1>Planet Details</h1>
        <p>ID: {id}</p>
        <div>
            <p>Name: {planetDetails.name}</p>
            <p>Rotation Period: {planetDetails.rotation_period}</p>
            <p>Orbital Period: {planetDetails.orbital_period}</p>
        </div>
    </div>)
}