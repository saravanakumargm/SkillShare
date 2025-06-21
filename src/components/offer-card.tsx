"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { SkillOffer } from "@/lib/types"
import { Handshake } from "lucide-react"
import { useToast } from "@/hooks/use-toast";


type OfferCardProps = {
  offer: SkillOffer;
}

export function OfferCard({ offer }: OfferCardProps) {
  const { user, skill, description } = offer;
  const { toast } = useToast();

  const handleProposeSwap = () => {
     toast({
      title: "Swap Proposed!",
      description: `Your proposal to swap skills with ${user.name} has been sent.`,
    });
  }

  return (
    <Card className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300 shadow-md hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{skill}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleProposeSwap}>
            <Handshake className="mr-2 h-4 w-4" />
            Propose a Swap
        </Button>
      </CardFooter>
    </Card>
  )
}
