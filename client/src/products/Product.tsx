import React, { useState, useEffect } from 'react';
//import Animal from '../game/product/Animal';

import List_New from './ProductListForm';
import update from 'immutability-helper';

import { Route, withRouter, RouteComponentProps } from 'react-router';

import Product from '../products/gateway/Product';

import {f_asyncRetrieveProductsData} from './Utilities/ProductRestClient';

function ProductForm({ match: adminRouteMatch, history }: RouteComponentProps) 
{
let  [products, setProducts] = useState<Product[]>([]);
let ProductList_param;
let jsondata;
let response;

           useEffect(() => { 
                    async function fetchData() 
                    {
                       //RETRIEVE DB PRODUCTS
                       //get token from local storage
                         let  token_localstorage_param =  localStorage.getItem('token_param');

                         let result = await f_asyncRetrieveProductsData (token_localstorage_param);
                         setProducts(result);
                    }
                     fetchData();
                    }, []);

  

 

  return (
    <>
      <List_New    products={products}     />
    </>
 ); // end return
}

export default withRouter(ProductForm);