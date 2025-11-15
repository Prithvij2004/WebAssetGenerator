import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Image } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/workspace', label: 'Workspace', icon: MessageSquare },
    { path: '/assets', label: 'Assets', icon: Image },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-brutal border-brutal-border bg-brutal-bg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
              Web Asset Generator
            </h1>

            <nav className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t-brutal border-brutal-border bg-brutal-bg">
        <div className="container mx-auto px-4 py-4">
          <p className="font-mono text-sm text-center text-gray-600">
            Brutal Minimalistic Design • AI-Powered Asset Generation
          </p>
        </div>
      </footer>
    </div>
  );
}
