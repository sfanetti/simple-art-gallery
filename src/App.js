import './App.css';
import Gallery from './components/Gallery';
import ButtonBar from './components/ButtonBar';
import { useState, useEffect } from 'react';
import { LOWER_LIMIT, UPPER_LIMIT } from './constants/limits';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageId, setImageId] = useState(LOWER_LIMIT);
  const [data, setData] = useState({});
  const [scanningData, setIsScanning] = useState({ isScanning: false, direction: 0 });
  
  useEffect(() => {
      document.title='Welcome to Artworld'
      setIsLoading(true);
      try {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imageId}`)
        .then(response =>response.json())
        .then(json => {
          const {title, primaryImage: uncached } = json;
          document.title = title;
          const primaryImage = !uncached ? null :  `${uncached}?t=${Date.now()}`
          const processed = Object.assign(json, {primaryImage});
          setData(processed);
          const { isScanning, direction } = scanningData;
          const nextImageId = imageId + direction;

          if (isScanning && nextImageId >= LOWER_LIMIT && nextImageId < UPPER_LIMIT) {
            if (uncached) {
              setIsScanning({ isScanning: false});
            } else {
              setImageId(imageId + direction);
            }
          }
        });
      } catch(e) {
        setIsLoading(false);
      }

  }, [imageId, scanningData])

  const onChangeImageId = (newImageId) => {
    setIsScanning({ isScanning: false });
    setImageId(newImageId);
  }
  const onScan = (direction) => {
    setIsScanning({ isScanning: true, direction});
    setImageId(imageId + direction);
  }

  return (
    <div className={`App ${isLoading ? 'is-loading' : ''}`}>
      <h2 className='title-area'>{isLoading ? 'Loading...' : (data.title || 'No data')}</h2>
      <Gallery data={data} onImageLoad={() => {setIsLoading(false)}} />
      <ButtonBar 
        imageId={imageId} 
        isLoading={isLoading} 
        onChangeImageId={onChangeImageId}
        onScan={onScan} />
    </div>
  );
}

export default App;
