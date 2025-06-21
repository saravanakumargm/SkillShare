"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SkillRequest } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowLeftRight, Check, CheckCircle, Clock, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { useRequests } from "@/context/request-context";
import { sendEmail } from "@/ai/flows/send-email";


type RequestCardProps = {
  request: SkillRequest;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle,
    badgeClass: "bg-green-100 text-green-800 border-green-200",
  },
  declined: {
    label: "Declined",
    icon: X,
    badgeClass: "bg-red-100 text-red-800 border-red-200",
  },
};


export function RequestCard({ request }: RequestCardProps) {
  const { toast } = useToast();
  const { updateRequestStatus } = useRequests();
  const { id, user, skillOffered, skillRequested, status, type } = request;
  const currentStatus = statusConfig[status];
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await sendEmail({
        to: 'tradity555@gmail.com', // The current user's email
        from: 'noreply@skillswap.app',
        subject: `Skill Swap Accepted with ${user.name}!`,
        body: `
          <h1>Congratulations!</h1>
          <p>You have accepted a skill swap request from <strong>${user.name}</strong>.</p>
          <p>Here are the details:</p>
          <ul>
            <li><strong>You will teach:</strong> ${skillRequested}</li>
            <li><strong>You will learn:</strong> ${skillOffered}</li>
          </ul>
          <p>A calendar invite has been sent to both of you to coordinate a time.</p>
          <p>Happy learning!</p>
          <p>The SkillSwap Team</p>
        `,
      });

      toast({
        title: "Request Accepted!",
        description: `Success! A confirmation email has been sent to your inbox.`,
        action: (
          <div className="p-1 rounded-full bg-green-500">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        ),
      });
      updateRequestStatus(id, 'accepted');

    } catch (error) {
      console.error("Failed to accept request:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending the confirmation email.",
      });
    } finally {
      setIsProcessing(false);
    }
  }
  
  const handleDecline = () => {
    updateRequestStatus(id, 'declined');
    toast({
      title: "Request Declined",
      description: `You have declined the request from ${user.name}.`,
    });
  };

  const handleCancel = () => {
    updateRequestStatus(id, 'declined');
     toast({
      title: "Request Canceled",
      description: `You have canceled your request to ${user.name}.`,
    });
  }


  return (
    <Card className="flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-headline">{user.name}</CardTitle>
            <CardDescription>{user.location}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="text-sm space-y-2">
            <p><strong className="font-semibold">You offered:</strong> {type === 'outgoing' ? skillOffered : skillRequested}</p>
            <ArrowLeftRight className="h-4 w-4 mx-auto text-muted-foreground" />
            <p><strong className="font-semibold">{type === 'outgoing' ? 'They offered:' : 'They want to learn:'}</strong> {type === 'outgoing' ? skillRequested : skillOffered}</p>
        </div>
        <div>
          <Badge className={cn("gap-1.5", currentStatus.badgeClass)}>
            <currentStatus.icon className="h-3.5 w-3.5" />
            {currentStatus.label}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {type === 'incoming' && status === 'pending' && (
          <>
            <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleDecline} disabled={isProcessing}>
              <X className="mr-1.5 h-4 w-4" /> Decline
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAccept} disabled={isProcessing}>
              {isProcessing ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Check className="mr-1.5 h-4 w-4" />}
              {isProcessing ? 'Accepting...' : 'Accept'}
            </Button>
          </>
        )}
        {type === 'outgoing' && status === 'pending' && (
          <Button variant="outline" size="sm" onClick={handleCancel}>Cancel Request</Button>
        )}
      </CardFooter>
    </Card>
  )
}
