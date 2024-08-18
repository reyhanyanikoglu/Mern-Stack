import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/') // backend sunucum
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
        }
    }
      fetchWorkouts()
    }, []) // component ilk render edildiğinde çalışsın istiyoruz

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => ( // workouts var ise map başlayacak başta null o yüzden null edilmiyor
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home