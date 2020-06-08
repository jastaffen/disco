import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getCategories } from '../../redux/actions/categories';

const CategoriesContainer = ({ getCategories, categoryState: { loading, categories } }) => {

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div>
            { !loading && categories.map(category => (
                <div>
                    {category.title}
                </div>
            ))}
        </div>
    )
}

const msp = state => ({
    categoryState: state.categories
})

export default connect(msp, { getCategories })(CategoriesContainer);