import React from 'react'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useStateContext } from 'context/StateContext'
import {BsBagCheckFill} from 'react-icons/bs' 
import { runFireworks } from '@/lib/utils'

const success = () => {
    const {setCartItems, setTotalQuantities,setTotalPrice} = useStateContext();
    useEffect(()=>{
        setCartItems([]);
        setTotalQuantities(0);
        setTotalPrice(0);
        runFireworks();
    },[])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thankyou for your order</h2>
            <p className='email-msg'>Check your email inbox for teh order receipt.</p>
            <p className='description'>
                If you have any questions. Email: <a href="mailto:huzaifablogger.contact@gmail.com" className='email'>huzaifablogger.contact@gmail.com</a>
            </p>
            <Link href="/">
                <button type='button' className='btn' width="300px">
                    Continue Shopping
                </button>
            </Link>
            
        </div>
    </div>
  )
}


export default success
