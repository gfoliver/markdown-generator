import React from 'react'
import { Dialog } from '@headlessui/react'
import { useForm } from "react-hook-form";

import { useDarkMode } from '../context/Dark';

export interface IModalRef {
    open(): void;
}

interface IModalProps {
    onSubmit(data: any): void;
}

const Modal = React.forwardRef<IModalRef, IModalProps>(({ onSubmit }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const {isDarkMode} = useDarkMode();

    const { register, handleSubmit } = useForm();
    
    React.useImperativeHandle(ref, () => ({
        open() {
            setIsOpen(true);
        }
    }));

    const handle = (data: any) => {
        onSubmit(data);
        setIsOpen(false)
    }
    
    return (
        <Dialog 
            open={isOpen} 
            onClose={() => setIsOpen(false)} 
            className={"relative z-50 " + (isDarkMode ? 'dark' : '')}
        >
            <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
                <div className="w-full max-w-md dark:bg-dark dark:text-text-dark">
                    <Dialog.Panel className="p-8 w-full bg-white rounded-lg dark:bg-dark-lighter">
                        <Dialog.Title className="mb-4 text-2xl font-bold">Save Template</Dialog.Title>
                        <form onSubmit={handleSubmit(handle)}>
                            <div className="mb-6">
                                <label htmlFor="title" className="block mb-2 text-sm font-bold">Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    className="p-4 py-2 w-full rounded border-none bg-tint dark:shadow-md" 
                                    {...register("title")}
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-bold">Description</label>
                                <textarea 
                                    id="description" 
                                    cols={30} 
                                    rows={4} 
                                    className="p-4 py-2 w-full rounded border-none resize-none bg-tint" 
                                    {...register("description")}
                                />
                            </div>
                            <button type="submit" className="p-4 py-2 w-full text-white rounded bg-primary">Save</button>
                        </form>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
});

export default Modal;