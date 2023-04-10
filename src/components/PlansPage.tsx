import React, { useState, useEffect } from 'react';
import { server_calls } from '../api/server';
import { auth } from '../config/firebase';
import NutritionTable from './NutritionTable';
import SavedProductDisplay from './SavedProductDisplay';

const PlansPage = () => {
  const [nutritionData, setNutritionData] = useState({
    'product': {
      'nutriments': {
        'cholesterol_serving':'',
        'carbohydrates_serving':'',
        'energy-kcal_serving':'',
        'fat_serving':'',
        'fiber_serving':'',
        'proteins_serving':'',
        'saturated-fat_serving':'',
        'sodium_serving':'',
        'sugars_serving':'',
        'trans-fat_serving':''
      }, 
      'product_name':'', 
      'brand_owner':''
    }
  });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [datesPresent, setDatesPresent] = useState([''])
  const [productsInDate, setProductsInDate] = useState([{'id': '', 'product_code':'', 'quantity':''}])
  const [imageUrls, setImageUrls] = useState(['']);
  const [nutritionByDate, setNutritionByDate] = useState([nutritionData]);
  const [editId, setEditId] = useState('');
  const [editNutritionData, setEditNutritionData] = useState(nutritionData)
  const [editQuantity, setEditQuantity] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [editCode, setEditCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [ editing, setediting ] = useState(false);
  const [ edited, setedited ] = useState(false);

  const editProduct = (id:string, nutrition:{'product': {'nutriments': {
      'cholesterol_serving':string,'carbohydrates_serving':string,'energy-kcal_serving':string,'fat_serving':string,
      'fiber_serving':string,'proteins_serving':string,'saturated-fat_serving':string,'sodium_serving':string,
      'sugars_serving':string,'trans-fat_serving':string}, 'product_name':string, 'brand_owner':string}}, quantity:string, code:string) =>{
    setEditId(id)
    setEditNutritionData(nutrition)
    setEditQuantity(quantity)
    setInputValue(parseFloat(quantity).toFixed(0))
    setEditCode(code)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (editId != '' && auth.currentUser != null){
      setediting(true)
      const product_code = editCode
      const date = dateValue
      let quantity = inputValue
      if (quantity == '')
        quantity = '1'
      server_calls.editProduct({product_code, date, quantity}, auth.currentUser.uid, editId)
      setediting(false)
      setedited(true)
      setTimeout(() => {setedited(false)}, 1000)
      getDateInfo(date)
    }
  }
  const deleteProduct= async (id:string) => {
    if (auth.currentUser != null){
        server_calls.delete(auth.currentUser.uid, id);
        if (editId == id){
          setEditId('')
        }
        setTimeout(() => {getDateInfo(dateValue)}, 500)
    }

}
  
  useEffect(() => {
    const findDates = async () => {
      if (auth.currentUser != null) {
        const productsData = await server_calls.getProducts(auth.currentUser.uid);
        let dates = ['']
        
        for (const {date} of productsData) {
          if (!dates.includes(date)){
            if (dates[0] == ''){
              dates[0] = date
            }
            else{
              dates.push(date)
            }

          }
        } 
        dates.sort()
        
        setDatesPresent(dates)
      }
    }

    findDates();
  }, []);
  
  const getDateInfo = async (viewDate: string) => {
    setLoading(true)
    if (auth.currentUser != null) {
        setDateValue(viewDate)
        const productsData = await server_calls.getProducts(auth.currentUser.uid);
        let ch = 0, ca = 0, en = 0, fa = 0, fi = 0, pr = 0, sf = 0, so = 0, su = 0, tf = 0;
        let productCodes = []
        let productsInDateData = []
        let imageUrlData = []
        let nutritionInfoData = []
        for (const {product_code, date, quantity, id} of productsData) {
          const productNutrition = await server_calls.getNutrition(product_code);       
            if (viewDate == date) {
              let productInfo = await server_calls.getFoodByCode(product_code)
              let nutrition =  await server_calls.getNutrition(product_code)
              imageUrlData.push(productInfo.product.image_url)
              nutritionInfoData.push(nutrition)
              productCodes.push(await server_calls.getFoodByCode(product_code))
              productsInDateData.push(await server_calls.getProduct(auth.currentUser.uid,id))
              
              if (productNutrition.product.nutriments.cholesterol_serving) {
                ch += parseFloat(productNutrition.product.nutriments.cholesterol_serving) * quantity;
              }
              if (productNutrition.product.nutriments.carbohydrates_serving) {
                ca += parseFloat(productNutrition.product.nutriments.carbohydrates_serving) * quantity;
              }
              if (productNutrition.product.nutriments['energy-kcal_serving']) {
                en += parseFloat(productNutrition.product.nutriments['energy-kcal_serving']) * quantity;
              }        
              if (productNutrition.product.nutriments.fat_serving) {
                fa += parseFloat(productNutrition.product.nutriments.fat_serving) * quantity;
              }   
              if (productNutrition.product.nutriments.fiber_serving) {
                fi += parseFloat(productNutrition.product.nutriments.fiber_serving) * quantity;
              }    
              if (productNutrition.product.nutriments.proteins_serving) {
                pr += parseFloat(productNutrition.product.nutriments.proteins_serving) * quantity;
              }       
              if (productNutrition.product.nutriments['saturated-fat_serving']) {
                sf += parseFloat(productNutrition.product.nutriments['saturated-fat_serving']) * quantity;
              }   
              if (productNutrition.product.nutriments.sodium_serving) {
                so += parseFloat(productNutrition.product.nutriments.sodium_serving) * quantity;
              }    
              if (productNutrition.product.nutriments.sugars_serving) {
                su += parseFloat(productNutrition.product.nutriments.sugars_serving) * quantity;
              }   
              if (productNutrition.product.nutriments['trans-fat_serving']) {
                tf += parseFloat(productNutrition.product.nutriments['trans-fat_serving']) * quantity;
              }
            }
        }
        setNutritionData({
            'product': {
                'nutriments': {
                'cholesterol_serving':ch.toString(),
                'carbohydrates_serving':ca.toString(),
                'energy-kcal_serving':en.toString(),
                'fat_serving':fa.toString(),
                'fiber_serving':fi.toString(),
                'proteins_serving':pr.toString(),
                'saturated-fat_serving':sf.toString(),
                'sodium_serving':so.toString(),
                'sugars_serving':su.toString(),
                'trans-fat_serving':tf.toString()
                }, 
                'product_name':viewDate, 
                'brand_owner':''
            }
        })
        setImageUrls(imageUrlData)
        setNutritionByDate(nutritionInfoData)
        setProductsInDate(productsInDateData)
        setDataLoaded(true) 
        setLoading(false)
    }
    
};

  return (
    <div>
      <div>
        <div className='date-btn-container'>
          {datesPresent.map((date, index) => (
            <button className='date-btn' key={index} onClick={() => getDateInfo(date)}>{date}</button>
          ))}
        </div>
        {loading ?
        <div>Loading...</div>
        :<></>}
        {dataLoaded ? 
        <div>
          <div className='main-data'>
          <NutritionTable data={nutritionData} />
          {editId != '' ?
            <div className="edit-product">
              {editNutritionData ? <NutritionTable data={editNutritionData}/>: <></>}
              <form onSubmit={handleSubmit}>
            <div>
            <div className="add-servings">
              <div>
              <input
                      type="number"
                      className="serving-input"
                      placeholder={editQuantity}
                      value={inputValue}
                      onChange={handleInputChange}
                  />Serving{inputValue != '1' && inputValue != '' ? 's': ''}
              </div>
              {editing ?
              <div>editing...</div>
              :<></>}
              {edited ?
              <div>edited!</div>
              :<></>}
              {!editing && !edited ?
              <button type="submit" className='btn'><i className="fa-solid fa-check"></i></button>
              :<></>}
            </div>
            </div>
          </form>
            </div>
            :<></>}
          </div>
          <SavedProductDisplay data={productsInDate} nutritionInfo={nutritionByDate} 
          imageUrls={imageUrls} editProduct={editProduct} deleteProduct={deleteProduct}/>

        </div>
        : (
        <></>
    )}
        
  </div>
    </div>
  );
};

export default PlansPage;