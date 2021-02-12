import React, { useState } from 'react';
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "your_api_here",
  });

export default function SearchPhotos() {

    const [query, setQuery] = useState(""); //store query response
    const [pics, setPics] = useState([]); //array of objects, store JSON response

    const searchPhotos = async (e) => {
        e.preventDefault(); // to stop page from reloading whenever Search button is clicked.
        unsplash.search
            .photos(query, 1, 10) //specifying what we search for
            .then(toJson) // convert response into JSON
            .then((json) => {
                console.log(json)
            setPics(json.results);
        });
    }

    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                {""}
                 📷
                </label>
                <input
                type="text"
                name="query"
                className="input"
                placeholder={` Try "dog" or "apple" `}
                value={query}
                onChange={(e) => setQuery(e.target.value)} //will be used to update the state
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>  
            <div className="card-list">
                {
                    pics.map((pic) => <div className="card" key={pic.id}>
                        <img 
                        className="card--image"
                        alt={pic.alt_description}
                        src={pic.urls.full}
                        width="50%"
                        height="50%"
                        ></img>
                    </div>)
                }
            </div>
        </>
    );
}