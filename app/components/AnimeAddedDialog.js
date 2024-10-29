"use client";

import { Dialog, DialogPanel } from '@headlessui/react';

export default function AnimeAddedDialog({ isOpen, onClose }) {
    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-1">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg shadow shadow-gray-400">
                        <div className="text-3xl font-semibold">
                            Anime Added Successfully
                        </div>
                        <button className="rounded-md px-2 py-1 bg-blue-500 hover:bg-blue-600">Proceed</button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};