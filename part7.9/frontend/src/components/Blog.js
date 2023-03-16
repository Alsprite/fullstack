import { useParams } from 'react-router-dom';

const Blog = (props) => {
  const { id } = useParams()
  const blog = props.blogs.find((blog) => blog.id === id)
  if (!blog) {
    return <div>Blog not found</div>
  }
  return (
    <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} <button onClick={() => {props.likeBlog(blog.id); props.counterDispatch({type: 'BLOG_LIKE', name: blog.title})}}>Vote</button></p>
        <p>added by {blog.user.username}</p>
    </div>
    )
}

export default Blog