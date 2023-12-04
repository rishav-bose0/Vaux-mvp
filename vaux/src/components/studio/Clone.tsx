import React, { useState } from 'react';
import {cloneVoice} from "../../actions/APIActions";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import loadingGIF from "../../assets/smallLoader.svg";

const Clone = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [token, setToken] = useLocalStorage("vaux-staff-token", JSON.stringify(null));
    const [userId] = useLocalStorage("userId", JSON.stringify(null));
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const [genderError, setGenderError] = useState<string | null>(null);
    const [filesError, setFilesError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
            setFilesError(null)
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("name")
        if (!event.target.value.length) {
            setNameError('Please add clone name');
        } else{
            setNameError(null)
        }
        setName(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!event.target.value.length) {
            setGenderError('Please select gender');
        } else{
            setGenderError(null)
        }
        setGender(event.target.value);
    };

    const handleUpload = async () => {
        // Handle file upload logic using selectedFiles, name, and gender state
        // For example: You can send this data to an API endpoint
        setMessage(null)
        console.log('Selected Files:', selectedFiles);
        console.log('Name:', name);
        console.log('Gender:', gender);
        const formData = new FormData();

        if (!selectedFiles){
            setFilesError("Please select Files")
            return;
        }

        if (!name.length) {
            setNameError('Please add clone name');
            return;
        }

        if (!gender.length) {
            setGenderError('Please select gender');
            return;
        }

        setIsloading(true)

        // Add files to FormData
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }
        }

        // Add other data to FormData
        formData.append('clone_name', name);
        formData.append('gender', gender)
        formData.append('user_id', userId); // Assuming userId is available

        const message = await cloneVoice(token, formData);
        setIsloading(false)
        setMessage(message)
    };

    return (
        <div>
            <div className='flex flex-col'>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"*Points to Note:"}</span>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"1. Avoid clips with background music, noise or reverb."}</span>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"2. Try to find clips that are spoken in such a way as you wish your output to sound like."}</span>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"3. Clips duration should be somewhere between 7-15secs. Adding more number of clips leads to better cloning. (ideal quantity >= 15 clips)"}</span>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"4. Save the clips as a WAV format and 22050 as sample rate."}</span>
                <span className='text-xl md:text-xl font-normal font-ink-free mb-6'>{"5. Cloning Process may take 3-4 minutes."}</span>
            </div>
            {filesError && <p className="text-red-500">{filesError}</p>}

            <div className='flex flex-col w-[600px]'>
                {/* File upload button */}
                <input type="file" onChange={handleFileUpload} multiple />

                {/* Text area for entering name */}
                <input
                    style={{ margin: '23px' }}
                    type="text"
                    placeholder="Enter clone name"
                    value={name}
                    onChange={handleNameChange}
                ></input>
                {nameError && <p className="text-red-500">{nameError}</p>}

                {/* Text area for entering gender */}
                <select
                    style={{ margin: '23px' }}
                    value={gender}
                    onChange={handleGenderChange}
                >
                    <option value="">Select gender</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                {genderError && <p className="text-red-500">{genderError}</p>}

                {/* Upload button */}
                <button
                    className="text-primary bg-white border border-solid border-primary px-4 py-2 rounded-xmd font-medium hover:bg-primary hover:text-white"
                    onClick={handleUpload}>Upload</button>
            </div>
            {
                isLoading && (
                    <img
                        src={loadingGIF}
                        alt="loading"
                        className={`cursor-pointer`}
                        width={40}
                    />
                )
            }

            {message && (
                <span className='text-indigo text-xl font-bold'>
                  {message}
                </span>
            )}
        </div>
    );
};

export default Clone;
