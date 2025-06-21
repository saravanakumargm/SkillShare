'use server';

/**
 * @fileOverview An AI agent for matching skill requests with potential instructors.
 *
 * - matchSkillRequest - A function that handles the skill request matching process.
 * - MatchSkillRequestInput - The input type for the matchSkillRequest function.
 * - MatchSkillRequestOutput - The return type for the matchSkillRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchSkillRequestInputSchema = z.object({
  skillRequested: z.string().describe('The skill that the user wants to learn.'),
  skillsOffered: z.array(z.string()).describe('The skills that the user can teach in exchange.'),
  availability: z.string().describe('The user availability for learning and teaching (e.g., weekdays, weekends, evenings).'),
  userPreferences: z.string().describe('Any specific user preferences or requirements for the instructor or learning style.'),
});
export type MatchSkillRequestInput = z.infer<typeof MatchSkillRequestInputSchema>;

const MatchSkillRequestOutputSchema = z.object({
  matches: z.array(
    z.object({
      instructorName: z.string().describe('The name of the potential instructor.'),
      instructorSkills: z.array(z.string()).describe('The skills that the instructor can teach.'),
      relevanceScore: z.number().describe('A score indicating how well the instructor skills match the requested skill (0-1).'),
      availabilityOverlap: z.string().describe('The overlap in availability between the user and the instructor.'),
      profileSummary: z.string().describe('A short summary of the instructor profile.'),
    })
  ).describe('A list of potential instructor matches, ranked by relevance.'),
});
export type MatchSkillRequestOutput = z.infer<typeof MatchSkillRequestOutputSchema>;

export async function matchSkillRequest(input: MatchSkillRequestInput): Promise<MatchSkillRequestOutput> {
  return matchSkillRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchSkillRequestPrompt',
  input: {schema: MatchSkillRequestInputSchema},
  output: {schema: MatchSkillRequestOutputSchema},
  prompt: `You are an expert in skill matching, helping users find the best instructors for their needs.

Given the following skill request details, identify potential instructors from a database (not implemented in this prompt, so use your general knowledge).
Consider the relevance of skills, availability, and user preferences to rank the matches.

Skill Requested: {{{skillRequested}}}
Skills Offered: {{#each skillsOffered}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Availability: {{{availability}}}
User Preferences: {{{userPreferences}}}

Return a JSON array of potential instructor matches, ranked by relevance. Include the instructor's name, skills, a relevance score (0-1), availability overlap, and a brief profile summary.

Example Output:
{
  "matches": [
    {
      "instructorName": "Alice Smith",
      "instructorSkills": ["JavaScript", "React", "Node.js"],
      "relevanceScore": 0.9,
      "availabilityOverlap": "Weekdays, Evenings",
      "profileSummary": "Experienced JavaScript instructor with a focus on React and Node.js."
    },
    {
      "instructorName": "Bob Johnson",
      "instructorSkills": ["Python", "Data Science", "Machine Learning"],
      "relevanceScore": 0.7,
      "availabilityOverlap": "Weekends",
      "profileSummary": "Data scientist with 5+ years of experience teaching Python and Machine Learning."
    }
  ]
}

Ensure the output is valid JSON and follows the schema.
`, 
});

const matchSkillRequestFlow = ai.defineFlow(
  {
    name: 'matchSkillRequestFlow',
    inputSchema: MatchSkillRequestInputSchema,
    outputSchema: MatchSkillRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
