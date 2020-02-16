import { Photon } from '@prisma/photon';
import { networkInterfaces } from 'os';
import { O_NOFOLLOW } from 'constants';

const photon = new Photon();

async function main() {
  const user1 = await photon.users.create({
    data: {
      name: 'Alice',
      avatarUrl: '',
      posts: {
        create: {
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true
        }
      }
    }
  });
  await photon.users.create({
    data: {
      name: 'Bob',
      avatarUrl: '',
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false
          }
        ]
      }
    }
  });
  const program1 = await photon.programs.create({
    data: {
      name: 'Test1',
      description: 'Test Description2',
      programType: 'rural',
      startDate: new Date("2020-12-12").toISOString(),
      endDate: new Date("2020-12-12").toISOString(),
      applicationStartDate: new Date("2020-12-12").toISOString(),
      applicationEndDate: new Date("2020-12-12").toISOString()
    }
  });
  await photon.programs.create({
    data: {
      name: 'Test2',
      description: 'Test Description2',
      programType: 'rural',
      startDate: new Date("2020-12-12").toISOString(),
      endDate: new Date("2020-12-12").toISOString(),
      applicationStartDate: new Date("2020-12-12").toISOString(),
      applicationEndDate: new Date("2020-12-12").toISOString(),
    }
  });
  await photon.applications.create({
    data: {
      status: 'pending',
      user: {
        connect: {
          id: user1.id,
        }
      },
      program: {
        connect: {
          id: program1.id,
        }
      }
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
