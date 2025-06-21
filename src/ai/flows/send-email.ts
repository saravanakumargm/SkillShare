'use server';

/**
 * @fileOverview A flow for sending an email notification.
 *
 * - sendEmail - A function that simulates sending an email.
 * - SendEmailInput - The input type for the sendEmail function.
 * - SendEmailOutput - The return type for the sendEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SendEmailInputSchema = z.object({
  to: z.string().email().describe("The recipient's email address."),
  from: z.string().email().describe("The sender's email address."),
  subject: z.string().describe('The subject line of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export const SendEmailOutputSchema = z.object({
  success: z.boolean().describe('Whether the email was sent successfully.'),
  message: z.string().describe('A message indicating the status of the email.'),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;

export async function sendEmail(input: SendEmailInput): Promise<SendEmailOutput> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async (input) => {
    // In a real application, you would integrate with an email service like SendGrid, Resend, or Nodemailer.
    // For this prototype, we'll just log to the console and return a success message
    // to simulate that an email has been sent.
    console.log('--- SIMULATING EMAIL ---');
    console.log(`To: ${input.to}`);
    console.log(`From: ${input.from}`);
    console.log(`Subject: ${input.subject}`);
    console.log('Body:');
    console.log(input.body);
    console.log('------------------------');

    return {
      success: true,
      message: `Email successfully sent to ${input.to}`,
    };
  }
);
