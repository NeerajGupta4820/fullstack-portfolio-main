import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTestimonial } from '../../../redux/actions/testimonial';
import { deleteImageReducer } from '../../../redux/reducers/general';
import { Modal } from '@mui/material';
import TextareaAutosize from 'react-textarea-autosize';
import { Camera } from '@mui/icons-material';
import axios from 'axios';

const Create = ({ open, setOpen }) => {
    /////////////////////////////////////// VARIABLES /////////////////////////////////////
    const dispatch = useDispatch();
    const { url } = useSelector(state => state.general);

    /////////////////////////////////////// STATES /////////////////////////////////////
    const [testimonialData, setTestimonialData] = useState({ name: '', designation: '', content: '', image: '' });
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // Image preview state

    /////////////////////////////////////// EFFECTS /////////////////////////////////////
    useEffect(() => {
        setTestimonialData(prevData => ({ ...prevData, image: url }));
    }, [url]);

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleCreateTestimonial = () => {
        dispatch(createTestimonial(testimonialData, setOpen));
        dispatch(deleteImageReducer());
    };

    const handleUpload = async (file) => {
        const cname = import.meta.env.VITE_APP_CLOUDNAME;
        const fData = new FormData();
        fData.append('file', file);
        fData.append('upload_preset', 'Projects');

        setUploading(true);
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cname}/image/upload`,
                fData
            );
            setTestimonialData((prevState) => ({
                ...prevState,
                image: response.data.secure_url,
            }));
            alert('Image uploaded successfully!');
        } catch (error) {
            alert('Failed to upload image.');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e) => {
        const { files } = e.target;
        if (e.target.type === 'file' && files[0]) {
            const file = files[0];
            setImagePreview(URL.createObjectURL(file)); // Update image preview state
            handleUpload(file);
        } else {
            setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center'>
            <div className="sm:w-[20rem] w-[90%] max-h-[80%] overflow-y-scroll border-textGray border-[1px] rounded-[4px]">
                <div className="w-full flex justify-start items-center py-[12px] px-[8px] bg-lightGray text-white shadow-xl">
                    <h3 className='text-[20px]'>Create Testimonial</h3>
                </div>

                <div className="p-[1rem] bg-darkGray flex flex-col gap-[1rem] w-full">
                    <div className="flex justify-center items-center w-full min-h-[10rem] bg-lightGray rounded-[8px] relative">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="w-full h-full object-cover rounded-[8px]"
                            />
                        ) : (
                            <label
                                htmlFor="imageUpload"
                                className="cursor-pointer flex flex-col items-center justify-center text-white"
                            >
                                <Camera style={{ fontSize: '3rem' }} />
                                <span>Upload Image</span>
                            </label>
                        )}
                        <input
                            id="imageUpload"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <h6 className={`capitalize w-full text-[16px] text-white`}>Name:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Name'
                            value={testimonialData?.name}
                            name='name'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start`}
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <h6 className={`capitalize w-full text-[16px] text-white`}>Designation:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Designation'
                            value={testimonialData?.designation}
                            name='designation'
                            onChange={handleChange}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start`}
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <h6 className={`capitalize w-full text-[16px] text-white`}>Content:</h6>
                        <TextareaAutosize
                            type='text'
                            autoComplete='off'
                            placeholder='Content'
                            value={testimonialData?.content}
                            name='content'
                            onChange={handleChange}
                            minRows={5}
                            maxRows={5}
                            className={`w-full bg-black h-[40px] rounded-[4px] px-[8px] py-[8px] resize-none outline-none text-[16px] text-textGray text-start overflow-y-scroll`}
                        />
                    </div>
                    <div className='flex w-full justify-end gap-[8px]'>
                        <button onClick={() => setOpen(false)} className="bg-[#0d0d0d] text-white rounded-[4px] px-[6px] py-[4px]">
                            Close
                        </button>
                        <button onClick={handleCreateTestimonial} className="bg-orange text-white rounded-[4px] px-[6px] py-[4px]" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Create;
