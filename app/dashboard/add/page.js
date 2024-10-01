"use client";

import React, {useState} from 'react'

const Add = () => {
    const [formData, setFormData] = useState({});

    const handleSubmit = () => {

    }

    return (
        <div>
            <h1 className="text-3xl">Add a new Anime</h1>

            <div className="">
                <form action={handleSubmit}>

                </form>
            </div>
        </div>
    )
}

export default Add;