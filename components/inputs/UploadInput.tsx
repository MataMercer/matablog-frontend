/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-array-index-key */
import { MouseEvent, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableContainer } from '../drag/DraggableContainer';

export type FileInput = {
  data?: File;
  url?: string;
  id?: string;
};

type UploadInputProps = {
  id: string;
  fileInputs: FileInput[];
  isSingleFile?: boolean;
  setFileInputs: (arg0: FileInput[]) => void;
};

type UploadThumbProps = {
  url?: string;
  index: number;
};

function UploadThumb({ data, url }: FileInput) {
  return (
    <div>
      {' '}
      <img width="50px" src={url} alt="uploaded" />
    </div>
  );
}

function UploadInput({
  id,
  fileInputs,
  setFileInputs,
  isSingleFile = false,
}: UploadInputProps) {
  // const [fileInputsState, setFileInputsState] = useState<FileInput[]>([]);

  // useEffect(() => {
  //   setFileInputsState(fileInputs);
  // }, [fileInputs]);

  const processFile = (file: File) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onabort = () => {
        reject(new Error('file reading was aborted'));
      };
      reader.onerror = () => {
        reject(new Error('file reading has failed'));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const processedFiles = await Promise.all(
        acceptedFiles.map((acceptedFile: File) => processFile(acceptedFile))
      );

      const newFileInputs = acceptedFiles.map((acceptedFile, index) => ({
        data: acceptedFile,
        url: processedFiles[index] as string,
      }));
      setFileInputs([...fileInputs, ...newFileInputs]);
    },
    [setFileInputs, fileInputs]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
  //   const indexToDelete = (e.target as HTMLInputElement).value.toString();
  //   const newState = fileInputsState.filter(
  //     (inputs, i) => i !== parseInt(indexToDelete, 10)
  //   );
  //   setFileInputsState(newState);
  //   setFileInputs(newState);
  // };
  return (
    <>
      <div {...getRootProps()}>
        <input id={id} {...getInputProps()} />

        {isSingleFile ? (
          <p>[Drag and drop a file here, or click to select a file.]</p>
        ) : (
          <p>[Drag and drop some files here, or click to select files.]</p>
        )}
      </div>
      <DndProvider backend={HTML5Backend}>
        <DraggableContainer<FileInput>
          list={fileInputs}
          setList={setFileInputs}
          cardComponent={UploadThumb}
        />
      </DndProvider>
    </>
  );
}

export default UploadInput;
