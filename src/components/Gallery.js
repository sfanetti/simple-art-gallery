import { useState } from 'react';
import failed from '../embedded/failed.svg';
import ImageZoom from './ImageZoom';

const DEFAULT = { scale: 1, x: 0, y: 0 };
const CURSORS = { 
    grabbing: 'is-grabbing',
    grab: 'is-grab',
    zoomIn: 'is-zoom-in',
    zoomOut: 'is-zoom-out',
};

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
    let [cursorType, setCursorType] = useState(CURSORS.grab);
    let scrollTimer;
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
        setTransform({...transformData, scale});
    }

    function onReset() {
        setTransform({...DEFAULT}); 
        onStopDrag();
    }

    function onStartDrag(e) {
        if(e.preventDefault) e.preventDefault();
        isDragging = true;
        const { x, y, scale } = transformData;
        const { clientX, clientY } = e;
        offsetX = clientX - (scale * x);
        offsetY = clientY - (scale * y);
        document.onmousemove = onDraggingImage;
        setCursorType(CURSORS.grabbing);
        return false;
    }
    function onDraggingImage(e) {
        if (!isDragging) {return};
        const { clientX, clientY } = e;
        const { scale } = transformData;
        const x = (clientX - offsetX)/scale;
        const y = (clientY - offsetY)/scale;
        setTransform({...transformData, x, y});
        setCursorType(CURSORS.grabbing);
        return false;
    }
    function onStopDrag() {
            document.onmousemove = null;
            setCursorType(CURSORS.grab);
        isDragging=false;
        }
    function onScroll(e) {
        const { deltaY } = e;
        const { scale } = transformData;
        
        let cursor, factor;
        if (deltaY > 0) {
            factor = 1.05;
            cursor = CURSORS.zoomIn;
        } else {
            factor = 0.95;
            cursor = CURSORS.zoomOut;
        }
        setCursorType(cursor);
        onScaleChange(scale * factor);

        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            setCursorType(CURSORS.grab);
        }, 1000);
    }
    document.onmouseup = onStopDrag;
    return <div className='gallery-area' onMouseUp={onStopDrag} onWheel={onScroll}>
                <div className={`gallery-container ${cursorType}`}>
                    <img style={{ 
                            transform:`scale(${ transformData.scale}) translate(${transformData.x}px, ${transformData.y}px)`,
                            transition: `opacity ease-in-out 300ms`
                        }}
                        className={`drag-me ${!hasPrimaryImage ? 'failed' : ''}`}
                        onMouseDown={onStartDrag}
                        onMouseUp={onStopDrag}
                        onLoad={onImageLoad}
                        onError={onImageLoad}
                        crossOrigin='anonymous'
                        loading='eager'
                        alt={title} 
                        src={hasPrimaryImage ? primaryImage : failed}/>
                        <ImageZoom 
                            scale={transformData.scale} 
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