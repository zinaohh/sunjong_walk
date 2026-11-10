import { NavLink } from 'react-router';
import { PATHS } from '../app/paths';

const TABS = [
  { to: PATHS.home, label: '이번 주', end: true },
  { to: PATHS.plan, label: '정하기', end: false },
  { to: PATHS.check, label: '오늘 체크', end: false },
  { to: PATHS.review, label: '돌아보기', end: false },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 화면">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `bottom-nav__item${isActive ? ' is-active' : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
