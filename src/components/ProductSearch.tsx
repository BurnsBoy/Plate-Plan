
interface searchProps {
    searchData: {'products': {
        'code':string,
        'product_name':string,
        'image_url':string
        }[]},
    setSelection: (code: string) => void;
}

const ProductSearch = (props: searchProps) => {
    
    return (
        <div className='search-grid'>  
            {props.searchData['products'].map(({ code, product_name, image_url}, index) =>
                <div key={index} className='search-result' onClick={() => props.setSelection(code)}>
                    <img className='search-img' src={image_url} alt=""/>
                    <div className='search-name'>{product_name}</div>
                </div>,
            )}
            
        </div>
    )
}

export default ProductSearch