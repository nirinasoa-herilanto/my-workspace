import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import assert from 'assert';

import { typeDefs } from '@project/schemas';
import { resolvers } from '@project/resolvers';

interface IContextValue {
  req: {
    headers: {
      authorization: string;
    };
  };
}

interface IUserResponse {
  viewMyProfile: {
    _id: string;
    username: string;
    email: string;
  };
}

// required from authentication
const accessToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjViNjAyZTBjYTFmNDdhOGViZmQxMTYwNGQ5Y2JmMDZmNGQ0NWY4MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktd29ya3NwYWNlLTQ0MzdjIiwiYXVkIjoibXktd29ya3NwYWNlLTQ0MzdjIiwiYXV0aF90aW1lIjoxNzA1NzUxMzU2LCJ1c2VyX2lkIjoiVHlTbkxYMHN6M2NqcDE5U2JmamZDWWNBOTdvMSIsInN1YiI6IlR5U25MWDBzejNjanAxOVNiZmpmQ1ljQTk3bzEiLCJpYXQiOjE3MDU3NTEzNTYsImV4cCI6MTcwNTc1NDk1NiwiZW1haWwiOiJuaXJpbmFzb2EuaGVyaWxhbnRvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5pcmluYXNvYS5oZXJpbGFudG9AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K5Sw6NyAXHhSZbiUHmtJjEeF-CPUE54dMByriFqo8z-Xt7CCUDXS_ob_bx5BVUuFIp6KIUbe263o3g-BHlweh-dBGpzlv2ZJaI2NVLxQyFc_ePZbTt79niD_mot6dWxQSsbydrb362zAV-cdeXcszM9CdoLb9k87rzL4OZblgtaOlyTfBS_7izNtdYFsHBvJOwUAlv6gTJyAqCU5Ee-4ryHFHKoM1ToOREgKhrhyng-eAjM0pAYuu_wSjOYmQtzsIOlJXjephVrVuPUGkcU3tJLmHRhHTYWxJao6D9QCnwxGB4MaAGf-J_Mvuvk94M0XmigP3T1XjleSr_JhJIvXIQ';

const query = `
      query ViewMyProfile {
        viewMyProfile {
          _id
          username
          email
        }
      }
    `;

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/my-workspaces');
});

afterAll(async () => {
  await mongoose.disconnect();
});

// Test Apollo server instance
const testServer = new ApolloServer<IContextValue>({
  typeDefs,
  resolvers,
});

describe('User resolver testing', () => {
  test('View user profile', async () => {
    const response = await testServer.executeOperation<IUserResponse>(
      {
        query,
      },
      {
        contextValue: {
          req: {
            headers: {
              authorization: accessToken,
            },
          },
        },
      }
    );

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.viewMyProfile.email).toBe(
      'nirinasoa.herilanto@gmail.com'
    );
  });
});
