import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { assets } from '@project/assets';
import { appConfig } from '@project/config';

export default function App() {
  const { data } = useQuery<{ message: string }>({
    queryKey: ['message'],
    queryFn: async () => {
      const res = await fetch(appConfig.apiEndpoints);
      const data = await res.json();
      return data;
    },
  });

  return (
    <Wrapper className="app">
      <div className="content">
        <img src={assets.lightModeLogo} alt="My workspace" />
        {data && <p>{data.message}</p>}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &.app {
    width: 100%;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 50%;
      text-align: center;
    }

    p {
      font-size: 22px;
    }
  }
`;
