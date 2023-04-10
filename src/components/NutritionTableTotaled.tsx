import { useState, useEffect } from 'react'

interface NutritionDataProps {
    data: [[{'product': {'nutriments': {
        'cholesterol_serving':string,'carbohydrates_serving':string,'energy-kcal_serving':string,'fat_serving':string,
        'fiber_serving':string,'proteins_serving':string,'saturated-fat_serving':string,'sodium_serving':string,
        'sugars_serving':string,'trans-fat_serving':string}, 'product_name':string, 'brand_owner':string}}, number]]
  }

const NutritionTableTotaled = (props: NutritionDataProps) => {
    const [nutritionData, setNutritionData] = useState({'product': {'nutriments': {
        'cholesterol_serving':'','carbohydrates_serving':'','energy-kcal_serving':'','fat_serving':'',
        'fiber_serving':'','proteins_serving':'','saturated-fat_serving':'','sodium_serving':'',
        'sugars_serving':'','trans-fat_serving':''}, 'product_name':'', 'brand_owner':''}});
    
        useEffect(() => {
            props.data.forEach((item) => {
                if (item && item[0] && item[0].product) {
                  const product = item[0].product;
                  const quantity = item[1];
                  setNutritionData((prevNutritionData) => ({
                    product: {
                      nutriments: {
                        'cholesterol_serving': (parseFloat(prevNutritionData.product.nutriments.cholesterol_serving) + (parseFloat(product.nutriments.cholesterol_serving) * quantity)).toString(),
                        'carbohydrates_serving': (parseFloat(prevNutritionData.product.nutriments.carbohydrates_serving) + (parseFloat(product.nutriments.carbohydrates_serving) * quantity)).toString(),
                        'energy-kcal_serving': (parseFloat(prevNutritionData.product.nutriments['energy-kcal_serving']) + (parseFloat(product.nutriments['energy-kcal_serving']) * quantity)).toString(),
                        'fat_serving': (parseFloat(prevNutritionData.product.nutriments.fat_serving) + (parseFloat(product.nutriments.fat_serving) * quantity)).toString(),
                        'fiber_serving': (parseFloat(prevNutritionData.product.nutriments.fiber_serving) + (parseFloat(product.nutriments.fiber_serving) * quantity)).toString(),
                        'proteins_serving': (parseFloat(prevNutritionData.product.nutriments.proteins_serving) + (parseFloat(product.nutriments.proteins_serving) * quantity)).toString(),
                        'saturated-fat_serving': (parseFloat(prevNutritionData.product.nutriments['saturated-fat_serving']) + (parseFloat(product.nutriments['saturated-fat_serving']) * quantity)).toString(),
                        'sodium_serving': (parseFloat(prevNutritionData.product.nutriments.sodium_serving) + (parseFloat(product.nutriments.sodium_serving) * quantity)).toString(),
                        'sugars_serving': (parseFloat(prevNutritionData.product.nutriments.sugars_serving) + (parseFloat(product.nutriments.sugars_serving) * quantity)).toString(),
                        'trans-fat_serving': (parseFloat(prevNutritionData.product.nutriments['trans-fat_serving']) + (parseFloat(product.nutriments['trans-fat_serving']) * quantity)).toString()
                      },
                      product_name: product.product_name,
                      brand_owner: product.brand_owner
                    }
                  }));
                }
            });
          }, [props.data]);
    
  return (
    <div className='nutrition-facts'>
        <div className='nutrition-value'>Product: <div>{nutritionData.product.product_name}</div>{nutritionData.product.brand_owner}</div>
        {nutritionData.product.nutriments['energy-kcal_serving'] ? 
            <div className='nutrition-value'>Calories: {nutritionData.product.nutriments['energy-kcal_serving']}</div> : <></>}
        {nutritionData.product.nutriments.fat_serving ?
            <div className='nutrition-value'>Total Fat: {nutritionData.product.nutriments.fat_serving}g</div> : <></>}
        {nutritionData.product.nutriments['saturated-fat_serving'] ?
        <div className='nutrition-value'>Saturated Fat: {nutritionData.product.nutriments['saturated-fat_serving']}g</div> : <></>}
        {nutritionData.product.nutriments['trans-fat_serving'] ?
        <div className='nutrition-value'>Trans Fat: {nutritionData.product.nutriments['trans-fat_serving']}g</div> : <></>}
        {nutritionData.product.nutriments.cholesterol_serving ?
        <div className='nutrition-value'>Cholesterol: {(parseFloat(nutritionData.product.nutriments.cholesterol_serving) * 1000).toFixed(2).replace(/\.?0+$/, '')}mg</div> : <></>}
        {nutritionData.product.nutriments.sodium_serving ?
        <div className='nutrition-value'>Sodium: {(parseFloat(nutritionData.product.nutriments.sodium_serving) * 1000).toFixed(2).replace(/\.?0+$/, '')}mg</div> : <></>}
        {nutritionData.product.nutriments.carbohydrates_serving ?
        <div className='nutrition-value'>Total Carbohydrate: {nutritionData.product.nutriments.carbohydrates_serving}g</div> : <></>}
        {nutritionData.product.nutriments.fiber_serving ?
        <div className='nutrition-value'>Dietary Fiber: {nutritionData.product.nutriments.fiber_serving}g</div> : <></>}
        {nutritionData.product.nutriments.sugars_serving ?
        <div className='nutrition-value'>Total Sugars: {nutritionData.product.nutriments.sugars_serving}g</div> : <></>}
        {nutritionData.product.nutriments.proteins_serving ?
        <div className='nutrition-value'>Protein: {nutritionData.product.nutriments.proteins_serving}g</div> : <></>}
    </div>
  )
}

export default NutritionTableTotaled