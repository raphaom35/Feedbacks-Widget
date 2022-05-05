import express from 'express';
import { NodemailerMailAdapter } from './nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackUserCase } from './use-cases/submit-feedback-use-case';
export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
  console.log(req.body);
  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUserCase=new SubmitFeedbackUserCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    ); 
  await submitFeedbackUserCase.execulte({
    type,
    comment,
    screenshot
  });
    // res.status(201).json({data: feedback});
    return res.sendStatus(201).send()
})