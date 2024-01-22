import mongoose from 'mongoose';
import assert from 'assert';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

import { executeTestOperation } from '@project/utils';

interface ITestUser {
  _id: string;
  username: string;
  email: string;
  title: string;
  summary: string;
  isConnected: boolean;
  isDeleted: boolean;
}

interface ITestAddNewUserResponse {
  addNewUser: ITestUser;
}

interface ITestSwitchConnectionModeResponse {
  switchConnectionMode: ITestUser;
}

interface ITestViewMyProfileResponse {
  viewMyProfile: ITestUser;
}

interface ITestUpdateAccountResponse {
  updateUserAccount: ITestUser;
}

interface IDisableUserAccountResponse {
  disableUserAccount: ITestUser;
}

// required from authentication
const userTestToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjViNjAyZTBjYTFmNDdhOGViZmQxMTYwNGQ5Y2JmMDZmNGQ0NWY4MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktd29ya3NwYWNlLTQ0MzdjIiwiYXVkIjoibXktd29ya3NwYWNlLTQ0MzdjIiwiYXV0aF90aW1lIjoxNzA1OTA2MjIyLCJ1c2VyX2lkIjoiVHlTbkxYMHN6M2NqcDE5U2JmamZDWWNBOTdvMSIsInN1YiI6IlR5U25MWDBzejNjanAxOVNiZmpmQ1ljQTk3bzEiLCJpYXQiOjE3MDU5MDYyMjIsImV4cCI6MTcwNTkwOTgyMiwiZW1haWwiOiJuaXJpbmFzb2EuaGVyaWxhbnRvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5pcmluYXNvYS5oZXJpbGFudG9AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.H9uO6iowbcYV0u45K7csiFWJxQ_G9DfMNf6xI5JzNW6V1LPPI0nmJYVphSFXqc_-WAXjTXgpiD-NrXIA6q40tfSBjlXsx8SQT69W7oVIZbLbvElZ66hDmU_sDx478mk2ScOiGWqFlEgtVDAtNDVgtEtzCE6GMIozc7fHpfhBoGl-xwLiZryA9x2i1829QFwpQ9wAKkZg22OWZdotyM3whjsSYt9ppaLJbZUUYXK-fupwn6u3pZbdctrX2PxwKHAEcC4qJPo1y_x7mDCGv-UmPJxmq7jMjl-uW_sxKEVtpZsVDRBdFa3N80QZ6nvWO37WtiwZtSRmViXJevc0YgkmRw';

const viewMyProfileQueryTest = `
  query ViewMyProfile {
    viewMyProfile {
      _id
      username
      email
    }
  }
`;

const switchConnectionModeMutationTest = `
mutation SwitchConnectionMode($input: ConnectionMode!) {
  switchConnectionMode(input: $input) {
    _id
    username
    email
    isConnected
  }
}
`;

const addNewUserMutationTest = `
mutation AddNewUser {
  addNewUser {
    _id
    email
    isConnected
  }
}
`;

const updateUserAccountMutationTest = `
mutation UpdateUserAccount($input: UpdateUserInput!) {
  updateUserAccount(input: $input) {
    _id
    username
    title
    email
  }
}
`;

const disableUserAccountMutationTest = `
mutation DisableUserAccount {
  disableUserAccount {
    _id
    email
    isDeleted
  }
}
`;

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/my-workspaces');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('User account resolver testing', () => {
  test('Add new user account', async () => {
    const response = await executeTestOperation<ITestAddNewUserResponse>({
      accessToken: userTestToken,
      query: addNewUserMutationTest,
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.addNewUser.isConnected).toBe(true);
    expect(response.body.singleResult.data?.addNewUser.email).toBe(
      'nirinasoa.herilanto@gmail.com'
    );
  });

  test('View user account profile', async () => {
    const response = await executeTestOperation<ITestViewMyProfileResponse>({
      query: viewMyProfileQueryTest,
      accessToken: userTestToken,
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.viewMyProfile.email).toBe(
      'nirinasoa.herilanto@gmail.com'
    );
  });

  test('Update user account', async () => {
    const response = await executeTestOperation<ITestUpdateAccountResponse>({
      accessToken: userTestToken,
      query: updateUserAccountMutationTest,
      variables: {
        input: {
          username: 'Nirinasoa Herilanto',
          title: 'A full stack developer',
        },
      },
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.updateUserAccount.username).toBe(
      'Nirinasoa Herilanto'
    );
    expect(response.body.singleResult.data?.updateUserAccount.title).toBe(
      'A full stack developer'
    );
  });

  test('Switch connection mode to inactive', async () => {
    const response =
      await executeTestOperation<ITestSwitchConnectionModeResponse>({
        accessToken: userTestToken,
        query: switchConnectionModeMutationTest,
        variables: { input: 'INACTIVE' },
      });

    assert(response.body.kind === 'single');
    expect(
      response.body.singleResult.data?.switchConnectionMode.isConnected
    ).toBe(false);
  });

  test('Disable user account', async () => {
    const response = await executeTestOperation<IDisableUserAccountResponse>({
      accessToken: userTestToken,
      query: disableUserAccountMutationTest,
    });

    assert(response.body.kind === 'single');
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult?.data?.disableUserAccount.isDeleted).toBe(
      true
    );
  });
});
