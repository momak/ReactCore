import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import FetchEmployee from './components/FetchEmployee';
import AddEmployee from './components/AddEmployee';  

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/fetchemployee' component={FetchEmployee} />
        <Route path='/addemployee' component={AddEmployee} />
        <Route path='/employee/edit/:empid' component={AddEmployee} /> 
    </Layout>
);
