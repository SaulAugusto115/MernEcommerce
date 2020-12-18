import React from 'react'

const SubCategoryUpdateForm = ({handleSubmit,name,setName,categories,setParent,parent}) =>{

    return(

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label>SubCategory</label>
                <select className="browser-default custom-select custom-select-lg mb-3"
                 onChange={e => setParent(e.target.value)} name="category">
                <option>Select a Category...</option>
                {categories.length > 0 && categories.map((c) => { return (
                        <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                     )})}
                </select>

            
                <br />
                <input type="text" className="form-control" value={name} onChange={s => setName(s.target.value)} placeholder="Update the  subcategory..." autoFocus required />
                <br/>
                <button className="btn btn-primary">Update</button>
            </div>

        </form>
    )

}

export default SubCategoryUpdateForm