export default function SkeletonProductCard() {
    return (
        <div className="w-[18rem] h-[25rem]">
            <div className="relative group">

                <div className="bg-white rounded-2xl p-4 shadow-lg relative mr-[21px]">
                    {/* تصویر */}
                    <div className="relative w-full h-44 rounded-md overflow-hidden bg-gray-200 animate-pulse" />

                    {/* خط با دایره وسط */}
                    <div className="relative flex items-center px-2 mt-3 mb-3">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                   
                    {/* قیمت قبلی */}
                    <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />

                    {/* دکمه و قیمت */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="w-[44px] h-[44px] bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
