import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateCategory } from '../../redux/actions/categories';

const CategoryCard = ({ category, updateCategory }) => {
    const holder = category.title;
    const [ title, setTitle ] = useState(holder);
    const [ activeForm, setActiveForm ] = useState(false);

    const handleCategoryUpdate = e => {
        e.preventDefault();
        if (!title) return;
        updateCategory(title, category._id);
        setTitle(title);
        setActiveForm(false);
    }

    return (
        <div className="item-card">
            <div className="time-code">
                <div className="top-right">
                    <button onClick={() => setActiveForm(!activeForm)}>
                        { activeForm ? 'Back' : 'Edit' }
                    </button>
                    <button>x</button>
                </div>           
            </div>
            <div className="title">
                { activeForm ? 
                    <form onSubmit={handleCategoryUpdate}>
                        <input className="card-input" type="text" value={title}
                            placeholder="title..." onChange={(e) => setTitle(e.target.value)} />
                    </form> 
                    : 
                    <h3>{category.title}</h3>
                }
                
            </div>
        </div>
    )
}

export default connect(null, { updateCategory })(CategoryCard);