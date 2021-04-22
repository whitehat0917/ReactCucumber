import React from 'react';
import ArtworkFilterForm from './ArtworkFilterForm';
import { useDispatch } from 'react-redux';

import Drawer from 'components/Drawer';

const ArtworkFilter = () => {
    const dispatch = useDispatch();

    return (
        <Drawer open={true}>
            <ArtworkFilterForm 
                dispatch={dispatch}
                onClose={() => console.log('onClose')} />
        </Drawer>
    );
}

export default ArtworkFilter;