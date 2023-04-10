import { useState } from "react"
import { server_calls } from "../api/server"
import { auth } from '../config/firebase';
import NutritionTable from "./NutritionTable"
import { useNavigate } from 'react-router-dom'

interface displayProps {
    data: {'id': string, 'product_code':string, 'quantity':string}[],
    nutritionInfo: {'product': {'nutriments': {
        'cholesterol_serving':string,'carbohydrates_serving':string,'energy-kcal_serving':string,'fat_serving':string,
        'fiber_serving':string,'proteins_serving':string,'saturated-fat_serving':string,'sodium_serving':string,
        'sugars_serving':string,'trans-fat_serving':string}, 'product_name':string, 'brand_owner':string}}[]
    imageUrls: string[]
    editProduct: (id: string, nutrition:
            {'product': {'nutriments': {
            'cholesterol_serving':string,'carbohydrates_serving':string,'energy-kcal_serving':string,'fat_serving':string,
            'fiber_serving':string,'proteins_serving':string,'saturated-fat_serving':string,'sodium_serving':string,
            'sugars_serving':string,'trans-fat_serving':string}, 'product_name':string, 'brand_owner':string}}
        , quantity:string, code:string) => void,
    deleteProduct: (id:string) => void
}

const SavedProductDisplay = (props: displayProps) => {
    const [date, setDate] = useState('');
    const [inputValue, setInputValue] = useState(['']);

    
    return (
        <div className='saved-grid'>  
            {props.data.map(({ id, product_code, quantity}, index) =>
                <div key={index} className="saved-product">
                    {props.nutritionInfo[index] ? <NutritionTable data={props.nutritionInfo[index]}/>: <></>}
                    <div className="product-options">
                        <img className='saved-img' src={props.imageUrls[index]} alt=""/>
                        <div className="product-btns">
                            {quantity} servings
                            <button className="date-btn" onClick={() => props.editProduct(id, props.nutritionInfo[index], quantity, product_code)}>Edit</button>
                            <button className="date-btn" onClick={() => props.deleteProduct(id)}>Delete</button>
                        </div>
                    </div>
                </div>,
            )}
            
        </div>
    )
}

export default SavedProductDisplay