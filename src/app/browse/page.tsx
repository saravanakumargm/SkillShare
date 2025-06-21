import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OfferCard } from "@/components/offer-card";
import { dummyOffers } from "@/lib/data";
import { ListFilter, Search } from "lucide-react";

export default function BrowsePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Browse Skill Offers</h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-2xl mx-auto">
          Explore a world of knowledge. Find skills you want to learn and propose a swap with what you can teach.
        </p>
      </header>
      
      <div className="mb-8 p-4 bg-card rounded-lg shadow-sm border flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for skills (e.g., 'Guitar', 'Python')" className="pl-10" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <Select>
            <SelectTrigger className="w-full md:w-[180px]">
               <ListFilter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="arts">Arts & Crafts</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="cooking">Cooking</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full md:w-auto" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>Search</Button>
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyOffers.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </main>
    </div>
  )
}
