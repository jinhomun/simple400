import React, { useState } from 'react'

import firebase from '../../firebase';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const UserJoin = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");
    const [flag, setFlag] = useState(false);
    const [nameCheck, setNameCheck] = useState(false);
    const [nameInfo, setNameInfo] = useState("")

    let navigate = useNavigate();

    const JoinFunc = async (e) => {
        setFlag(true);

        e.preventDefault();

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 입력하셔야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 일치하지 않습니다.")
        }
        if (!nameCheck) {
            return alert("닉네임 중복 검사를 해주세요!");
        }
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        await createdUser.user.updateProfile({
            displayName: youName,
        });

        console.log(createdUser);

        // mongoDB 회원가입
        let body = {
            email: createdUser.user.multiFactor.user.email,
            displayName: createdUser.user.multiFactor.user.displayName,
            uid: createdUser.user.multiFactor.user.uid,

        }
        axios
            .post("/api/user/join", body)
            .then((response) => {
                setFlag(false)
                if (response.data.success) {
                    alert("회원가입을 성공하였습니다.")
                    navigate("/login");
                } else {
                    return alert("회원가입이 실패하였습니다.");
                }
            })
    }
    const NameCheckFunc = (e) => {
        e.preventDefault();
        if (!youName) {
            return alert("닉네임을 입력해주세요!");
        }
        let body = {
            displayName: youName,
        }
        axios.post("/api/user/nameCheck", body).then((response) => {
            if (response.data.success) {
                if (response.data.check) {
                    setNameCheck(true);
                    setNameInfo("사용 가능한 닉네임입니다.")
                } else {
                    setNameInfo("사용 할수 없는 닉네임입니다.")
                }
            }
        })
    }
    return (
        <div className='login__wrap'>
            <div className='login__header'>
                <h3>JOIN</h3>
                <p>회원가입을 하셔야 합니다</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required"></label>
                        <input
                            type="text"
                            id="youName"
                            name="youName"
                            placeholder="닉네임"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youName}
                            onChange={(e) => setYouName(e.currentTarget.value)}
                        />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        {nameInfo}
                        <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
                    </div>

                    <div>
                        <label htmlFor="youEmail" className="required"></label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일을 적어주세요!"
                            className="input__style"
                            autoComplete='off'
                            required
                            minLength={8}
                            value={youEmail}
                            onChange={(e) => setYouEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required"></label>
                        <input
                            type="text"
                            id="youPass"
                            value={youPass}
                            name="youPass"
                            placeholder="비밀번호를 적어주세요!"
                            className="input__style"
                            autoComplete='off'
                            required
                            minLength={8}
                            onChange={(e) => setYouPass(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required"></label>
                        <input
                            type="text"
                            id="youPassC"
                            value={youPassC}
                            name="youPassC"
                            placeholder="다시 한번 비밀번호를 적어주세요!"
                            className="input__style"
                            required
                            minLength={8}
                            onChange={(e) => setYouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <button disabled={flag} type="submit" className="btn__style mt100" onClick={(e) => JoinFunc(e)}>회원가입 완료</button>
                </fieldset>
            </form>
        </div>
    );
}

export default UserJoin