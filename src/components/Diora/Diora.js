import React from 'react';
import './Diora.css';
import {Switch, Route} from 'react-router-dom';
import Diorama from './../Diorama';
import Dioralist from './../Dioralist';
import HelmetComponent from './../HelmetComponent'
import {
    META_DESCRIPTION,
    META_TITLE
} from '../../constants';

const Diora = () => (
    <div>
        <HelmetComponent title={META_TITLE} description={META_DESCRIPTION} canonical={'Diora'} />
        <Switch>
{/*
            <Route path='/Diora' render={(props) => <Homediorama page={'dioramaPage'} {...props} /> } />
*/}
            <Route exact path='/Diora' component={Dioralist} />
            <Route path='/Diora/:number' component={Diorama} />
        </Switch>
    </div>
);

export default Diora;
