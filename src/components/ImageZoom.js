export default function ImageZoom({ scale, scaleTo, reset }) {
    const handleZoom = (newScale) => {
        if (newScale === 0) {
            reset();
        } else {
            scaleTo(scale * newScale);
        }
    }
    return <div className="image-zoom">
        <button type="button" 
            title="Zoom in"
            onClick={() => handleZoom(0.7)}>-</button>
        <button type="button"
            title="Reset"
            onClick={() => handleZoom(0)}>Reset</button>
        <button type="button"
            title="Zoom Out"
            onClick={() => handleZoom(1.3)}>+</button>
    </div>
}