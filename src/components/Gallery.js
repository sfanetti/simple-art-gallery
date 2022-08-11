import React from 'react';
import failed from '../embedded/failed.svg';

const getDefinitionList = (term, definition) => {
    return definition ? (<>
        <dt>{term}</dt>
        <dd>{definition}</dd>
    </>) : '';
}

export default function Gallery({ data, isLoading, onImageLoad}) {
    const { primaryImage, title, artistDisplayName, objectDate } = data;
    const hasMetadata = title || artistDisplayName || objectDate;
    const hasPrimaryImage = !!primaryImage;
    if (!hasPrimaryImage) {
        setTimeout(onImageLoad, 500);
    }
    return <div className='gallery-area'>
                <div className='gallery-container'>
                    <img 
                        className={ !hasPrimaryImage ? 'failed' : ''}
                        onLoad={onImageLoad}
                        onError={onImageLoad}
                        crossOrigin='anonymous'
                        loading='eager'
                        alt={title} 
                        src={hasPrimaryImage ? primaryImage : failed}/>
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