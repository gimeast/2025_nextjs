import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/todo/list" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
            </Link>

            <nav className="flex items-center space-x-1">
              <Link
                href="/todo/list"
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                목록
              </Link>
              <Link
                href="/todo/new"
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                등록
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
