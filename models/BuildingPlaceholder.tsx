import { memo } from 'react';

function BuildingPlaceholder() {
    return (
        <mesh>
            <boxGeometry args={[20, 33.6, 20]} />
            <meshStandardMaterial color="#aaa" />
        </mesh>
    );
}

export default memo(BuildingPlaceholder);
