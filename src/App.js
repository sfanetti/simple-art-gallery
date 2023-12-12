import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import Gallery from './components/Gallery';
import ButtonBar from './components/ButtonBar';
import { useEffect, useState } from 'react';
import {fetchData} from './features/dataSlice'

function App() {
  const dispatch = useDispatch();
  const { imageId, artData} = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    dispatch(fetchData())
  }, [imageId])

  return (
    <div className={`App ${isLoading ? 'is-loading' : ''}`}>
      <h2 className='title-area'>{isLoading ? 'Loading...' : (artData.title || 'No data')}</h2>
      <Gallery data={artData} onImageLoad={() => setIsLoading(false)} />
      <ButtonBar 
        imageId={imageId} 
        isLoading={isLoading}/>
    </div>
  );
}

export default App;
