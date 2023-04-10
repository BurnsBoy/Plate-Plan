import {useState} from 'react'
import { server_calls } from '../api/server';
import ProductSearch from './ProductSearch';
import ItemData from './ItemData';

const ProductBrowser = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState({'products': [{'code':'',
    'product_name':'', 'image_url':''}]});
    const [ selectedProduct, setSelectedProduct ] = useState(String);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setSelectedProduct('');
        setLoading(true);
        event.preventDefault();
        setSearchData(await server_calls.getFood(inputValue.toLowerCase()));
        setLoading(false);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    
    return (
        <div>
            <div className='search-info'>Food products and information provided by: "<a href="https://us.openfoodfacts.org">https://us.openfoodfacts.org</a>"</div>
            <form onSubmit={handleSubmit} className='search-bar'>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Food Products..."
                    value={inputValue}
                    onChange={handleInputChange}
                /> 
                <button type="submit" className='btn'><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div>
                {loading ? 
                    <div className='search-info'>Loading...</div>
                :<></>}
            {
                searchData['products'].length > 1 ? (
                    <div className='search-and-data'>
                        <ProductSearch searchData={searchData} setSelection={setSelectedProduct}/>
                        {selectedProduct != '' ?
                            <ItemData code={selectedProduct}/>
                            : <></>
                        }
                        
                    </div>

                ) : <></>}
        </div>
        </div>
    )
}

export default ProductBrowser