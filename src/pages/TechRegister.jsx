import React from 'react'
import Navbar from '../components/Navbar'
import "./TechRegister.scss"

function TechRegister() {
    const inputFields = [
        {
            title: "First Name",
            placeholder: "Enter your first name",
            type: "text"
        },
        {
            title: "Last Name",
            placeholder: "Enter your last name",
            type: "text"
        }, 
        {
            title: "Company Name",
            placeholder: "Enter company name",
            type: "text"
        }, 
        {
            title: "Mobile Number",
            placeholder: "Enter mobile number",
            type: "text"
        }, 
        {
            title: "Current district",
            placeholder: "Select district",
            type: "dropdown",
            name: "district-select"
        }, 
        {
            title: "Current address",
            placeholder: "Select address",
            type: "text"
        }, 
        {
            title: "Current city",
            placeholder: "Enter current city",
            type: "text"
        }, 
        {
            title: "Work Experience",
            placeholder: "Enter work experience",
            type: "text"
        }, 
        {
            title: "Upload Photo",
            placeholder: "Select photo",
            type: "upload"
        }, 
        {
            title: "Upload Certificate",
            placeholder: "Select certificate",
            type: "upload"
        }, 
    ]
    return (
        <>
            <Navbar />
            <div id='tech-register-container'>
                <div id='fields-container'>
                    {inputFields.map((field,index) => {
                        if(field.type === "text"){
                            return <div key={index}>
                                <p>{field.title}</p>
                                <input type="text"  placeholder={field.placeholder} />
                            </div>
                        } else if (field.type === "dropdown") {
                            return <div key={index}>
                                <label htmlFor=''>{field.title}</label>
                                <select name={field.name} id={field.name}>
                                    <option value="sangli">Sangli</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="bangalore">Bangalore</option>
                                </select>
                            </div>
                        } else if (field.type === "upload") {
                            return <div key={index}>
                                <p>{field.title}</p>
                                <input type="file" id="myFile" name="filename" />
                            </div>
                        }
                    })}
                    <button>Register</button>
                </div>
            </div>
        </>
    )
}

export default TechRegister