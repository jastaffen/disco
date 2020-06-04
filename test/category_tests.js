const assert = require('assert');
const User = require('../models/User');

// describe('category subdocument', () => {
//     let joe;
//     beforeEach(async () => {
//         joe = new User({ name: 'Joe', email: 'j@j.j', password: 'Radiohead', categories: [{ title: 'History' }] });
//         await joe.save()
//     })
//     it('Creates a category to an existing record', async () => {
//         joe.categories.push({ title: 'Recipes' });
//         await joe.save();
//         const user = await User.findOne({ name: 'Joe' });
//         assert(user.categories.length === 2 && user.categories[1].title === 'Recipes');
//     });

//     // SUBCATEGORY TEST IS IN PROGRESS
//     // it('Creates a subcategory', async () => {
//     //     joe.categories[0].children.push({ title: 'The French Revolution', isSubCategory: true, parent: joe.categories[0]._id, children: [], videos: [] });
//     //     await joe.save();
//     //     assert(
//     //         joe.categories[0].children.length === 1 && 
//     //         joe.categories[0].children[0].title === 'The French Revolution'
//     //     );
//     // });

//     it('Updates a category', async () => {
//         const category = joe.categories[0];
//         category.title = 'History';
//         await joe.save();
//         assert(joe.categories[0].title === 'History');
//     });

//     it('Removes a category', async () => {
//         const category = joe.categories[0];
//         category.remove();
//         await joe.save();
//         assert(joe.categories.length === 0);
//     })

    
// });