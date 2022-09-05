
import './filtergroup.css'
function FilteredGroup (props){
    const {Category,onCategoryUpdation,ratingOption,onRatingUpdation,onClearFilter} = props
   
    const ClickCategoryUpdation = (event)  =>{
    onCategoryUpdation(event.target.value)  
    }
    const ClickRatingUpdation = (event) =>{
    onRatingUpdation(event.target.value)

    }
    const onClickFilterButton   = () =>{
        onClearFilter("")
    }
    return (
        <div className='all-filter-group-container'>
        <div className='category-container'>
            <h1 className='category-heading'>Category</h1>
            <ul className='category-unorderlist'>
            {Category.map(currentItem =>{
                return   <li className='category-list' key={currentItem.categoryId} value={currentItem.categoryId} onClick = {ClickCategoryUpdation}>{currentItem.name}</li>
            })}
             </ul>

        </div>
        <div className='container-for-rating'>
            <h3 className='rating-heading'>Rating</h3>
            <ul className='rating-unorder-list'>
            {ratingOption.map((eachItem,index) =>{
                    return <li key={eachItem.ratingId}  className = "rating-list"> 
                        <img alt ={`rating ${eachItem.ratingId}`} src = {eachItem.imageUrl} className = "rating-image"></img>
                        <button value = {eachItem.ratingId} onClick={ClickRatingUpdation}   className='up-button' id = "button">&up</button> 
                    </li>
                })}
                
            </ul>
       
                
        </div>
            <div className='clear-filter-button'>
            <button onClick={onClickFilterButton}>clear Filter</button>
            </div>
    

        </div>
    )
}
export default FilteredGroup