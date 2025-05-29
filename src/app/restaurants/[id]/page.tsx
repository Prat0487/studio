import { getRestaurantById } from '@/lib/data';
import { MenuItemCard } from '@/components/MenuItemCard';
import Image from 'next/image';
import { Star, Utensils, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RestaurantPageParams {
  id: string;
}

export async function generateMetadata({ params }: { params: RestaurantPageParams }) {
  const restaurant = getRestaurantById(params.id);
  if (!restaurant) {
    return { title: 'Restaurant Not Found' };
  }
  return {
    title: `${restaurant.name} - Menu | FoodieFast`,
    description: `Explore the menu of ${restaurant.name}. Order your favorite ${restaurant.cuisine} dishes.`,
  };
}

export default function RestaurantPage({ params }: { params: RestaurantPageParams }) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Restaurant Not Found</h1>
        <p className="text-muted-foreground mt-2">Sorry, we couldn't find the restaurant you're looking for.</p>
        <Button asChild className="mt-4">
          <Link href="/">Back to Restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
        <Image 
          src={restaurant.imageUrl} 
          alt={restaurant.name} 
          layout="fill" 
          objectFit="cover" 
          className="brightness-75"
          data-ai-hint={restaurant.dataAiHint || "restaurant interior"}
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">{restaurant.name}</h1>
          <div className="flex items-center mt-2 space-x-4 text-white/90 text-lg">
            <span className="flex items-center"><Utensils className="mr-2 h-5 w-5" /> {restaurant.cuisine}</span>
            <span className="flex items-center"><Star className="mr-2 h-5 w-5 fill-yellow-400 text-yellow-400" /> {restaurant.rating.toFixed(1)}</span>
            <span className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Mock Address, City</span>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Full Menu</h2>
        {restaurant.menu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurant.menu.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">This restaurant currently has no items on its menu.</p>
        )}
      </section>
    </div>
  );
}

// This function is optional but good for static site generation if you know all restaurant IDs
// export async function generateStaticParams() {
//   const { restaurants } = await import('@/lib/data'); // Assuming data.ts exports restaurants
//   return restaurants.map((restaurant) => ({
//     id: restaurant.id,
//   }));
// }
