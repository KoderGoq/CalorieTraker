import { createContext, Dispatch, ReactNode, useMemo, useReducer } from 'react';
import { ActivityActions, activityReducer, ActivityState, initialState } from '../reducers/activityReducer';
import { categories } from '../data/categoris';
import { Activity } from '../types';

type ActivityProviderProps = {
  children: ReactNode
}

type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>,
  caloriesConsumo: number,
  caloriesBurned: number,
  netCalories: number,
  categoryName: (category: Activity["category"]) => string[],
  isEmpyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  // Contadores
  const caloriesConsumo = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities]);
  const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities]);
  const netCalories = useMemo(() => caloriesConsumo - caloriesBurned, [state.activities])


  const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [state.activities]);
  const isEmpyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumo,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmpyActivities
      }}
    > {children}
    </ActivityContext.Provider>
  )
}