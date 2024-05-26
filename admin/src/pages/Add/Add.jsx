import React, { useState, useEffect } from 'react'
import './Add.css'
import {assets} from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add=({url}) => {
    
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name:"",
        description:"",
        price:"",
        sex:"Men",
        category: "Shirt",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('sex', data.sex)
        formData.append('category', data.category)
        formData.append('image',image)
        const response = await axios.post(`${url}/api/product/add`, formData) // end point
        if (response.data.success) {
            setData({
                name:"",
                description:"",
                price:"",
                sex: "Men",
                category:"Shirt",
            })
            setImage(false)
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here'/>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Sex</p>
                        <select name='sex' value={data.sex} onChange={onChangeHandler}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name='category' value={data.category} onChange={onChangeHandler}>
                            <option value="Shirt">Shirt</option>
                            <option value="T-shirt">T-shirt</option>
                            <option value="Quần Short">Quần Short</option>
                            <option value="Quần dài">Quần dài</option>
                            <option value="Áo khoác">Áo khoác</option>
                            <option value="Áo Len">Áo Len</option>
                            <option value="Áo Hoodie">Áo Hoodie</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='VND' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add