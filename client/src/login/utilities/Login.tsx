import React, { useState, useEffect } from 'react';



//LOGIN
const f_asyncLogin =  async (user_param, password_param)  =>  {
  

    let user_password_param = {"username": user_param,"password": password_param};

    let response =  await fetch('/login',  {
                                                          method: 'POST',
                                                          headers: {
                                                                     'Content-Type': 'application/json;charset=utf-8'
                                                                   },
                                                                   body: JSON.stringify(user_password_param)
                                                        });
   
  
    if (response.status == 401) {
       return 401;
    } else {
        var result  = await response.json();
       //save token in local storage
       localStorage.setItem('token_param', AddToLocalStorage(result.token));
       //Return
       return 1;
      
    }
}
 // this function converts JSON into string to be entered into localStorage
 function AddToLocalStorage(data) {
 if (typeof data != "string") {data = JSON.stringify(data);}
     return data;
 }

export  {f_asyncLogin}

