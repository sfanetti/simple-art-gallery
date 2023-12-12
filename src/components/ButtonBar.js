import { UPPER_LIMIT, LOWER_LIMIT } from "../constants/limits"
import { useSelector, useDispatch } from 'react-redux'
import { nextImage, prevImage, setImageId } from "../features/dataSlice";


export default function ButtonBar({ isLoading }) {
    const dispatch = useDispatch();
    const { imageId } = useSelector(state => state) || {};
    const prevDisabled = isLoading ? true : imageId <= LOWER_LIMIT;
    const nextDisabled = isLoading ? true : imageId >= UPPER_LIMIT;

    return (
        <div className="button-bar">
            <button type="button" 
                onClick={() => dispatch(prevImage()) } 
                disabled={prevDisabled}>Previous</button>
            <input type="number" 
                value={imageId} 
                onInput={(e) => dispatch(setImageId(e.target.value))}/>
            <button type="button" 
                onClick={() => dispatch(nextImage())} 
                disabled={nextDisabled}>Next</button>
        </div>
    )
}