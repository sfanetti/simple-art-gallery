import { useState } from 'react';
import failed from '../embedded/failed.svg';
import ImageZoom from './ImageZoom';

const DEFAULT = { scale: 1, x: 0, y: 0 };

const getDefinitionList = (term, definition) => {
    return definition ? (<>
        <dt>{term}</dt>
        <dd>{definition}</dd>
    </>) : '';
}
let lastData;

export default function Gallery({ data, isLoading, onImageLoad }) {
    let offsetX, offsetY, isDragging;
    let [transformData, setTransform] = useState(DEFAULT);
    const { primaryImage, title, artistDisplayName, objectDate } = data;
    const hasMetadata = title || artistDisplayName || objectDate;
    const hasPrimaryImage = !!primaryImage;
    if (lastData !== data) {
        lastData = data;
        setTimeout(onReset, 5);
    }
    if (!hasPrimaryImage) {
        setTimeout(onImageLoad, 500);
    }

    function onScaleChange(scale) {
        const newData = Object.assign({...transformData}, {scale})
        setTransform(newData);
    }

    function onReset() {
        setTransform({...DEFAULT}); 
        onStopDrag();
    }
    function onStartDrag(e) {
        if(e.preventDefault) e.preventDefault();
        isDragging = true;
        const { x, y, scale } = transformData;
        offsetX = e.clientX - (scale * x);
        offsetY = e.clientY - (scale * y);
        document.onmousemove = onDraggingImage;
        return false;

    }
    function onDraggingImage(e) {
        if (!isDragging) {return};
        const { clientX, clientY } = e;
        const { scale } = transformData;
        const newX = (clientX - offsetX)/scale;
        const newY = (clientY - offsetY)/scale;
        setTransform(Object.assign({...transformData}, { x: `${newX}`, y: `${newY}` }));
        return false;
    }
    function onStopDrag() {
        document.onmousemove = null;
        isDragging=false;
    }

    document.onmouseup = onStopDrag;

    return <div className='gallery-area' onMouseUp={onStopDrag}>
                <div className='gallery-container'>
                    <img onMouseDown={onStartDrag} onMouseUp={onStopDrag}
                        style={{ 
                            transform:`scale(${ transformData.scale}) translate(${transformData.x}px, ${transformData.y}px)`,
                            transition: `opacity ease-in-out 300ms`
                        }}
                        className={`drag-me ${!hasPrimaryImage ? 'failed' : ''}`}
                        onLoad={onImageLoad}
                        onError={onImageLoad}
                        crossOrigin='anonymous'
                        loading='eager'
                        alt={title} 
                        src={hasPrimaryImage ? primaryImage : failed}/>
                        <ImageZoom 
                            scale={ transformData.scale } 
                            reset={onReset}
                            scaleTo={onScaleChange}/>
                </div>
                {
                hasMetadata ? 
                    (
                        <div className="image-data">
                            <dl>
                                {getDefinitionList('Title', title)}
                                {getDefinitionList('Artist', artistDisplayName)}
                                {getDefinitionList('Year', objectDate)}
                            </dl>
                        </div>
                    ) : <div className="image-data">{isLoading ? 'Loading...' : 'No data available'}</div>
                }
        </div>
}