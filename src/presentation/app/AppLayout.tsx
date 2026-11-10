import { Outlet } from 'react-router';
import { BottomNav } from '../components/BottomNav';

/** 폰 화면 기준 레이아웃: 위는 화면 내용, 아래는 고정 탭. 넓은 화면에서는 가운데 폰 폭으로 보인다. */
export function AppLayout() {
  return (
    <div className="app">
      <main className="app__content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
