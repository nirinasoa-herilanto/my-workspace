import { useAppStore } from '@project/store/use-app-store';

const Homepage = () => {
  const {
    theme: { currentTheme, displayThemeHandler },
  } = useAppStore();

  return (
    <div>
      <h1>Welcome to My workspace</h1>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>

      {currentTheme !== 'light' && (
        <button onClick={displayThemeHandler.bind(null, 'light')}>
          Light mode
        </button>
      )}

      {currentTheme !== 'dark' && (
        <button onClick={displayThemeHandler.bind(null, 'dark')}>
          Dark mode
        </button>
      )}
    </div>
  );
};

export default Homepage;
