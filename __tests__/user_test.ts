import {User} from '../node_modules/.pnpm/@prisma+client@4.12.0_prisma@4.12.0/node_modules/.prisma/client/index'
describe('User', () => {
    it('should have the correct properties', () => {
      const user: User = {
        id: 1,
        name: 'John Doe',
        imgUrl: null,
        bgUrl: null,
        password: '123456',
        email: 'johndoe@example.com',
        phone: '1234567890',
        bio: null,
        status: 'ACTIVE',
        languageId: null,
        cityId: null,
        districtId: null,
        wardId: null,
        countryId: null,
        street: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.password).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(user.status).toEqual('ACTIVE');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });
  