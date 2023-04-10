import { useState, useEffect } from 'react'
import { server_calls } from '../api/server'
import { auth, Providers } from '../config/firebase'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { signInWithPopup } from 'firebase/auth'
import NutritionTable from './NutritionTable';


interface ItemDataProps {
  code: string
}

const ItemData = (props: ItemDataProps) => {
    const [nutritionData, setNutritionData] = useState({'product': {'nutriments': {
    'cholesterol_serving':'','carbohydrates_serving':'','energy-kcal_serving':'','fat_serving':'',
    'fiber_serving':'','proteins_serving':'','saturated-fat_serving':'','sodium_serving':'',
    'sugars_serving':'','trans-fat_serving':''}, 'product_name':'', 'brand_owner':''}});
    const [inputValue, setInputValue] = useState('');
    const [dateValue, setDateValue] = useState(dayjs());
    const [ adding, setAdding ] = useState(false);
    const [ added, setAdded ] = useState(false);

    const signInOnClick = async () => {
      const response = await signInWithPopup(auth, Providers.google);
      if ( response.user ) {
          location.reload()
      }
  }

  useEffect(() => {
    const fetchNutritionData = async () => {
        if (props.code != ''){
            setNutritionData(await server_calls.getNutrition(props.code)) 
        }
    }
    fetchNutritionData()
  }, [props.code])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setAdding(true)
        event.preventDefault();
        if (props.code){
          let servings = inputValue
          if (servings == ''){
            servings = '1'
          }
          if (auth.currentUser)
            await server_calls.addProduct({product_code: props.code, date: dateValue.format('YYYY-MM-DD'), quantity: servings}, auth.currentUser.uid)
          }
          setAdding(false)
          setAdded(true)
          setTimeout(() => {setAdded(false)}, 1000)
    }


  return (
    <div>
        <NutritionTable data={nutritionData}/>
        {auth.currentUser ?
        <div>
          <form onSubmit={handleSubmit}>
            <div>
            <div className="add-servings">
              <div>
              Add<input
                      type="number"
                      className="serving-input"
                      placeholder="1"
                      value={inputValue}
                      onChange={handleInputChange}
                  />Serving{inputValue != '1' && inputValue != '' ? 's': ''} To Date
              </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar defaultValue={dayjs()} value={dateValue} onChange={(newValue: any) => setDateValue(newValue)}/>
          </LocalizationProvider>
          {adding ?
          <div>Adding...</div>
          :<></>}
          {added ?
          <div>Added!</div>
          :<></>}
          {!adding && !added ?
          <button type="submit" className='btn'><i className="fa-solid fa-check"></i></button>
          :<></>}
          </div>
            </div>
          

          </form>
          
        </div>
        
        : 
        <div className='add-servings'>
          <button onClick={signInOnClick} className="nav-btn">
            Sign in to add servings to plan
          </button>
        </div>
        }
    </div>
  )
}

export default ItemData