import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
export default function SoundToggle() {
const [enabled, setEnabled] = useState(true);
const toggle = () => {
setEnabled(!enabled);
};
return (
<button
onClick={toggle}
className="bg-gray-800 p-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
>
{enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
</button>
);
}