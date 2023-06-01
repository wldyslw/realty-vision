import { memo } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

const images = Array.from({ length: 8 }).map(
    (e, i) => `/gallery/gallery-${i + 1}.jpg`
);

function Gallery() {
    return (
        <PhotoProvider>
            <div className="overflow-y-auto px-8 py-4 lg:px-16 lg:py-8">
                <h1 className="mb-4 text-4xl font-bold">Gallery</h1>
                <div className="gallery">
                    {images.map((item, index) => (
                        <PhotoView key={index} src={item}>
                            <div className="cursor-pointer">
                                <img
                                    src={item}
                                    alt=""
                                    className="rounded-md object-cover object-center"
                                />
                            </div>
                        </PhotoView>
                    ))}
                </div>
            </div>
        </PhotoProvider>
    );
}

export default memo(Gallery);
