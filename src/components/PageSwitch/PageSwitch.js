import React from 'react';
import './PageSwitch.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import PageList from '../PageList';
import Page from '../Page';
import HelmetComponent from '../HelmetComponent';
import {META_DESCRIPTION, META_TITLE} from '../../constants';

class DebugRouter extends BrowserRouter {
    constructor(props) {
        super(props);
        //console.log('initial history is: ', JSON.stringify(this.history, null,2))
        this.history.listen((location, action)=>{
/*            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            )
            console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));*/
        });
    }
}


const PageSwitch = () => (
    <div>
        <HelmetComponent title={META_TITLE } description={META_DESCRIPTION} canonical={'Page'} />
        <DebugRouter>
            <Switch>
                <Route exact path='/Pages' component={PageList} />
                <Route path='/Pages/:number' component={Page} />
            </Switch>
        </DebugRouter>
    </div>
);

export default PageSwitch;
