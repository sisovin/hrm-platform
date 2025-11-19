import Link from 'next/link';

export function DashboardFooter() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 HR Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#help" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Help Center
            </Link>
            <Link href="#privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="#terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
