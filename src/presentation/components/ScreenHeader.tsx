interface Props {
  title: string;
  caption?: string;
}

export function ScreenHeader({ title, caption }: Props) {
  return (
    <header className="screen-header">
      {caption && <p className="screen-header__caption">{caption}</p>}
      <h1 className="screen-header__title">{title}</h1>
    </header>
  );
}
