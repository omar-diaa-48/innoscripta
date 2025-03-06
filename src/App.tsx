import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsFeed from "./components/NewsFeed";
import MainLayout from "./layouts/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  }
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <NewsFeed />
      </MainLayout>
    </QueryClientProvider>
  );
};

export default App;
