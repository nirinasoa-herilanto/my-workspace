import { Button } from '@project/components';
import { useAppStore } from '@project/store/use-app-store';

const WorspacePage = () => {
  const {
    auth: { user, logout },
  } = useAppStore();

  console.log(user);

  return (
    <div>
      {user && (
        <>
          <h1>{`Welcome ${user.displayName}`}</h1>

          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </div>
  );
};

export default WorspacePage;
