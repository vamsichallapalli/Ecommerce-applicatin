import './productHeader.css'
import { FaFilter } from "react-icons/fa";
function ProductHeader(props){
    const {sortByOptionslist,activeOptionid,OnOptionUpdation,titleSearch,onTitleUpdationfun} = props
   function onChangeSortBy(event){
        OnOptionUpdation(event.target.value)
    }
    function onInputSearchChange(event){
      onTitleUpdationfun(event.target.value)
    }
    return (
      <div className='product-header-container'>
        <input type = "search" placeholder='search' value = {titleSearch} onChange = {onInputSearchChange} className = "input-search"/>
        <h1 className='all-products-heading'>All Products</h1>
        <div className='sort-container'>
        <FaFilter className='filter-icon'/>
        <p className='sort-by-para'>sort by</p>
    
        <select value = {activeOptionid} onChange = {onChangeSortBy}>
        {sortByOptionslist.map(currentItem=>{
            return <option value={currentItem.optionId}  className = "each-option-value">{currentItem.displayText}</option>
        })}</select>
        </div>
         
      </div>
       
    )
}
export default ProductHeader