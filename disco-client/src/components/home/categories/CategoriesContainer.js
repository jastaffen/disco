import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../../redux/actions/categories';

import CategoryCard from './CategoryCard';
import CategoryCardForm from './CategoryCardForm';

const CategoriesContainer = ({ getCategories, categoryState: { loading, categories } }) => {
    let [ newCategory, setNewCategory ] = useState([]);
    
    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
    }, [ getCategories, categories.length ]);


    const renderCategoryCardForms = () => {
        return newCategory.map((cat, index) => (
            <CategoryCardForm key={index} setNewCategory={setNewCategory} />
        ));
    }

    return (
        <div className="item-container">
            { !loading && categories.map(category => (
                <CategoryCard key={category._id} category={category} />
            ))}
            { newCategory.length > 0 && renderCategoryCardForms() }
            <div key={'add'} className="item-card" 
                onClick={() => setNewCategory([...newCategory, 'new'])}>
                <button>+</button>  
            </div>
        </div>
    )
}

const msp = state => ({
    categoryState: state.categories
})

export default connect(msp, { getCategories })(CategoriesContainer);