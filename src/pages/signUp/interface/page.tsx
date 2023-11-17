import './signup.scss'
import {observer} from "mobx-react";
import UserStore from "./store";
import React, {ChangeEvent, FormEvent} from 'react';

export const SignUp = observer(() => {
    const {handleInput, submitForm, user} = UserStore;
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleInput(event);
    };

    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitForm(event);
    };
    return (
        <>
            <form onSubmit={onFormSubmit} className={"signUp-form"}>
                <div className={"form-wrapper"}>
                    <div className={"form-login"}>
                        <input type={"text"} name="login" placeholder={"login"}
                               onChange={onInputChange} required/>
                    </div>
                    <div className={"form-email"}>
                        <input type={"email"} name="email" placeholder={"email"}
                               onChange={onInputChange} required/>
                    </div>
                    <div className={"form-pass"}>
                        <input type={"password"} name="password" placeholder={"password"}
                               onChange={onInputChange} required/>
                    </div>
                    <div className={"form-submit"}>
                        <button type={"submit"}>
                            signIn
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
})