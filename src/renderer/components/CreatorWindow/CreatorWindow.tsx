import React from 'react';
import { createThingAndRefetch } from '../../state/contextSlice';
import { editKindOfNewThing, editNameOfNewThing } from '../../state/creatorWindowSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import './CreatorWindow.scss';

const CreatorWindow = (): JSX.Element => {

    const { name, kind } = useAppSelector((state) => state.creatorWindow);
    const dispatch = useAppDispatch();

    const handleSubmit = (e) => {
        dispatch(createThingAndRefetch())
        e.preventDefault();
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="creator-window">
                <h1>Create New Thing</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="thing-name">Name:</label><br/>
                    <input type="text" id="thing-name" name="thing-name"
                        value={name}
                        onChange={(e)=>dispatch(editNameOfNewThing(e.target.value))}
                    ></input>

                    <br/>

                    <label htmlFor="thing-kind">Kind:</label><br/>
                    <input type="text" id="thing-kind" name="thing-name"
                        value={kind}
                        onChange={(e)=>dispatch(editKindOfNewThing(e.target.value))}
                    ></input>

                    <br/>

                    <button type="submit">Submit</button>

                </form>
            </div>
        </>
    )
}

export default CreatorWindow;