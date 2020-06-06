import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css'

interface Props {
    onFileUpload: (file: File) => void;
}


const Dropzone: React.FC<Props> = ({onFileUpload}) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const files = acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }))
            setSelectedFileUrl(files[0].preview);
            onFileUpload(files[0])
        }
    });

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='imgage/*' />
            {selectedFileUrl ?
                <img src={selectedFileUrl} alt='Point thumbnail' /> :
                (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento ...
                    </p>
                )
            }
        </div>
    )
}

export default Dropzone;