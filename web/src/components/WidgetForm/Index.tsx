import { CloseButton } from '../CloseButton';

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { useState } from 'react';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeesbackContentStep } from './Steps/FeesbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes={
    BUG:{
        title:"Problema",
        image:{
            source:bugImageUrl,
            alt:'Imagem de uma lampada'
        }
    },
    IDEA:{
        title:"Ideia",
        image:{
            source:ideaImageUrl,
            alt:'Imagem de uma lampada'
        }
    },
    OTHER:{
        title:"Outro",
        image:{
            source:thoughtImageUrl,
            alt:'Imagem de um balão'
        }
    }
}

export type FeedbackType=keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType,setFeedbackType]=useState<FeedbackType|null>(null);
    const [feedbackSent,setFeedbackSent]=useState(false);

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }
    

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ?
            (<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>):
            (
                <>
                {!feedbackType?(
                    <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType}/>
                ):
                (
                    <FeesbackContentStep 
                    feedbackType={feedbackType}
                    onFeefbackRestartRequest={handleRestartFeedback}
                    onFeedbackSent={()=>setFeedbackSent(true)}
                    />
                )
                }
                </>
            )
            }
            
            <footer className="text-xl text-neutral-400">
                Feito com ♥ pelo <a className="underline underline-offset-2" href="https://dev.raphaom35.vercel.app/">Raphael</a>
            </footer>
        </div>
    )
}