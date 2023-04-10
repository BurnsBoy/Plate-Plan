import React from 'react'

interface NutritionDataProps {
  data: {'product': {'nutriments': {
    'cholesterol_serving':string,'carbohydrates_serving':string,'energy-kcal_serving':string,'fat_serving':string,
    'fiber_serving':string,'proteins_serving':string,'saturated-fat_serving':string,'sodium_serving':string,
    'sugars_serving':string,'trans-fat_serving':string}, 'product_name':string, 'brand_owner':string}}
  }

const NutritionTable = (props: NutritionDataProps) => {
  return (
    <div className='nutrition-facts'>
        <div className='nutrition-value-title'><div>{props.data['product']['product_name']}</div>{props.data['product']['brand_owner']}</div>
        {props.data['product']['nutriments']['energy-kcal_serving'] ? 
          <div className='nutrition-value'>
            <div>Calories: {props.data['product']['nutriments']['energy-kcal_serving']}</div>
          </div> : <></>}
        {props.data['product']['nutriments']['fat_serving'] ?
          <div className='nutrition-value'>
            <div>Total Fat: {props.data['product']['nutriments']['fat_serving']}g</div>
            {props.data['product']['nutriments']['fat_serving'] != '0' ?
              <div>{((parseFloat(props.data['product']['nutriments']['fat_serving']) / 78) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}
        {props.data['product']['nutriments']['saturated-fat_serving'] ?
          <div className='nutrition-value'>
          <div>Saturated Fat: {props.data['product']['nutriments']['saturated-fat_serving']}g</div>
            {props.data['product']['nutriments']['saturated-fat_serving'] != '0' ?
              <div>{((parseFloat(props.data['product']['nutriments']['saturated-fat_serving']) / 20) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}
        {props.data['product']['nutriments']['trans-fat_serving'] ?
        <div className='nutrition-value'>Trans Fat: {props.data['product']['nutriments']['trans-fat_serving']}g</div> : <></>}
        {props.data['product']['nutriments']['cholesterol_serving'] ?
          <div className='nutrition-value'>
          <div>Cholesterol: {(parseFloat(props.data['product']['nutriments']['cholesterol_serving']) * 1000).toFixed(2).replace(/\.?0+$/, '')}mg</div>
            {props.data['product']['nutriments']['cholesterol_serving'] != '0' ?
              <div>{(((parseFloat(props.data['product']['nutriments']['cholesterol_serving']) * 10) / 3) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}
        {props.data['product']['nutriments']['sodium_serving'] ?
          <div className='nutrition-value'>
          <div>Sodium: {(parseFloat(props.data['product']['nutriments']['sodium_serving']) * 1000).toFixed(2).replace(/\.?0+$/, '')}mg</div>
            {props.data['product']['nutriments']['sodium_serving'] != '0' ?
              <div>{(((parseFloat(props.data['product']['nutriments']['sodium_serving']) * 10) / 23) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}
        {props.data['product']['nutriments']['carbohydrates_serving'] ?
          <div className='nutrition-value'>
          <div>Total Carbohydrate: {props.data['product']['nutriments']['carbohydrates_serving']}g</div>
            {props.data['product']['nutriments']['carbohydrates_serving'] != '0' ?
              <div>{((parseFloat(props.data['product']['nutriments']['carbohydrates_serving']) / 275) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}
        {props.data['product']['nutriments']['fiber_serving'] ?
          <div className='nutrition-value'>
          <div>Dietary Fiber: {props.data['product']['nutriments']['fiber_serving']}g</div>
            {props.data['product']['nutriments']['fiber_serving'] != '0' ?
              <div>{((parseFloat(props.data['product']['nutriments']['fiber_serving']) / 275) * 100).toFixed(0)}%</div> :
              <div>0%</div>}
          </div> : <></>}        
        {props.data['product']['nutriments']['sugars_serving'] ?
        <div className='nutrition-value'>Sugars: {props.data['product']['nutriments']['sugars_serving']}g</div> : <></>}
        {props.data['product']['nutriments']['proteins_serving'] ?
        <div className='nutrition-value'>Protein: {props.data['product']['nutriments']['proteins_serving']}g</div> : <></>}
    </div>
  )
}

export default NutritionTable