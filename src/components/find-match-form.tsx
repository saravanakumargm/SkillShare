"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { matchSkillRequest, type MatchSkillRequestInput, type MatchSkillRequestOutput } from '@/ai/flows/match-skill-request';

const formSchema = z.object({
  skillRequested: z.string().min(2, { message: 'Please enter a skill you want to learn.' }),
  skillsOffered: z.string().min(2, { message: 'Please enter at least one skill you can offer.' }),
  availability: z.string().min(1, { message: 'Please select your availability.' }),
  userPreferences: z.string().optional(),
});

type FindMatchFormProps = {
  onSearchStart: () => void;
  onSearchEnd: (results: MatchSkillRequestOutput | null, input: MatchSkillRequestInput) => void;
  onSearchError: (error: string) => void;
};

export function FindMatchForm({ onSearchStart, onSearchEnd, onSearchError }: FindMatchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillRequested: '',
      skillsOffered: '',
      availability: '',
      userPreferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onSearchStart();
    const input: MatchSkillRequestInput = {
      ...values,
      skillsOffered: values.skillsOffered.split(',').map(s => s.trim()),
    };
    try {
      const result = await matchSkillRequest(input);
      onSearchEnd(result, input);
    } catch (e: any) {
      console.error(e);
      onSearchError(e.message || 'An unexpected error occurred.');
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Sparkles className="text-primary" />
          Create a Match Request
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="skillRequested"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill I Want to Learn</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced React Hooks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skillsOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills I Can Teach</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UI Design, Public Speaking" {...field} />
                    </FormControl>
                     <FormDescription>Separate skills with a comma.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>My Availability</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your general availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Weekdays">Weekdays</SelectItem>
                      <SelectItem value="Weekends">Weekends</SelectItem>
                      <SelectItem value="Evenings">Evenings</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferences (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any preferences? e.g., 'Looking for an experienced mentor', 'Prefers project-based learning'"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto ml-auto" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find Matches with AI
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
