import React from 'react'

const SubCategoryForm = ({handleSubmit,name,setName}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" value={name} className="form-control" onChange={s => setName(s.target.value)} placeholder="Enter the Sub category..." autoFocus required/>
                <br />
                <button className="btn btn-outline-primary">Save</button>
            </div>
        </form>
    )
}

export default SubCategoryForm