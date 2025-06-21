"use client";

import type { MatchSkillRequestOutput } from "@/ai/flows/match-skill-request";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Award, Calendar, CheckCircle, Handshake, UserCheck } from "lucide-react";

type MatchResultsProps = {
  isLoading: boolean;
  error: string | null;
  results: MatchSkillRequestOutput | null;
};

export function MatchResults({ isLoading, error, results }: MatchResultsProps) {
  const { toast } = useToast();

  const handleRequestSwap = (instructorName: string) => {
    toast({
      title: "Request Sent!",
      description: `Your skill swap request has been sent to ${instructorName}.`,
      action: (
        <div className="p-1 rounded-full bg-green-500">
         <CheckCircle className="h-5 w-5 text-white" />
        </div>
      ),
    });
  };

  if (isLoading) {
    return (
      <div className="mt-10 space-y-6">
        <h2 className="font-headline text-3xl font-bold text-center">Finding your perfect match...</h2>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card/50">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </CardContent>
            <CardFooter>
               <Skeleton className="h-10 w-32 ml-auto" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!results || results.matches.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="font-headline text-3xl font-bold mb-6 text-center">We found some matches for you!</h2>
      <div className="grid gap-6 md:grid-cols-1">
        {results.matches.map((match, index) => (
          <Card key={index} className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300 shadow-md hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-3">
                <UserCheck className="text-primary"/>
                {match.instructorName}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <Award className="h-4 w-4 text-amber-500" />
                Relevance Score: {Math.round(match.relevanceScore * 100)}%
              </CardDescription>
               <Progress value={match.relevanceScore * 100} className="w-full mt-2 h-2" />
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <p className="text-muted-foreground">{match.profileSummary}</p>
              <div>
                <h4 className="font-semibold mb-2">Skills Offered:</h4>
                <div className="flex flex-wrap gap-2">
                  {match.instructorSkills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
               <div className="flex items-center text-sm text-muted-foreground gap-2">
                <Calendar className="h-4 w-4" />
                <span>Availability overlaps on: <strong>{match.availabilityOverlap}</strong></span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => handleRequestSwap(match.instructorName)}>
                <Handshake className="mr-2 h-4 w-4"/>
                Request Swap
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
