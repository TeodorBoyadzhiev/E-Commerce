import React, { useState } from 'react'
import { useRef } from 'react';

const SizeColorHOC = (OriginalCoponent) => {
    const UpdatedComponent = () => {
        const [color, setColor] = useState();
        const [size, setSize] = useState();

        const colorRef = useRef();
        let cls = ' ';
        const activeColor = (color, index) => {
            const colors = colorRef.current.children;
            for (let i = 1; i < colors.length; i += 1) {
                colors[i].className = '' + colors[i].className.replace('active', '');
                cls = ' ';
            }
            colors[index + 1].className += 'active';
            cls = colors[index + 1].className;
            setColor(color);
        }

        const sizeRef = useRef();
        let sls = ' ';
        const activeSize = (size, index) => {
            const sizes = sizeRef.current.children;
            for (let i = 1; i < sizes.length; i += 1) {
                sizes[i].className = '' + sizes[i].className.replace('active', '');
                sls = ' ';
            }
            sizes[index + 1].className += 'active';
            sls = sizes[index + 1].className;
            setSize(size.toUpperCase());
        }

        return <OriginalCoponent
            cls={cls}
            sls={sls}
            currColor={color}
            currSize={size}
            colorRef={colorRef}
            sizeRef={sizeRef}
            activeColor={activeColor}
            activeSize={activeSize}
        />
    }

    return UpdatedComponent
}

export default SizeColorHOC