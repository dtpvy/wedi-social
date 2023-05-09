import {Location} from '../node_modules/.pnpm/@prisma+client@4.12.0_prisma@4.12.0/node_modules/.prisma/client/index'
import {Review} from '../node_modules/.pnpm/@prisma+client@4.12.0_prisma@4.12.0/node_modules/.prisma/client/index'
import {LocationDetail} from '../src/types/location'
describe('Location', () => {
  it('should have correct properties', () => {
    const location: Location = {
      id: 1,
      name: 'Test Location',
      status: 'ACTIVE',
      address: '123 Test St.',
      placeId: 'abc123',
      latitude: 37.7749,
      longitude: -122.4194,
      category: 'test category',
      imgUrl: 'https://example.com/test.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(location.id).toEqual(1);
    expect(location.name).toEqual('Test Location');
    expect(location.status).toEqual('ACTIVE');
    expect(location.address).toEqual('123 Test St.');
    expect(location.placeId).toEqual('abc123');
    expect(location.latitude).toEqual(37.7749);
    expect(location.longitude).toEqual(-122.4194);
    expect(location.category).toEqual('test category');
    expect(location.imgUrl).toEqual('https://example.com/test.jpg');
    expect(location.createdAt).toBeInstanceOf(Date);
    expect(location.updatedAt).toBeInstanceOf(Date);
  });
});

describe('Review', () => {
    const reviewData: Review = {
      userId: 1,
      rating: 4,
      postId: 2,
      locationId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    it('should have a userId property of type number', () => {
      expect(typeof reviewData.userId).toBe('number');
    });
  
    it('should have a rating property of type number', () => {
      expect(typeof reviewData.rating).toBe('number');
    });
  
    it('should have a postId property of type number', () => {
      expect(typeof reviewData.postId).toBe('number');
    });
  
    it('should have a locationId property of type number', () => {
      expect(typeof reviewData.locationId).toBe('number');
    });
  
    it('should have a createdAt property of type Date', () => {
      expect(reviewData.createdAt).toBeInstanceOf(Date);
    });
  
    it('should have an updatedAt property of type Date', () => {
      expect(reviewData.updatedAt).toBeInstanceOf(Date);
    });
  });

describe('LocationDetail type', () => {
    it('should have required properties', () => {
      const location: LocationDetail = {
        id: 1,
        name: 'ABC',
        status: 'ACTIVE',
        address: '123 Main St',
        placeId: 'xyz123',
        latitude: 37.7749,
        longitude: -122.4194,
        category: 'restaurant',
        imgUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: 4.5,
        reviews: [
          {
            userId: 1,
            rating: 4.5,
            postId: 1,
            locationId: 2,
            createdAt:new Date() ,
            updatedAt:new Date() ,
            user:{id: 1,
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
                updatedAt: new Date(),},
            post:{
                id: 1,
                content: 'string' ,
                imgUrls:  ['https://example.com/image.jpg'],
                creatorId: 1,
                tripId: 1,
                isDeleted: false,
                privacy: 'PUBLIC',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: new Date()
            }
          },
        ],
        
      };
  
      expect(location).toBeDefined();
      expect(location.id).toBe(1);
      expect(location.name).toBe('ABC');
      expect(location.status).toBe('ACTIVE');
      expect(location.address).toBe('123 Main St');
      expect(location.placeId).toBe('xyz123');
      expect(location.latitude).toBe(37.7749);
      expect(location.longitude).toBe(-122.4194);
      expect(location.category).toBe('restaurant');
      expect(location.imgUrl).toBe('https://example.com/image.jpg');
      expect(location.createdAt).toBeInstanceOf(Date);
      expect(location.updatedAt).toBeInstanceOf(Date);
      expect(location.rating).toBe(4.5);
      expect(location.reviews).toBeDefined();
      expect(location.reviews?.length).toBe(1);
      expect(location.reviews?.[0].userId).toBe(1);
      expect(location.reviews?.[0].rating).toBe(4.5);
      expect(location.reviews?.[0].createdAt).toBeInstanceOf(Date);
      expect(location.reviews?.[0].updatedAt).toBeInstanceOf(Date);
    });
  });