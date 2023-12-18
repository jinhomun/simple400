import React, { useEffect, useState } from 'react'
import PostDetail from './PostDetail'
import RepleArea from '../reple/RepleArea'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const PostArea = () => {
    const [postInfo, setPostInfo] = useState({});
    const [flag, setFlag] = useState(false);
    let params = useParams();

    // 글 불러오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }
        axios.post('/api/post/detail', body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.post);
                setFlag(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum]);

    // 댓글 불러오기

    return (
        <div>
            {flag ? (
                <>
                    <PostDetail postInfo={postInfo} />
                    <RepleArea />
                </>
            ) : (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

        </div>
    )
}

export default PostArea