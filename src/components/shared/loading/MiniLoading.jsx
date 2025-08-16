"use client";

export default function MiniLoading() {
    return (
        <div className="flex justify-center items-center py-10">
            <div
                className="w-[50px] aspect-square rounded-full p-[6px] animate-spin"
                style={{
                    background:
                        'conic-gradient(from 135deg at top, currentColor 90deg, #0000 0) 0 calc(50% - 4px) / 17px 8.5px, ' +
                        'radial-gradient(farthest-side at bottom left, #0000 calc(100% - 6px), currentColor calc(100% - 5px) 99%, #0000) top right / 50% 50% content-box content-box, ' +
                        'radial-gradient(farthest-side at top, #0000 calc(100% - 6px), currentColor calc(100% - 5px) 99%, #0000) bottom / 100% 50% content-box content-box',
                    backgroundRepeat: 'no-repeat',
                    color: '#fdc700',
                }}
            ></div>
        </div>
    );
}
