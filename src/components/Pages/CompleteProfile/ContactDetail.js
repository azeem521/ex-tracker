import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import classes from './ContactDetail.module.css'

const ContactDetail = () => {
    const [name,setName]=useState();
    const [imgUrl,setImgUrl]=useState();
    const urlGet='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAzlQHFRtkaZpExFfx1mBDR64QU8JL9mO4';

    const getDataHandler=async()=>{
       try {
        const response=await fetch(urlGet,{
            method:"POST",
            body:JSON.stringify({
                idToken:localStorage.getItem('idToken')
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log('data',data);
        setName(data.users[0].displayName)
        setImgUrl(data.users[0].photoUrl)
       } catch (err) {
        console.log(err);
       }
    }

    const nameChangeHandler=(e)=>{
         setName(e.target.value);
    };

    const imgUrlChangeHandler=(e)=>{
        setImgUrl(e.target.value);
    };

    const url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAzlQHFRtkaZpExFfx1mBDR64QU8JL9mO4'

    const submitHandler= async(e)=>{
        e.preventDefault();

try {
    const response=await fetch(url,{
        method:'POST',
        body:JSON.stringify({
            idToken:localStorage.getItem('idToken'),
            displayName:name,
            photoUrl:imgUrl,
            // deleteAttribute: "NULL",
            returnSecureToken:false
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data= await response.json();
} catch (err) {
    alert(err);
}
    }

    useEffect(()=>getDataHandler(),[])

  return (
    <Fragment>
    <form className={classes.main}>

    <div className={classes.header}>
        <div className={classes.ContactDetail}>
        Contact Details
        </div>
       <Link to='/'> <button className={classes.cancel}>Cancel</button></Link>
    </div>
    <div className={classes.input}>
      <div className={classes.left}>
      <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' />
        <div className={classes.fullName}>Full Name : </div>
        <input type='text' onChange={nameChangeHandler} value={name}/>
      </div>
       <div className={classes.right}>
         <img src='data:image/jpeg;base64,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' />
        <div className={classes.photourl}>Profile Photo url : </div>
        <input type='text' onChange={imgUrlChangeHandler} value={imgUrl}/>
       </div>
    </div>
<button className={classes.update} type='submit' onClick={submitHandler}>Update</button>
    <div className={classes.line}></div>
    </form>
    
    </Fragment>
  )
}

export default ContactDetail
