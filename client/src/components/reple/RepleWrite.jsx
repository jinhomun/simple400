import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const RepleWrite = () => {
    const [reple, setReple] = useState();
    const user = useSelector((state) => state.user);

    const SubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            reple: reple,
            uid: user.uid
        }

        axios.post("/api/reple/submit", body);
    }

    return (
        <div>
            <form>
                <input type="text" value={reple} onChange={(e) => {
                    setReple(e.currentTarget.value);
                }}
                />
                <button onClick={(e) => {
                    SubmitHandler(e);
                }}>댓글쓰기

                </button>

            </form>
        </div>
    )
}

export default RepleWrite