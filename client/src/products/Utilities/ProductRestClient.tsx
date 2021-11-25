import React, { useState, useEffect } from 'react';

//Retrieve Products
const f_asyncRetrieveProductsData =  async (token_param)  =>  {
   let response;
     await fetch('/product', {
                                                      headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token_param.trim(),
      'Content-Type': 'application/json'
   }
                                                    
                                                     })
                                                     .then(resp => resp.json())
                                                     .then( (json) => {   response=json.products;
                                                                          console.log(json); 
                                                                      })


return response;
}
export  {f_asyncRetrieveProductsData}

