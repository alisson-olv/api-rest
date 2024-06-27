import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - GetAll', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer.post('/cities').send({
      name: 'Any City Name',
    });

    cityId = resCity.body;
  });

  it('Should get all Persons', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      email: 'binho_getAll@hotmail.com',
      fullName: 'Alisson Souza',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer.get('/persons').send();

    expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
