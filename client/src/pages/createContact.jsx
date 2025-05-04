import React, { useState } from 'react'
import Input from '../components/input'
import { DollarSign, Key, User } from 'lucide-react'


const createContact = () => {
    const [name , setName] = useState("")
    const [quantity , setQuantity] = useState("")
    const [price , setPrice] = useState("")
    const handleCreateContact = () => {

    }

    
  return (
    <div>
        <div>
            <form onSubmit={handleCreateContact}>
            <h1 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>Welcome to the contact Creation page</h1>
            <Input
            icon={User}
            type = "text"
            placeholder = "Enter Name Of Contact"
            value={name}
            onChange = {(e) => setName(e.target.value) }
        
            />  
            <Input
            icon={Key}
            type = "text"
            placeholder = "Enter the Quantity"
            value = {quantity}
            onChange = { (e) => setQuantity(e.target.value)}
            />
            
        <Input
        icon={DollarSign}
        type="Numbet"
        placeholder = "Enter Price"
        value = {price}
        onChange = {(e) => setPrice(e.target.value)}
        />
        <div>
            <button className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2
                focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'>
                ENTER
            </button>
        </div>
            </form>
        </div>
    </div>
  )
}

export default createContact