import { useMemo } from 'react'
import { Activity } from '../types'
import CaloriesDisplay from './CaloriesDisplay'


type CaloriesTrakerProps = {
  activities: Activity[]
}

const CaloriesTraker = ({ activities }: CaloriesTrakerProps) => {

  const caloriesConsumo = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);
  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);
  const netCalories = useMemo(() => caloriesConsumo - caloriesBurned, [activities])

  return (
    <>
      <h2 className='text-4xl font-black text-white text-center'>Resumen de Calorias</h2>

      <div className='flex flex-col items-center md:flex-row justify-between gap-5 mt-10'>
        <CaloriesDisplay
          calories={caloriesConsumo}
          text={'Comida'}
        />
        <CaloriesDisplay
          calories={caloriesBurned}
          text={'Ejercicio'}
        />
        <CaloriesDisplay
          calories={netCalories}
          text={'Diferencia'}
        />
      </div>

    </>
  )
}

export default CaloriesTraker