export function Footer() {
  return (
    <footer className="border-t py-8 text-center text-sm text-muted-foreground">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} FoodieFast. All rights reserved.</p>
        <p className="mt-1">Delicious food, delivered fast.</p>
      </div>
    </footer>
  );
}
