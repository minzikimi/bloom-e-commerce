const { fetchAPI } = require('./apiFetch');

jest.mock('./apiFetch'); 

describe('filter functions', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
    });

    test('should fetch category electronics', async () => {
        const category = [{ category: 'electronics' }];
        const resp = { data: category };

        fetchAPI.get = jest.fn().mockResolvedValue(resp);

        const data = await fetchAPI.get('/categories');
        expect(data).toEqual(resp);
        expect(data.data).toEqual(category); 
        console.log(data)
    });

test('should fetch products filtered by price', async () => {
    const price = [{ price: 'all' }];
    const resp = { data: price };

    fetchAPI.get = jest.fn().mockResolvedValue(resp);

    const data = await fetchAPI.get('/price');
    expect(data).toEqual(resp);
    expect(data.data).toEqual(price); 
    console.log(data)
    });

});