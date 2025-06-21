"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, GraduationCap, Lightbulb, MapPin, Save, X, User, Mail } from "lucide-react";

// The user profile data, now used as the initial state
const initialProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  location: 'San Francisco, CA',
  avatar: 'https://placehold.co/100x100/3385FF/FFFFFF.png',
  bio: 'Lifelong learner and full-stack developer with a passion for sharing knowledge in web technologies and learning creative arts.',
  skillsToTeach: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker'],
  skillsToLearn: ['Pottery', 'Guitar Basics', 'Italian Cooking'],
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editedProfile, setEditedProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // If saving, update the main profile state
      setProfile(editedProfile);
    } else {
      // If starting to edit, copy current profile to editedProfile
      setEditedProfile(profile);
    }
    setIsEditing(!isEditing);
  };
  
  const handleCancel = () => {
    // Discard changes and exit editing mode
    setEditedProfile(profile);
    setIsEditing(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>, skillType: 'skillsToTeach' | 'skillsToLearn') => {
    const { value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [skillType]: value.split(',').map(skill => skill.trim()).filter(Boolean),
    }));
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="p-0">
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-primary to-accent rounded-t-lg" />
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full flex justify-center">
              <div className="relative">
                <Avatar className="h-36 w-36 border-4 border-background shadow-lg">
                  <AvatarImage src={profile.avatar} alt={profile.name} data-ai-hint="user avatar" />
                  <AvatarFallback className="text-5xl">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="outline" className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background">
                    <Edit className="h-4 w-4"/>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="text-center pt-20 pb-6 px-6">
            {isEditing ? (
               <Input 
                  name="name" 
                  value={editedProfile.name} 
                  onChange={handleInputChange} 
                  className="text-3xl font-bold font-headline text-center h-auto p-1 mx-auto max-w-sm"
               />
            ) : (
              <h1 className="text-3xl font-bold font-headline">{profile.name}</h1>
            )}
            <div className="flex items-center justify-center gap-6 mt-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {isEditing ? (
                  <Input name="location" value={editedProfile.location} onChange={handleInputChange} className="h-8"/>
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                 <Mail className="h-4 w-4" />
                 <span>{profile.email}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-8 space-y-8">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
              {isEditing ? (
                  <>
                      <Button onClick={handleEditToggle} className="bg-green-600 hover:bg-green-700">
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                          <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                  </>
              ) : (
                  <Button onClick={handleEditToggle}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
              )}
          </div>
          
          {/* About Me Section */}
          <div className="text-center">
            <h2 className="font-headline text-xl font-semibold flex items-center justify-center gap-2 mb-2"><User />About Me</h2>
             {isEditing ? (
               <Textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleInputChange}
                  className="min-h-[100px] text-center"
               />
             ) : (
              <p className="text-muted-foreground max-w-2xl mx-auto">{profile.bio}</p>
             )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
             {/* Skills I Can Teach */}
            <div>
              <h3 className="font-headline text-xl font-semibold flex items-center gap-2 mb-4">
                <Lightbulb className="text-primary"/> Skills I Can Teach
              </h3>
              {isEditing ? (
                <div>
                  <Label htmlFor="skillsToTeach">Edit skills (comma-separated)</Label>
                  <Input 
                    id="skillsToTeach"
                    value={editedProfile.skillsToTeach.join(', ')} 
                    onChange={(e) => handleSkillsChange(e, 'skillsToTeach')} 
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {profile.skillsToTeach.map(skill => (
                    <Badge key={skill} className="text-base px-4 py-1.5">{skill}</Badge>
                  ))}
                </div>
              )}
            </div>
            
            {/* Skills I Want to Learn */}
            <div>
              <h3 className="font-headline text-xl font-semibold flex items-center gap-2 mb-4">
                <GraduationCap style={{color: 'hsl(var(--accent))'}}/> Skills I Want to Learn
              </h3>
              {isEditing ? (
                 <div>
                  <Label htmlFor="skillsToLearn">Edit skills (comma-separated)</Label>
                  <Input 
                    id="skillsToLearn"
                    value={editedProfile.skillsToLearn.join(', ')} 
                    onChange={(e) => handleSkillsChange(e, 'skillsToLearn')} 
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {profile.skillsToLearn.map(skill => (
                    <Badge key={skill} variant="outline" className="text-base px-4 py-1.5">{skill}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
