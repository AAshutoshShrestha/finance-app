import { Header } from "@/Components/Header/header.component";
import { Sidebar } from "@/Components/Navigation/sidebar.component";


interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onNavigate,
}) => {
  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
