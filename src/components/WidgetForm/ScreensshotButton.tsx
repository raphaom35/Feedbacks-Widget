import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from './../Loading';

interface ScreensshotButtonProps {
    screenshot: string|null;
    onSreenshotTook: (screenshot: string|null) => void;
}

export function ScreensshotButton({ 
    screenshot,
    onSreenshotTook }
    : ScreensshotButtonProps) {
    const [isTakingScreeshot,setIsTakingScreeshot]=useState(false);
    async function handleTakeScreenshot(){
        setIsTakingScreeshot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL("image/png");
        onSreenshotTook(base64image);
        setIsTakingScreeshot(false);

    }
    if(screenshot){
        return(
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex-1 flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{backgroundImage:`url(${screenshot})`,}}
                onClick={()=>onSreenshotTook(null)}
            >
                <Trash weight="fill"/>
            </button>
            )
    }

    return(
        <button
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >
        {isTakingScreeshot?<Loading/>:<Camera className="w-6 h-6 text-zinc-100"/>}
        
        </button>
    )
}
