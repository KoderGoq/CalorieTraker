import CaloriesDisplay from './CaloriesDisplay';
import { useActivity } from '../hooks/useActivity';

const CaloriesTraker = () => {

  const { caloriesConsumo, caloriesBurned, netCalories } = useActivity();

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