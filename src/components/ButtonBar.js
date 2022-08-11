import { UPPER_LIMIT, LOWER_LIMIT } from "../constants/limits"

export default function ButtonBar({ isLoading, imageId, onChangeImageId, onScan }) {
    const prevDisabled = isLoading ? true : imageId <= LOWER_LIMIT;
    const nextDisabled = isLoading ? true : imageId >= UPPER_LIMIT;

    return (
        <div className="button-bar">
            <button type="button"
                disabled={prevDisabled}
                onClick={() => onScan(-1)} >Scan Prev</button>
            <button type="button" 
                onClick={() => onChangeImageId(Number(imageId - 1)) } 
                disabled={prevDisabled}>Previous</button>
            <input type="number" 
                value={imageId} 
                onInput={(e) => onChangeImageId(Number(e.target.value))}/>
            <button type="button" 
                onClick={() => onChangeImageId(Number(imageId + 1))} 
                disabled={nextDisabled}>Next</button>
            <button type="button"
                disabled={nextDisabled}
                onClick={() => onScan(1)} >Scan Next</button>
        </div>
    )
}