import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from 'react-query';
import { useState } from 'react'
import { getComments, addComment } from '../requests/blogs'

const Blog = (props) => {
  const queryClient = useQueryClient()
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const { data: comments, isLoading } = useQuery(['comments', id], () => getComments(id))

  if (isLoading) {
    return <div>loading comments...</div>
  } else {
    console.log(comments)
  }
  const blog = props.blogs.find((blog) => blog.id === id)
  if (!blog) {
    return <div>Blog not found</div>
  }

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addComment(blog.id, { comment: comment });
    if (response) {
      queryClient.invalidateQueries('blogs');
    }
    setComment('');
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes}{' '}
        <button
          onClick={() => {props.likeBlog(blog.id)
            props.counterDispatch({ type: 'BLOG_LIKE', name: blog.title })}}>Like</button>
      </p>
      <p>added by {blog.user.username}</p>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="comment..."
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>
  {comments.filter(c => c !== null).map(com => (
    <li key={com}>{com}</li>
  ))}
</ul>
    </div>
  )
}

export default Blog