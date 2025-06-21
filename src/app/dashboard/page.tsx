import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestCard } from "@/components/request-card";
import { dummyRequests } from "@/lib/data";

export default function DashboardPage() {
  const incomingRequests = dummyRequests.filter(r => r.type === 'incoming');
  const outgoingRequests = dummyRequests.filter(r => r.type === 'outgoing');

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your skill swap requests here.</p>
      </header>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {incomingRequests.length > 0 ? (
              incomingRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center py-10">No incoming requests yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="outgoing">
           <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center py-10">You haven't sent any requests.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
