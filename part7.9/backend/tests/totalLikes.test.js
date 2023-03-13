const listHelper = require('../utils/list_helper')
const favoriteblog = 
    {
    title: 'Aihe',
    author: 'Minä',
    url: 'yle.fi',
    likes: '5'
    }
const blogs = [
        {
            title: 'Aihe',
            author: 'Minä',
            url: 'yle.fi',
            likes: '5'
        }
    ]
describe('total likes', () => {
    test('testaus', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe('05')
    })
},
    describe('favoriteBlog', () => {
        test('suosikki', () => {
            expect(listHelper.favoriteBlog(blogs)).toEqual(favoriteblog)
        })
    })
)