"use client";

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ConfirmDialog({ isOpen, onClose, cancel, deleteAnime, animeName }) {
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-1">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg shadow shadow-gray-400">
                        <DialogTitle className="font-bold text-2xl">Delete the progress for {animeName}?</DialogTitle>
                        <Description className="font-semibold text-xl">This will clear all the progress made for this anime.</Description>
                        <p>Are you sure you want to delete this anime? This action isn&apos;t reversible.</p>
                        <div className="flex gap-4 justify-end">
                            <button className="px-3 py-2 text-lg bg-gray-50 hover:bg-gray-200 rounded-md" onClick={cancel}>Cancel</button>
                            <button className="px-3 py-1 text-lg bg-red-500 hover:bg-red-600 text-white rounded-md" onClick={deleteAnime}>Delete</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};