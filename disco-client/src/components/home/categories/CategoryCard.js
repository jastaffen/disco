import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCategory, deleteCategory, selectCategory } from '../../../redux/actions/categories';


const CategoryCard = ({ category, updateCategory, deleteCategory, selectCategory }) => {
    const holder = category.title;
    const [ title, setTitle ] = useState(holder);
    const [ activeForm, setActiveForm ] = useState(false);

    const handleFormFocus = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleCategoryUpdate = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!title) return;
        updateCategory(title, category._id);
        setTitle(title);
        setActiveForm(false);
    }

    const handleCategoryDelete = e => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete the category? Deleting a category will also delete its contents.')) {
            deleteCategory(category._id);
        }
    }

    const activateFormToggle = e => {
        e.preventDefault();
        e.stopPropagation();
        setActiveForm(!activeForm)
    }

    

    return (   
        <Link to={`/${category._id}`} className="item-card"  onClick={() => selectCategory(category)}>
            <div>
                <div className="time-code">
                    <div className="top-right">
                        <button onClick={activateFormToggle}>
                            { activeForm ? 'Back' : 'Edit' }
                        </button>
                        <button onClick={handleCategoryDelete}>x</button>
                    </div>           
                </div>
                <div className="title">
                    { activeForm ? 
                        <form onSubmit={handleCategoryUpdate}>
                            <input className="card-input" type="text" value={title} onClick={handleFormFocus}
                            placeholder="title..." onChange={(e) => setTitle(e.target.value)} />
                        </form> 
                    : 
                    <h3>{category.title}</h3>
                }
                
                </div>
            </div>
        </Link>
    )
}

export default connect(null, { updateCategory, deleteCategory, selectCategory })(CategoryCard);