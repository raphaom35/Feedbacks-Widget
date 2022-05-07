import { request } from "http";
import { MailAdapter } from "../adapeters/mail-adapter";
import {FeedbacksRepository} from "../repositories/feedbacks-repositories";
export interface SubmitFeedbackUseCaseRequest{
    type:string;
    comment:string;
    screenshot?:string;
}
export class SubmitFeedbackUserCase{
  
    constructor(
    private feedbackRepository:FeedbacksRepository,
    private mailAdapter:MailAdapter,
    ){}
    async execulte(request:SubmitFeedbackUseCaseRequest){
        const {type,comment,screenshot} = request;
        if(!type){
            throw new Error('type is required');
        }
        if(!comment){
            throw new Error('comment is required');
        }
        if(screenshot&& !screenshot.startsWith('data:image/png;base64,')){
            throw new Error('Invalid screenshot format');
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject:'Novo feedback',
            body:['<div style="font-family sans-serif; font-size:16px;color:#111;">',
            `<p>Tipo do feedback:${type}<p>`,
            `<p>Comentário:${comment}<p>`,
            `<p>Screenshot:<img src="${screenshot}" ></img><p>`,
            '</div>'].join('\n')
        });
    
   
   }
}