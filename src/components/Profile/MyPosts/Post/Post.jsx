import React from 'react';
import s from './Post.module.css';

function Post(props) {
    return (
    <div className={s.item}>
        <img src="https://b.thumbs.redditmedia.com/cyvZncBjYQXebbul-abNjTfVlSwkAvTXXH50do8ILSA.png" alt="" />

        {props.message}

        <div>
            <span>likes: {props.likes}</span>
        </div>     
    </div>        
    );
}

export default Post;