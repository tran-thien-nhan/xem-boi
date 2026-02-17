"use client"
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DonationModalProps {
    intervalSeconds: number;
    qrImageUrl?: string;
    open?: boolean;
    onClose?: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
    intervalSeconds,
    qrImageUrl = "https://media.discordapp.net/attachments/1387697717819473983/1473211951172550789/59e7d9043531bb6fe220.jpg?ex=6995630c&is=6994118c&hm=35cf8a0acfe6d6fe8e793a0abb1a003a31fddf9211d61381098462332c6b4d80&=&format=webp&width=444&height=789",
    open: externalOpen,
    onClose
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [lastShown, setLastShown] = useState<number>(0);
    const [copySuccess, setCopySuccess] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Sửa ở đây

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    useEffect(() => {
        if (externalOpen !== undefined) return;

        const intervalTimeMs = intervalSeconds * 1000;

        const checkAndShowModal = () => {
            const now = Date.now();
            if (lastShown === 0 || now - lastShown >= intervalTimeMs) {
                setInternalOpen(true);
                setLastShown(now);
            }
        };

        checkAndShowModal();

        intervalRef.current = setInterval(checkAndShowModal, intervalTimeMs);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [lastShown, intervalSeconds, externalOpen]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            setInternalOpen(false);
        }
    };

    const handleCloseAndReset = () => {
        setInternalOpen(false);
        setLastShown(Date.now());
    };

    const handleCopy = () => {
        navigator.clipboard.writeText('1052214046');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-3"
                onClick={handleClose}
            >
                <div
                    className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto relative shadow-2xl animate-slideIn"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Nút đóng */}
                    <button
                        onClick={handleClose}
                        className="absolute right-3 top-3 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-200"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>

                    {/* Split layout: Trái - Phải */}
                    <div className="flex flex-col md:flex-row min-h-[500px]">
                        {/* Bên trái: QR Code - Full width */}
                        <div className="w-full md:w-2/5 bg-gray-50 md:border-r border-gray-200">
                            <div className="w-full h-full flex flex-col">
                                <img
                                    src={qrImageUrl}
                                    alt="QR Code ủng hộ"
                                    className="w-full h-full object-cover aspect-square"
                                />
                                <div className="p-4 text-center bg-gray-50 border-t border-gray-200">
                                    <p className="text-sm text-red-600 font-medium">
                                        Lì xì cho Nhân
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bên phải: Nội dung */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                            {/* Icon lì xì */}
                            <div className="text-4xl mb-2">
                                🧧
                            </div>

                            {/* Tiêu đề */}
                            <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-3 leading-tight">
                                Nếu bạn thấy hay thì hãy lì xì cho Nhân 20k nhé
                            </h2>

                            {/* Nội dung phụ */}
                            <p className="text-sm md:text-base text-gray-600 mb-6 italic border-l-4 border-red-600 pl-3">
                                "Một ly trà đá cũng là động lực lớn cho Nhân phát triển ứng dụng này!"
                            </p>

                            {/* Thông tin chuyển khoản */}
                            <div className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 mb-6 border border-red-100">
                                <p className="font-bold mb-4 text-red-600 flex items-center gap-2">
                                    <span className="text-xl">📋</span>
                                    Thông tin chuyển khoản:
                                </p>

                                <div className="grid gap-3 text-sm md:text-base text-black">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-xl">🏦</span>
                                        <span><span className="font-semibold">Ngân hàng:</span> VCB Bank</span>
                                    </div>

                                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                                        <span className="text-xl">📱</span>
                                        <span><span className="font-semibold">Số TK:</span> 1052214046</span>
                                        <button
                                            onClick={handleCopy}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs md:text-sm px-3 py-1.5 rounded-full border border-red-200 hover:border-red-400 transition-all duration-200 flex items-center gap-1.5"
                                        >
                                            <span className="text-base">📋</span>
                                            Copy
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-xl">👤</span>
                                        <span><span className="font-semibold">Chủ TK:</span> TRAN THIEN NHAN</span>
                                    </div>

                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-xl">📝</span>
                                        <span><span className="font-semibold">Nội dung:</span> Li xi dau nam</span>
                                    </div>
                                </div>
                            </div>

                            {/* Nút đóng */}
                            <button
                                onClick={handleClose}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-fit mt-auto"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast message khi copy thành công */}
            {copySuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-[10000] animate-fadeInOut">
                    ✅ Đã copy số tài khoản!
                </div>
            )}

            {/* Thêm keyframes animation vào tailwind config hoặc dùng style tag */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, 20px); }
                    15% { opacity: 1; transform: translate(-50%, 0); }
                    85% { opacity: 1; transform: translate(-50%, 0); }
                    100% { opacity: 0; transform: translate(-50%, -20px); }
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
                
                .animate-fadeInOut {
                    animation: fadeInOut 2s ease;
                }
            `}</style>
        </>
    );
};

export default DonationModal;