import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, GraduationCap, Lightbulb, MapPin } from "lucide-react";

const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  location: 'San Francisco, CA',
  avatar: 'https://placehold.co/100x100/3385FF/FFFFFF.png',
  bio: 'Lifelong learner and full-stack developer with a passion for sharing knowledge in web technologies and learning creative arts.',
  skillsToTeach: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker'],
  skillsToLearn: ['Pottery', 'Guitar Basics', 'Italian Cooking'],
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="relative mb-12">
        <div className="h-40 bg-gradient-to-r from-primary to-accent rounded-t-lg"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 w-full px-4">
           <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="user avatar" />
                <AvatarFallback className="text-4xl">{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left pt-2">
                <h1 className="font-headline text-3xl font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {userProfile.location}
                </p>
            </div>
            <Button variant="outline" className="md:ml-auto mt-4 md:mt-0">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </Button>
           </div>
        </div>
      </header>

      <main className="mt-24 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{userProfile.bio}</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Lightbulb className="text-primary"/>
                        Skills I Can Teach
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {userProfile.skillsToTeach.map(skill => (
                        <Badge key={skill} className="text-base px-3 py-1">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <GraduationCap className="text-accent" style={{color: 'hsl(var(--accent))'}} />
                        Skills I Want to Learn
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    {userProfile.skillsToLearn.map(skill => (
                        <Badge key={skill} variant="outline" className="text-base px-3 py-1">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  )
}
