import { useEffect, useState } from 'react'
import { getAllpost } from '../../Axios'


export default function PostScroll({page,userId}) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setLoading(true)
        setError(false)
        getAllpost({page,userId}).then((posts) => {
            setPosts(prevPosts => {
                return [...new Set([...prevPosts, ...posts])]
            })

            setHasMore(posts.length > 0)
            setLoading(false)

        }).catch(e => {

            setError(true)
        })
        
    }, [page,userId])

    return { loading, error, posts, hasMore }
}