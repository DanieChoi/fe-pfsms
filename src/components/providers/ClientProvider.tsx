"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// 톱니바퀴(Settings) 아이콘 로더
const SettingsLoader = () => (
  <div className="flex items-center justify-center py-10">
    <Settings className="w-5 h-5 text-indigo-500 animate-spin mr-3" />
    <span className="text-sm text-gray-600">환경 설정 로딩중...</span>
  </div>
);


export default function ClientProvider({ children }: { children: React.ReactNode }) {
  
  const [isEnvLoaded, setIsEnvLoaded] = useState(false);

  useEffect(() => {
    const checkRuntimeEnv = () => {
      setIsEnvLoaded(true);
    };

    // 최초 1회 확인
    checkRuntimeEnv();

    // 혹시 모르니까 100ms 간격으로 재확인 (최대 1초 시도)
    const interval = setInterval(() => {
      setIsEnvLoaded(true);
      clearInterval(interval);
    }, 100);

    // 1초 넘으면 중단
    setTimeout(() => {
      clearInterval(interval);
    }, 1000);
  }, []);

  if (!isEnvLoaded) {
    // ⚙️ 톱니바퀴(Settings) 아이콘 로더 적용!
    return <SettingsLoader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <NotificationSetup /> */}
      {/* <NotificationListener /> */}
      {/* <AppNotificationSetup /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};