import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import FormField from '../../form/FormField';

import { addVideo } from '../../../redux/actions/videos';

const VideoCardForm = ({ addVideo, setNewVideo }) => {
    const vidUrlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const [ title, setTitle ] = useState('');
    const [ videoUrl, setVideoUrl ] = useState('');
    const { category_id } = useParams();

    const handleSubmit = e => {
        e.preventDefault();
        if (!title || !videoUrl) {
            return;
        }
        addVideo({ title, videoUrl }, category_id);
        setTitle('');
        setNewVideo([]);
    }

    return (
        <div className="item-card">
            <form onSubmit={handleSubmit}>
                <FormField className="card-input" type="text" value={title} 
                    name="title..." handleChange={(e) => setTitle(e.target.value)} 
                />
                <FormField className="card-input" type="text" value={videoUrl} 
                    name="video url..." handleChange={(e) => setVideoUrl(e.target.value)} 
                />
                { videoUrl.length > 3 ?
                    vidUrlRegex.test(videoUrl) ? 
                        <span style={{color: 'green'}}>✓ valid url</span> 
                        : 
                        <span style={{color: 'red'}}>X invalid url</span> 
                : null }
                <button onClick={handleSubmit}>Add Video</button>
            </form>
        </div>
    )
}

export default connect(null, { addVideo })(VideoCardForm);