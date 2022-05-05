import { SubmitFeedbackUserCase } from "./submit-feedback-use-case";

const createFeedbackSpy =jest.fn();
const sendMailSpy =jest.fn();

const submitFeedbackUserCase=new SubmitFeedbackUserCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
 )

describe('Subimt feedback',()=>{
    it('should be able to submit feedback',async ()=>{

        await expect(submitFeedbackUserCase.execulte({
            type:'bug',
            comment:'teste',
            screenshot:'data:image/png;base64,090909'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit feedback without type',async ()=>{
        await expect(submitFeedbackUserCase.execulte({
            type:'',
            comment:'teste',
            screenshot:'data:image/png;base64,090909'
        })).rejects.toThrow();
    });
    it('should not be able to submit feedback without comment',async ()=>{
        await expect(submitFeedbackUserCase.execulte({
            type:'test',
            comment:'',
            screenshot:'data:image/png;base64,090909'
        })).rejects.toThrow();
    })
    it('should not be able to submit feedback invalid screenshot',async ()=>{
        await expect(submitFeedbackUserCase.execulte({
            type:'test',
            comment:'iuiu',
            screenshot:'ioio'
        })).rejects.toThrow();
    })
})


