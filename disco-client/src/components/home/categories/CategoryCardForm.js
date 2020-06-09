import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCategory } from '../../../redux/actions/categories';

const CategoryCardForm = ({ addCategory, setNewCategory }) => {
    const [ title, setTitle ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!title) {
            return;
        }
        addCategory(title);
        setTitle('');
        setNewCategory([]);
    }

    return (
        <div className="item-card">
            <div className="time-code"></div>
                <div className="title">
                    <form onSubmit={handleSubmit}>
                        <input className="card-input" type="text" value={title}
                            placeholder="title..." onChange={(e) => setTitle(e.target.value)} />
                    </form>
            </div>
        </div>
    )
}

export default connect(null, { addCategory })(CategoryCardForm);